"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { isBase64, isUrl, normalizeImageList } from '@/utils/image-utils';

/* -------------------------------------------
   UTILS
------------------------------------------- */
const currency = (n: number | string) =>
  typeof n === "number" ? "KSh " + n.toLocaleString("en-KE") : String(n);

// Using shared image utils for Base64/URL detection

export const getImageSource = (image: string | undefined): string => {
  if (!image) return '/placeholder.jpg';
  
  // If it's a Base64 string
  if (isBase64(image)) {
    return image; // Use directly as src
  }
  
  // If it's a URL or path
  if (isUrl(image)) {
    return image;
  }
  
  // Fallback placeholder
  return '/placeholder.jpg';
};

export const isBase64Image = (image: string): boolean => {
  return isBase64(image);
};

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  images?: string[];
  image?: string;
  short?: string;
  description?: string;
};

type QuoteItem = { product: Product; qty: number };

/* -------------------------------------------
   MAIN COMPONENT
------------------------------------------- */
export default function ICTProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => mounted && setProducts(data || []))
      .catch(() => setProducts([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* -------------------------------------------
     CATEGORIES
  ------------------------------------------- */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...cats];
  }, [products]);

  /* -------------------------------------------
     FILTER + SORT
  ------------------------------------------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products
      .filter((p) => {
        const matchCategory = category === "All" || p.category === category;
        const matchQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          (p.short ?? "").toLowerCase().includes(q);
        return matchCategory && matchQuery;
      });


    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, query, category, sortBy]);

  /* -------------------------------------------
     QUOTE HANDLERS
  ------------------------------------------- */
  const addToQuote = (product: Product) => {
    setQuoteItems((prev) => {
      const found = prev.find((p) => p.product.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.product.id === product.id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }
      return [{ product, qty: 1 }, ...prev];
    });
    setDrawerOpen(true);
  };

  const changeQty = (productId: string, delta: number) => {
    setQuoteItems((prev) =>
      prev
        .map((p) =>
          p.product.id === productId
            ? { ...p, qty: Math.max(1, p.qty + delta) }
            : p
        )
        .filter(Boolean)
    );
  };

  const removeFromQuote = (productId: string) =>
    setQuoteItems((prev) => prev.filter((p) => p.product.id !== productId));

  const clearQuote = () => setQuoteItems([]);

  const quoteTotal = quoteItems.reduce(
    (sum, it) => sum + it.product.price * it.qty,
    0
  );

  /* -------------------------------------------
     SEND QUOTE ACTIONS
  ------------------------------------------- */
  const buildMessage = () => {
    let msg = "Hello GetAxe.Tech,\nI would like a quote for:\n\n";
    quoteItems.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.product.title} — Qty: ${it.qty} — ${currency(
        it.product.price
      )}\n`;
    });
    msg += `\nApprox Total: ${currency(quoteTotal)}\n\nThank you.`;
    return msg;
  };

  const sendWhatsApp = () => {
    if (quoteItems.length === 0) return alert("Add items to quote first.");
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/254736889880?text=${msg}`, "_blank");
  };

  const sendEmail = () => {
    if (quoteItems.length === 0) return alert("Add items first.");
    const subject = encodeURIComponent("Quote Request — GetAxe.Tech");
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:hello@getaxe.tech?subject=${subject}&body=${body}`;
  };

  /* -------------------------------------------
     UI
  ------------------------------------------- */
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] pb-32 md:pb-10">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* -------------------------------------------
            HEADER + FILTERBAR — MOBILE RESPONSIVE
        ------------------------------------------- */}
        <div className="flex flex-col gap-6 mb-10">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">ICT Products</h1>
            <p className="text-sm text-[var(--color-text-subtle)] mt-1">
              Laptops • Tablets • Printers • Accessories • Consumables
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#0f0f0f] p-4 rounded-xl">

            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-sm outline-none"
            />

            <select
              className="w-full md:w-1/4 px-4 py-2 bg-[#111] rounded-lg text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              className="w-full md:w-1/4 px-4 py-2 bg-[#111] rounded-lg text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>

            <button
              onClick={() => setDrawerOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[var(--color-accent)] text-black px-5 py-2 rounded-full font-semibold"
            >
              <ShoppingCart size={18} />
              Quote ({quoteItems.length})
            </button>
          </div>
        </div>

        {/* -------------------------------------------
            PRODUCT GRID
        ------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="p-8 col-span-full text-center">Loading products…</div>
          ) : (
            filtered.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-[#0b0b0b] rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative w-full h-48 bg-black/20">
                  <Image
                    src={getImageSource(p.image ?? normalizeImageList(p.images ?? [])[0])}
                    alt={p.title}
                    fill
                    className="object-cover"
                    unoptimized={isBase64(p.image ?? normalizeImageList(p.images ?? [])[0] ?? '')}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-white/70 mb-3">{p.short}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">{currency(p.price)}</div>
                      <div className="text-xs text-white/50">{p.category}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => addToQuote(p)}
                        className="px-4 py-2 bg-[var(--color-primary)] rounded-full text-sm font-semibold"
                      >
                        Add to Quote
                      </button>

                      <Link
                        href={`/ict-products/${p.id}`}
                        className="text-sm text-[var(--color-accent)] hover:underline"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* -------------------------------------------
          FLOATING CART (MOBILE)
          RAISED ABOVE SOCIAL ICONS
      ------------------------------------------- */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed bottom-28 right-4 z-50 px-5 py-3 bg-[var(--color-accent)] text-black rounded-full shadow-xl flex items-center gap-2"
      >
        <ShoppingCart size={18} />
        Quote ({quoteItems.length})
      </button>

      {/* -------------------------------------------
          QUOTE DRAWER
      ------------------------------------------- */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-[#111] z-50 shadow-2xl p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Your Quote</h3>
                <button onClick={() => setDrawerOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              {/* Empty */}
              {quoteItems.length === 0 && (
                <div className="text-center py-20 text-white/60">
                  Your quote is empty.
                </div>
              )}

              {/* Items */}
              {quoteItems.length > 0 && (
                <>
                  <ul className="flex flex-col gap-6 mb-6">
                    {quoteItems.map((it) => (
                      <li key={it.product.id} className="flex gap-3">
                        <div className="relative w-20 h-16 bg-black/30 rounded overflow-hidden">
                          <Image
                            src={getImageSource(it.product.image ?? normalizeImageList(it.product.images ?? [])[0])}
                            alt={it.product.title}
                            fill
                            className="object-cover"
                            unoptimized={isBase64(it.product.image ?? normalizeImageList(it.product.images ?? [])[0] ?? '')}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-sm font-medium">{it.product.title}</div>
                              <div className="text-xs text-white/60">{currency(it.product.price)}</div>
                            </div>

                            <button
                              onClick={() => removeFromQuote(it.product.id)}
                              className="text-white/50 hover:text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => changeQty(it.product.id, -1)} className="p-1 bg-black/30 rounded">
                              <Minus size={14} />
                            </button>
                            <div className="px-3 py-1 bg-black/50 rounded">{it.qty}</div>
                            <button onClick={() => changeQty(it.product.id, +1)} className="p-1 bg-black/30 rounded">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between mb-3">
                      <span className="text-white/60">Subtotal</span>
                      <span className="font-semibold">{currency(quoteTotal)}</span>
                    </div>
                    <button
                      onClick={clearQuote}
                      className="w-full text-sm text-red-400 underline mt-3"
                    >
                      Clear All
                    </button>


                    <button
                      onClick={sendWhatsApp}
                      className="w-full bg-[var(--color-accent)] text-black px-4 py-3 rounded-full font-semibold mb-2"
                    >
                      Request Quote via WhatsApp
                    </button>

                    <button
                      onClick={sendEmail}
                      className="w-full border border-white/20 px-4 py-3 rounded-full font-semibold"
                    >
                      Request Quote via Email
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
