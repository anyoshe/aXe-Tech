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
    if (data.published === false && !admin.session) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const product = rowToProduct(data as ProductRow);
    const { internalCost: _cost, targetPrice: _target, bulkPrice: _bulk, marketNotes: _notes, supplierReference: _supplier, ...publicProduct } = product;

    // Optional catalogue enhancement tables (run product-variants-media.sql)
    let variants: unknown[] = [];
    let media: unknown[] = [];
    try {
      let vq = supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", id)
        .order("sort_order", { ascending: true });
      if (!admin.session) vq = vq.eq("published", true);
      const { data: vdata } = await vq;
      variants = vdata || [];
    } catch {
      variants = [];
    }
    try {
      const { data: mdata } = await supabase
        .from("product_media")
        .select("*")
        .eq("product_id", id)
        .order("display_order", { ascending: true });
      media = mdata || [];
    } catch {
      media = [];
    }

    return NextResponse.json({ ...publicProduct, variants, media });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
}
