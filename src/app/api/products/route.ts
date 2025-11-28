import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    if (!body?.id || !body?.title || typeof body.price !== "number") {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const existing = await Product.findOne({ id: body.id });
    if (existing) {
      return NextResponse.json({ message: "Product with this id already exists" }, { status: 409 });
    }

    const created = await Product.create(body);
    return NextResponse.json(created);
  } catch (err) {
    return NextResponse.json({ message: "Error creating product", error: String(err) }, { status: 500 });
  }
}
