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
    return NextResponse.json(publicProduct);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
}
