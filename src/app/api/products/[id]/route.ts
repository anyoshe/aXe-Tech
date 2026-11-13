import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  rowToProduct,
  type ProductRow,
} from "@/lib/supabase";
import { requireAdminSession } from "@/lib/require-admin";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ message: "Supabase is not configured" }, { status: 503 });
  }

  try {
    const { id } = await context.params;
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const admin = await requireAdminSession();
    const isAdmin = admin.session?.user?.role === "admin";
    if (data.published === false && !isAdmin) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const product = rowToProduct(data as ProductRow);
    const publicProduct = { ...product };
    delete publicProduct.internalCost;
    delete publicProduct.targetPrice;
    delete publicProduct.bulkPrice;
    delete publicProduct.marketNotes;
    delete publicProduct.supplierReference;

    // Optional catalogue enhancement tables (run product-variants-media.sql)
    let variants: unknown[] = [];
    let media: unknown[] = [];
    try {
      const vq = supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", id)
        .order("sort_order", { ascending: true });
      const { data: vdata } = await vq;
      variants = (vdata || []).filter((variant) => isAdmin || variant.published === true);
    } catch {
      variants = [];
    }
    let hasVariants = false;
    let startingVariantPrice: number | null = null;
    try {
      const { data: allVariants } = await supabase
        .from("product_variants")
        .select("published, availability, price")
        .eq("product_id", id);
      hasVariants = (allVariants?.length || 0) > 0;
      for (const variant of allVariants || []) {
        const price = Number(variant.price);
        if (variant.published === true && variant.availability !== "unavailable" && Number.isFinite(price) && price > 0) {
          startingVariantPrice = startingVariantPrice == null ? price : Math.min(startingVariantPrice, price);
        }
      }
    } catch {
      hasVariants = variants.length > 0;
    }
    if (hasVariants) publicProduct.price = startingVariantPrice ?? 0;
    try {
      const { data: mdata } = await supabase
        .from("product_media")
        .select("*")
        .eq("product_id", id)
        .order("display_order", { ascending: true });
      const visibleVariantIds = new Set(variants.map((variant) => (variant as { id: string }).id));
      media = (mdata || []).filter((item) => isAdmin || !item.variant_id || visibleVariantIds.has(item.variant_id));
    } catch {
      media = [];
    }

    const safeVariants = isAdmin ? variants : variants.map((variant) => {
      const publicVariant = { ...(variant as Record<string, unknown>) };
      delete publicVariant.notes;
      return publicVariant;
    });
    return NextResponse.json({ ...publicProduct, hasVariants, variants: safeVariants, media });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
}
