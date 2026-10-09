import { NextResponse, NextRequest } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: `File exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` },
        { status: 413 }
      );
    }

    const supabase = getSupabaseAdmin();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${productId || "misc"}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { message: uploadError.message },
        { status: 500 }
      );
    }

    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
    const url = pub.publicUrl;

    if (productId) {
      const { data: product } = await supabase
        .from("products")
        .select("images")
        .eq("id", productId)
        .maybeSingle();

      if (product) {
        const images = [...((product.images as string[]) || []), url];
        await supabase.from("products").update({ images }).eq("id", productId);
      }
    }

    return NextResponse.json({ url, path });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
