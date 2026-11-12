import { NextResponse } from "next/server";
import { sampleProducts } from "@/data/products";
import { productImageSources } from "@/data/product-image-sources";
import { requireAdminSession } from "@/lib/require-admin";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  productToRow,
} from "@/lib/supabase";

export async function POST() {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
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
    const rows = sampleProducts.map((p, index) => productToRow({
      ...p,
      displayOrder: index + 1,
      startingPrice: true,
      priceReviewedAt: null,
      imageSources: Object.fromEntries((p.images || []).map((image) => [image, productImageSources[image] ?? { sourcePage: "", sourceImage: "", rights: "Source not recorded; do not publish until cleared." }])),
    }));

    const { data: existing, error: lookupError } = await supabase
      .from("products")
      .select("id, images, image_sources")
      .in("id", rows.map((row) => row.id));
    if (lookupError) {
      return NextResponse.json({ message: lookupError.message }, { status: 500 });
    }
    const existingById = new Map((existing ?? []).map((row) => [row.id, row]));
    const legacyRows = rows.filter((row) => {
      const old = existingById.get(row.id);
      return old && ((old.images ?? []).some((image: string) => !image.startsWith("/products/")) || Object.values(old.image_sources ?? {}).some((meta: unknown) => JSON.stringify(meta).includes("local workspace asset")));
    });
    for (const row of legacyRows) {
      const { error } = await supabase.from("products").update({ images: row.images, image_sources: row.image_sources }).eq("id", row.id);
      if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    }
    const newRows = rows.filter((row) => !existingById.has(row.id));
    const { data, error } = newRows.length ? await supabase
      .from("products")
      .upsert(newRows, { onConflict: "id", ignoreDuplicates: true })
      .select("id") : { data: [], error: null };

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Seeded products into Supabase",
      count: (data?.length ?? 0) + legacyRows.length,
      ids: (data ?? []).map((r) => r.id),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error seeding", error: String(err) },
      { status: 500 }
    );
  }
}
