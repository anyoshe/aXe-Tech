import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

// 5MB limit per file
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const productId = formData.get("productId") as string;
    const type = formData.get("type") as string; // "image" or "video"

    if (!file || !productId || !type) {
      return NextResponse.json(
        { message: "Missing file, productId, or type" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` },
        { status: 413 }
      );
    }

    // Convert file to Base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const mimeType = file.type;
    const base64Data = `data:${mimeType};base64,${base64}`;

    // Find product and add to images or videos array
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (type === "image") {
      if (!product.images) product.images = [];
      product.images.push(base64Data);
    } else if (type === "video") {
      if (!product.videos) product.videos = [];
      product.videos.push(base64Data);
    } else {
      return NextResponse.json(
        { message: "Type must be 'image' or 'video'" },
        { status: 400 }
      );
    }

    await product.save();
    return NextResponse.json({
      message: "Upload successful",
      product,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { message: "Upload failed", error: String(err) },
      { status: 500 }
    );
  }
}
