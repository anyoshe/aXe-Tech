import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  productToRow,
  rowToProduct,
  type ProductRow,
} from "@/lib/supabase";

function notConfigured() {
  return NextResponse.json(
    {
      message:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (see SUPABASE_SETUP.md).",
      products: [],
    },
    { status: 503 }
  );
}

export async function GET() {
  if (!isSupabaseConfigured()) return notConfigured();

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[API] products GET:", error);
      return NextResponse.json(
        {
          message: error.message,
          hint: "Did you run supabase/schema.sql in the Supabase SQL Editor?",
          products: [],
        },
        { status: 500 }
      );
    }

    const products = ((data ?? []) as ProductRow[]).map(rowToProduct);
    return NextResponse.json(products);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[API] products GET:", err);
    return NextResponse.json({ message: errorMsg, products: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return notConfigured();

  try {
    const body = await request.json();

    if (!body?.id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }
    if (!body?.title) {
      return NextResponse.json({ message: "Product title is required" }, { status: 400 });
    }
    if (typeof body.price !== "number" || body.price < 0) {
      return NextResponse.json(
        { message: "Product price must be a non-negative number" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("id", body.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { message: `Product with ID '${body.id}' already exists` },
        { status: 409 }
      );
    }

    const row = productToRow({
      id: body.id,
      title: body.title,
      price: body.price,
      category: body.category,
      images: body.images ?? [],
      videos: body.videos ?? [],
      features: body.features ?? [],
      short: body.short,
      description: body.description,
      specs: body.specs ?? {},
    });

    const { data, error } = await supabase
      .from("products")
      .insert({ ...row, created_at: new Date().toISOString() })
      .select()
      .single();

    if (error) {
      console.error("[API] products POST:", error);
      return NextResponse.json({ message: error.message, error: error.details }, { status: 500 });
    }

    return NextResponse.json(rowToProduct(data as ProductRow), { status: 201 });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[API] products POST:", err);
    return NextResponse.json({ message: "Error creating product", error: errorMsg }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isSupabaseConfigured()) return notConfigured();

  try {
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const row = productToRow({
      id,
      title: rest.title,
      price: rest.price,
      category: rest.category,
      images: rest.images,
      videos: rest.videos,
      features: rest.features,
      short: rest.short,
      description: rest.description,
      specs: rest.specs,
    });

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    for (const [k, v] of Object.entries(row)) {
      if (k === "id") continue;
      if (v !== undefined) update[k] = v;
    }

    const { data, error } = await supabase
      .from("products")
      .update(update)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ message: `Product with ID '${id}' not found` }, { status: 404 });
    }

    return NextResponse.json(rowToProduct(data as ProductRow));
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: "Error updating product", error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isSupabaseConfigured()) return notConfigured();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ message: `Product with ID '${id}' not found` }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted", id });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: "Error deleting product", error: errorMsg }, { status: 500 });
  }
}
