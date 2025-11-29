import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import { sampleProducts } from "@/data/products";

export async function POST() {
  // Only allow seeding in development to avoid accidental production writes
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Seeding allowed only in development" }, { status: 403 });
  }

  await dbConnect();

  // Upsert products by `id`
  const ops = sampleProducts.map((p) => ({
    updateOne: {
      filter: { id: p.id },
      update: { $set: p },
      upsert: true,
    },
  }));

  try {
    await Product.bulkWrite(ops);
    return NextResponse.json({ message: "Seeded products" });
  } catch (err) {
    return NextResponse.json({ message: "Error seeding", error: String(err) }, { status: 500 });
  }
}
