"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { currency } from "@/utils/currency";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  images?: string[];
  short?: string;
  description?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setProducts(data || []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-8 text-center">Loading products…</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="bg-[#0b0b0b] rounded-xl overflow-hidden shadow-lg">
          <div className="relative w-full h-48">
            <Image src={p.images?.[0] ?? "/samples/laptop1.jpg"} alt={p.title} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-white/70">{p.short}</p>
            <div className="text-xl font-bold">{currency(p.price)}</div>
            <Link
              href={`/ict-products/${p.id}`}
              className="mt-2 inline-block text-[var(--color-accent)] hover:underline"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
