import { NextResponse } from "next/server";
import { sampleProducts } from "@/data/products";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  productToRow,
} from "@/lib/supabase";

export async function POST() {
  const allowed =
    process.env.NODE_ENV === "development" ||
    process.env.ALLOW_PRODUCT_SEED === "true";

  if (!allowed) {
    return NextResponse.json(
      { message: "Seeding disabled. Set ALLOW_PRODUCT_SEED=true or run in development." },
      { status: 403 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ message: "Supabase is not configured" }, { status: 503 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const rows = sampleProducts.map((p) => ({
      ...productToRow({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        images: p.images ?? [],
        videos: p.videos ?? [],
        features: p.features ?? [],
        short: p.short,
        description: p.description,
        specs: {},
      }),
      created_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("products")
      .upsert(rows, { onConflict: "id" })
      .select("id");

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Seeded products into Supabase",
      count: data?.length ?? rows.length,
      ids: (data ?? []).map((r) => r.id),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error seeding", error: String(err) },
      { status: 500 }
    );
  }
}
