// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/mongodb";
// import Product from "@/models/Product";

// export async function GET() {
//   await dbConnect();
//   const products = await Product.find().sort({ createdAt: -1 }).lean();
//   return NextResponse.json(products);
// }

// export async function POST(request: Request) {
//   await dbConnect();
//   try {
//     const body = await request.json();
//     if (!body?.id || !body?.title || typeof body.price !== "number") {
//       return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
//     }

//     const existing = await Product.findOne({ id: body.id });
//     if (existing) {
//       return NextResponse.json({ message: "Product with this id already exists" }, { status: 409 });
//     }

//     const created = await Product.create(body);
//     return NextResponse.json(created);
//   } catch (err) {
//     return NextResponse.json({ message: "Error creating product", error: String(err) }, { status: 500 });
//   }
// }

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
    
    // Detailed validation
    if (!body?.id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }
    if (!body?.title) {
      return NextResponse.json({ message: "Product title is required" }, { status: 400 });
    }
    if (typeof body.price !== "number" || body.price < 0) {
      return NextResponse.json({ message: "Product price must be a positive number" }, { status: 400 });
    }

    const existing = await Product.findOne({ id: body.id });
    if (existing) {
      return NextResponse.json({ message: `Product with ID '${body.id}' already exists` }, { status: 409 });
    }

    const created = await Product.create(body);
    return NextResponse.json(created);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[API] Product creation error:', err);
    return NextResponse.json({ 
      message: "Error creating product", 
      error: errorMsg,
      details: err instanceof Error ? err.stack : undefined
    }, { status: 500 });
  }
}

// Add PUT method for updating products
export async function PUT(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const updated = await Product.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ message: `Product with ID '${id}' not found` }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[API] Product update error:', err);
    return NextResponse.json({ 
      message: "Error updating product", 
      error: errorMsg,
      details: err instanceof Error ? err.stack : undefined
    }, { status: 500 });
  }
}

// Add DELETE method for removing products
export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const deleted = await Product.findOneAndDelete({ id: id });

    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting product", error: String(err) }, { status: 500 });
  }
}