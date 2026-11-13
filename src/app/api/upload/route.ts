import { NextResponse, NextRequest } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";
import { hasValidProductImageSignature, MAX_PRODUCT_IMAGE_BYTES, PRODUCT_IMAGE_EXTENSIONS } from "@/lib/product-media-validation";

/**
 * Upload an image to Supabase Storage (bucket: product-images)
 * and optionally append the public URL to a product's images array.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { message: "Supabase is not configured" },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const productId = formData.get("productId") as string | null;

    if (!file) {
      return NextResponse.json({ message: "Missing file" }, { status: 400 });
    }
    if (!productId) return NextResponse.json({ message: "productId is required; use the product photo gallery" }, { status: 400 });
    if (file.size === 0) return NextResponse.json({ message: "File is empty" }, { status: 400 });
    if (file.size > MAX_PRODUCT_IMAGE_BYTES) {
      return NextResponse.json(
        { message: `File exceeds ${MAX_PRODUCT_IMAGE_BYTES / (1024 * 1024)}MB limit` },
        { status: 413 }
      );
    }

    if (!PRODUCT_IMAGE_EXTENSIONS[file.type]) return NextResponse.json({ message: "Only JPEG, PNG, WebP or GIF images are accepted" }, { status: 415 });
    const supabase = getSupabaseAdmin();
    const { data: product } = await supabase.from("products").select("images").eq("id", productId).maybeSingle();
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!hasValidProductImageSignature(buffer, file.type)) return NextResponse.json({ message: "Uploaded content does not match its image type" }, { status: 415 });
    const path = `${productId}/${crypto.randomUUID()}.${PRODUCT_IMAGE_EXTENSIONS[file.type]}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { message: uploadError.message },
        { status: 500 }
      );
    }

    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
    const url = pub.publicUrl;

    const isMain = !((product.images as string[] | null) || []).length;
    const { error: mediaError } = await supabase.from("product_media").insert({
      product_id: productId, storage_path: path, public_url: url,
      alt_text: file.name.replace(/\.[^.]+$/, ""), image_type: "reference", is_main: isMain,
    });
    if (mediaError) {
      await supabase.storage.from("product-images").remove([path]);
      return NextResponse.json({ message: mediaError.message }, { status: 500 });
    }
    const images = [...((product.images as string[] | null) || []), url];
    const { error: updateError } = await supabase.from("products").update({ images }).eq("id", productId);
    if (updateError) return NextResponse.json({ url, path, warning: "Image uploaded but legacy card image sync failed" }, { status: 200 });

    return NextResponse.json({ url, path });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
