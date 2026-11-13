import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/require-admin";
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
        "Supabase server access is not configured. Set NEXT_PUBLIC_SUPABASE_URL and the server-only SUPABASE_SERVICE_ROLE_KEY (see SUPABASE_SETUP.md).",
      products: [],
    },
    { status: 503 }
  );
}

export async function GET() {
  if (!isSupabaseConfigured()) return notConfigured();

  try {
    const admin = await requireAdminSession();
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true })
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

    const rows = (data ?? []) as ProductRow[];
    const variantsByProduct = new Map<string, { hasVariants: boolean; startingPrice: number | null }>();
    const { data: variants, error: variantsError } = await supabase
      .from("product_variants")
      .select("product_id, published, availability, price");
    if (!variantsError) {
      for (const variant of variants ?? []) {
        const current = variantsByProduct.get(variant.product_id) ?? { hasVariants: false, startingPrice: null };
        current.hasVariants = true;
        const price = Number(variant.price);
        if (variant.published !== false && variant.availability !== "unavailable" && Number.isFinite(price) && price > 0) {
          current.startingPrice = current.startingPrice == null ? price : Math.min(current.startingPrice, price);
        }
        variantsByProduct.set(variant.product_id, current);
      }
    } else if (variantsError.code !== "42P01" && !variantsError.message?.includes("product_variants")) {
      console.error("[API] product variants pricing:", variantsError);
      return NextResponse.json({ message: variantsError.message, products: [] }, { status: 500 });
    }

    const { data: productMedia, error: mediaError } = await supabase
      .from("product_media")
      .select("product_id, public_url, is_main, display_order")
      .is("variant_id", null)
      .order("is_main", { ascending: false })
      .order("display_order", { ascending: true });
    if (mediaError && mediaError.code !== "42P01" && !mediaError.message?.includes("product_media")) {
      console.error("[API] product media:", mediaError);
      return NextResponse.json({ message: mediaError.message, products: [] }, { status: 500 });
    }

    const imagesByProduct = new Map<string, string[]>();
    for (const media of productMedia || []) {
      const images = imagesByProduct.get(media.product_id) || [];
      if (media.public_url && !images.includes(media.public_url)) images.push(media.public_url);
      imagesByProduct.set(media.product_id, images);
    }

    const products = rows.map((row) => {
      const product = rowToProduct(row);
      const config = variantsByProduct.get(product.id);
      if (config?.hasVariants) product.price = config.startingPrice ?? 0;
      const managedImages = imagesByProduct.get(product.id);
      if (managedImages?.length) product.images = managedImages;
      return product;
    })
      .filter((product) => admin.session?.user?.role === "admin" || product.published !== false)
      .map((product) => {
        if (admin.session?.user?.role === "admin") return product;
        const publicProduct = { ...product };
        delete publicProduct.internalCost;
        delete publicProduct.targetPrice;
        delete publicProduct.bulkPrice;
        delete publicProduct.marketNotes;
        delete publicProduct.supplierReference;
        return publicProduct;
      });
    return NextResponse.json(products);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[API] products GET:", err);
    return NextResponse.json({ message: errorMsg, products: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return notConfigured();

  
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
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
      ...body,
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

  
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
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
      ...rest,
    });

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    for (const [k, v] of Object.entries(row)) {
      if (k === "id") continue;
      if (v !== undefined) update[k] = v;
    }
    // Product photos are managed by the media API. A missing image field must
    // preserve current legacy references, including gallery uploads made while
    // the admin form has stale product data loaded.
    if (rest.images === undefined) delete update.images;
    if (Array.isArray(rest.removeImages) && rest.removeImages.length) {
      if (!rest.removeImages.every((url: unknown) => typeof url === "string")) {
        return NextResponse.json({ message: "removeImages must contain image URLs" }, { status: 400 });
      }
      const { data: currentProduct, error: currentError } = await supabase.from("products").select("images").eq("id", id).maybeSingle();
      if (currentError) return NextResponse.json({ message: currentError.message }, { status: 500 });
      if (!currentProduct) return NextResponse.json({ message: `Product with ID '${id}' not found` }, { status: 404 });
      const removeSet = new Set(rest.removeImages as string[]);
      update.images = ((currentProduct.images as string[] | null) || []).filter((url) => !removeSet.has(url));
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

  
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;
try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: mediaRows, error: mediaError } = await supabase.from("product_media").select("storage_path").eq("product_id", id);
    if (mediaError) return NextResponse.json({ message: mediaError.message }, { status: 500 });
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
    const candidatePaths = [...new Set((mediaRows || []).map((row) => row.storage_path).filter((path): path is string => Boolean(path)))];
    let storagePaths = candidatePaths;
    if (candidatePaths.length) {
      const { data: remainingReferences, error: referenceError } = await supabase.from("product_media").select("storage_path").in("storage_path", candidatePaths);
      if (referenceError) return NextResponse.json({ message: "Product deleted; Storage references need manual review", id, warning: referenceError.message }, { status: 200 });
      const stillUsed = new Set((remainingReferences || []).map((row) => row.storage_path));
      storagePaths = candidatePaths.filter((path) => !stillUsed.has(path));
    }
    if (storagePaths.length) {
      const { error: storageError } = await supabase.storage.from("product-images").remove(storagePaths);
      if (storageError) return NextResponse.json({ message: "Product deleted; Storage cleanup needs review", id, warning: storageError.message }, { status: 200 });
    }
    return NextResponse.json({ message: "Product deleted", id });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: "Error deleting product", error: errorMsg }, { status: 500 });
  }
}
