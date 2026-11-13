import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";

type Ctx = { params: Promise<{ id: string }> };

function isImageBuffer(buffer: Buffer) {
  return buffer.length >= 12 && (
    (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) ||
    (buffer.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") ||
    (buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP") ||
    buffer.subarray(0, 6).toString().match(/^GIF8[79]a$/)
  );
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const { id } = await ctx.params;
  const sb = getSupabaseAdmin();
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
  return NextResponse.json({ media: data || [] });
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
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "File exceeds 5MB" }, { status: 413 });
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return NextResponse.json({ error: "Only JPEG, PNG, WebP or GIF images are accepted" }, { status: 415 });

  const sb = getSupabaseAdmin();
  const { data: product } = await sb.from("products").select("id, images").eq("id", id).maybeSingle();
  if (!product) return NextResponse.json({ error: "Parent product not found" }, { status: 404 });
  const variantId = (formData.get("variant_id") as string) || null;
  if (variantId) {
    const { data: variant } = await sb.from("product_variants").select("id").eq("id", variantId).eq("product_id", id).maybeSingle();
    if (!variant) return NextResponse.json({ error: "Variant does not belong to this product" }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!isImageBuffer(buffer)) return NextResponse.json({ error: "Uploaded content is not a supported image" }, { status: 415 });
  const ext = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" } as Record<string, string>)[file.type];
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
    display_order: Number(formData.get("display_order") || 0),
    is_main,
    image_type: (formData.get("image_type") as string) || "reference",
    source_url: (formData.get("source_url") as string) || null,
    attribution: (formData.get("attribution") as string) || null,
  };

  if (is_main) {
    await sb.from("product_media").update({ is_main: false }).eq("product_id", id);
  }

  const { data, error } = await sb.from("product_media").insert(row).select().single();
  if (error) {
    await sb.storage.from("product-images").remove([storage_path]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Keep legacy products.images in sync for list cards
  if (product) {
    const images = [...((product.images as string[]) || [])];
    if (!images.includes(public_url)) {
      if (is_main) images.unshift(public_url);
      else images.push(public_url);
      await sb.from("products").update({ images }).eq("id", id);
    } else if (is_main) {
      const rest = images.filter((u) => u !== public_url);
      await sb.from("products").update({ images: [public_url, ...rest] }).eq("id", id);
    }
  }

  return NextResponse.json({ media: data }, { status: 201 });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const { id } = await ctx.params;
  const body = await req.json();
  const sb = getSupabaseAdmin();
  if (body.variant_id) {
    const { data: variant } = await sb.from("product_variants").select("id").eq("id", body.variant_id).eq("product_id", id).maybeSingle();
    if (!variant) return NextResponse.json({ error: "Variant does not belong to this product" }, { status: 400 });
  }
  if (body.is_main === true) await sb.from("product_media").update({ is_main: false }).eq("product_id", id);
  const allowed = ["variant_id", "title", "alt_text", "caption", "display_order", "is_main", "image_type", "source_url", "attribution"];
  const updates = Object.fromEntries(allowed.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
  const { data, error } = await sb.from("product_media").update(updates).eq("product_id", id).eq("id", body.mediaId).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
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
  if (row.storage_path) {
    const { error: storageError } = await sb.storage.from("product-images").remove([row.storage_path]);
    if (storageError) return NextResponse.json({ ok: true, warning: "Metadata removed but Storage cleanup failed", detail: storageError.message }, { status: 200 });
  }
  const { data: product } = await sb.from("products").select("images").eq("id", id).maybeSingle();
  if (product?.images?.length) await sb.from("products").update({ images: product.images.filter((url: string) => url !== row.public_url) }).eq("id", id);
  return NextResponse.json({ ok: true });
}
