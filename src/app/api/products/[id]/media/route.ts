import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import {
  hasValidProductImageSignature,
  PRODUCT_IMAGE_EXTENSIONS,
} from "@/lib/product-media-validation";
import { MAX_COMPRESSED_PRODUCT_IMAGE_BYTES } from "@/lib/product-image-limits";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const { id } = await ctx.params;
  const sb = getSupabaseAdmin();
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";
  const { data: product } = await sb.from("products").select("published").eq("id", id).maybeSingle();
  if (!product || (product.published === false && !isAdmin)) return NextResponse.json({ media: [] });
  const { data, error } = await sb
    .from("product_media")
    .select("*")
    .eq("product_id", id)
    .order("display_order", { ascending: true });

  if (error) {
    if (error.message?.includes("product_media") || error.code === "42P01") {
      return NextResponse.json({ media: [] });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (isAdmin) return NextResponse.json({ media: data || [] });
  const { data: variants } = await sb.from("product_variants").select("id").eq("product_id", id).eq("published", true);
  const publishedVariantIds = new Set((variants || []).map((variant) => variant.id));
  return NextResponse.json({ media: (data || []).filter((item) => !item.variant_id || publishedVariantIds.has(item.variant_id)) });
}

/** Multipart: file + optional metadata fields */
export async function POST(req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { id } = await ctx.params;
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return NextResponse.json({ error: "A managed image upload is required" }, { status: 400 });
  if (file.size >= MAX_COMPRESSED_PRODUCT_IMAGE_BYTES) {
    return NextResponse.json({ error: "Image must be optimized to under 100 KB before upload" }, { status: 413 });
  }
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return NextResponse.json({ error: "Only JPEG, PNG, WebP or GIF images are accepted" }, { status: 415 });

  const sb = getSupabaseAdmin();
  const { data: product } = await sb.from("products").select("id, images").eq("id", id).maybeSingle();
  if (!product) return NextResponse.json({ error: "Parent product not found" }, { status: 404 });
  const variantId = (formData.get("variant_id") as string) || null;
  if (variantId) {
    const { data: variant } = await sb.from("product_variants").select("id").eq("id", variantId).eq("product_id", id).maybeSingle();
    if (!variant) return NextResponse.json({ error: "Variant does not belong to this product" }, { status: 400 });
  }
  const imageType = String(formData.get("image_type") || "reference");
  if (!["reference", "actual_stock", "detail", "other"].includes(imageType)) return NextResponse.json({ error: "Invalid image_type" }, { status: 400 });
  const displayOrder = Number(formData.get("display_order") || 0);
  if (!Number.isInteger(displayOrder) || displayOrder < 0) return NextResponse.json({ error: "display_order must be a non-negative integer" }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!hasValidProductImageSignature(buffer, file.type)) return NextResponse.json({ error: "Uploaded content is not a supported image" }, { status: 415 });
  const ext = PRODUCT_IMAGE_EXTENSIONS[file.type];
  const storage_path = `${id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await sb.storage.from("product-images").upload(storage_path, buffer, { contentType: file.type, upsert: false });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });
  const { data: pub } = sb.storage.from("product-images").getPublicUrl(storage_path);
  const public_url = pub.publicUrl;

  const is_main = formData.get("is_main") === "true";
  const row = {
    product_id: id,
    variant_id: variantId,
    storage_path,
    public_url,
    title: (formData.get("title") as string) || null,
    alt_text: (formData.get("alt_text") as string) || null,
    caption: (formData.get("caption") as string) || null,
    display_order: displayOrder,
    is_main,
    image_type: imageType,
    source_url: (formData.get("source_url") as string) || null,
    attribution: (formData.get("attribution") as string) || null,
  };

  const { data, error } = await sb.from("product_media").insert(row).select().single();
  if (error) {
    await sb.storage.from("product-images").remove([storage_path]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  let warning: string | undefined;
  if (is_main) {
    const { error: clearError } = await sb.from("product_media").update({ is_main: false }).eq("product_id", id).neq("id", data.id);
    if (clearError) warning = "Image uploaded, but other main-image flags need review";
  }

  // Keep legacy products.images in sync for list cards
  if (product) {
    const images = [...((product.images as string[]) || [])];
    if (!images.includes(public_url)) {
      if (is_main) images.unshift(public_url);
      else images.push(public_url);
      const { error: syncError } = await sb.from("products").update({ images }).eq("id", id);
      if (syncError) warning ??= "Image uploaded, but product card image could not be synchronized";
    } else if (is_main) {
      const rest = images.filter((u) => u !== public_url);
      const { error: syncError } = await sb.from("products").update({ images: [public_url, ...rest] }).eq("id", id);
      if (syncError) warning ??= "Image uploaded, but product card image could not be synchronized";
    }
  }

  return NextResponse.json({ media: data, warning }, { status: 201 });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const { id } = await ctx.params;
  const body = await req.json();
  const sb = getSupabaseAdmin();
  if (!body.mediaId) return NextResponse.json({ error: "mediaId required" }, { status: 400 });
  const { data: target } = await sb.from("product_media").select("id").eq("product_id", id).eq("id", body.mediaId).maybeSingle();
  if (!target) return NextResponse.json({ error: "Image not found" }, { status: 404 });
  if (body.variant_id) {
    const { data: variant } = await sb.from("product_variants").select("id").eq("id", body.variant_id).eq("product_id", id).maybeSingle();
    if (!variant) return NextResponse.json({ error: "Variant does not belong to this product" }, { status: 400 });
  }
  if (body.display_order !== undefined && (!Number.isInteger(body.display_order) || body.display_order < 0)) return NextResponse.json({ error: "display_order must be a non-negative integer" }, { status: 400 });
  if (body.image_type !== undefined && !["reference", "actual_stock", "detail", "other"].includes(body.image_type)) return NextResponse.json({ error: "Invalid image_type" }, { status: 400 });
  const allowed = ["variant_id", "title", "alt_text", "caption", "display_order", "is_main", "image_type", "source_url", "attribution"];
  const updates = Object.fromEntries(allowed.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
  const { data, error } = await sb.from("product_media").update(updates).eq("product_id", id).eq("id", body.mediaId).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (body.is_main === true) {
    const { error: clearError } = await sb.from("product_media").update({ is_main: false }).eq("product_id", id).neq("id", body.mediaId);
    const { data: product } = await sb.from("products").select("images").eq("id", id).maybeSingle();
    if (product && data.public_url) {
      const images = ((product.images as string[] | null) || []).filter((url) => url !== data.public_url);
      const { error: imagesError } = await sb.from("products").update({ images: [data.public_url, ...images] }).eq("id", id);
      if (imagesError) return NextResponse.json({ media: data, warning: "Main image set, but product card image could not be synchronized", detail: imagesError.message }, { status: 200 });
    }
    if (clearError) return NextResponse.json({ media: data, warning: "Main image set, but other main-image flags need review", detail: clearError.message }, { status: 200 });
  }
  return NextResponse.json({ media: data });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  const { id } = await ctx.params;
  const mediaId = req.nextUrl.searchParams.get("mediaId");
  if (!mediaId) return NextResponse.json({ error: "mediaId required" }, { status: 400 });

  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const sb = getSupabaseAdmin();
  const { data: row } = await sb.from("product_media").select("*").eq("id", mediaId).eq("product_id", id).maybeSingle();
  if (!row) return NextResponse.json({ error: "Image not found" }, { status: 404 });
  const { error } = await sb.from("product_media").delete().eq("id", mediaId).eq("product_id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data: product, error: productError } = await sb.from("products").select("images").eq("id", id).maybeSingle();
  if (productError) return NextResponse.json({ ok: true, warning: "Metadata removed; image retained because product references could not be checked", detail: productError.message }, { status: 200 });
  const { data: duplicateReferences } = await sb.from("product_media").select("id, storage_path").eq("product_id", id).eq("public_url", row.public_url).limit(1);
  if (product?.images?.length && !duplicateReferences?.length) {
    const { error: legacyUpdateError } = await sb.from("products").update({ images: product.images.filter((url: string) => url !== row.public_url) }).eq("id", id);
    if (legacyUpdateError) return NextResponse.json({ ok: true, warning: "Metadata removed; image retained because legacy product references could not be updated", detail: legacyUpdateError.message }, { status: 200 });
  }
  const storageStillReferenced = Boolean(row.storage_path && duplicateReferences?.some((reference) => reference.storage_path === row.storage_path));
  if (row.storage_path && !storageStillReferenced) {
    const { error: storageError } = await sb.storage.from("product-images").remove([row.storage_path]);
    if (storageError) return NextResponse.json({ ok: true, warning: "Metadata removed but Storage cleanup failed", detail: storageError.message }, { status: 200 });
  }
  return NextResponse.json({ ok: true });
}
