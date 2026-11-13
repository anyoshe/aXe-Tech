import ProductDetailPage from "@/components/ProductDetailPage";
import type { Metadata } from "next";
import { getSupabaseAdmin, isSupabaseConfigured, rowToProduct, type ProductRow } from "@/lib/supabase";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const canonical = `https://getaxekenya.com/ict-products/${encodeURIComponent(id)}`;
  if (!isSupabaseConfigured()) return { alternates: { canonical } };
  try {
    const { data } = await getSupabaseAdmin().from("products").select("*").eq("id", id).eq("published", true).maybeSingle();
    if (!data) return { title: "Product not found | GetAxe Kenya", alternates: { canonical } };
    const product = rowToProduct(data as ProductRow);
    const title = product.seoTitle || `${product.title} | GetAxe Kenya`;
    const description = product.seoDescription || product.short || product.description || `View ${product.title} configurations and request a quotation from GetAxe Kenya.`;
    return { title, description, alternates: { canonical }, openGraph: { type: "website", title, description, url: canonical, images: product.images?.[0] ? [product.images[0]] : undefined } };
  } catch {
    return { alternates: { canonical } };
  }
}

export default function ProductDetailRoute() {
  return (
    <>
      <main>
        <ProductDetailPage />
      </main>
    </>
  );
}
