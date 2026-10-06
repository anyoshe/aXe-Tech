import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  rowToProduct,
  type ProductRow,
} from "@/lib/supabase";

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

    return NextResponse.json(rowToProduct(data as ProductRow));
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
}
