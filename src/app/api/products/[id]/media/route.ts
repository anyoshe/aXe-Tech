import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";

type Ctx = { params: Promise<{ id: string }> };

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
  const publicUrlOnly = formData.get("public_url") as string | null;

  const sb = getSupabaseAdmin();
  let public_url = publicUrlOnly?.trim() || "";
  let storage_path: string | null = null;

  if (file && file.size > 0) {
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 5MB" }, { status: 413 });
    }
    const ext = file.name.split(".").pop() || "jpg";
    storage_path = `${id}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await sb.storage.from("product-images").upload(storage_path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });
    const { data: pub } = sb.storage.from("product-images").getPublicUrl(storage_path);
    public_url = pub.publicUrl;
  }

  if (!public_url) {
    return NextResponse.json({ error: "file or public_url required" }, { status: 400 });
  }

  const is_main = formData.get("is_main") === "true";
  const row = {
    product_id: id,
    variant_id: (formData.get("variant_id") as string) || null,
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
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Keep legacy products.images in sync for list cards
  const { data: product } = await sb.from("products").select("images").eq("id", id).maybeSingle();
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

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
  const { id } = await ctx.params;
  const mediaId = req.nextUrl.searchParams.get("mediaId");
  if (!mediaId) return NextResponse.json({ error: "mediaId required" }, { status: 400 });

  const sb = getSupabaseAdmin();
  const { data: row } = await sb.from("product_media").select("*").eq("id", mediaId).eq("product_id", id).maybeSingle();
  if (row?.storage_path) {
    await sb.storage.from("product-images").remove([row.storage_path]);
  }
  const { error } = await sb.from("product_media").delete().eq("id", mediaId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
