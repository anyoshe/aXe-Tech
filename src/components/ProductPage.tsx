"use client";

import { useMemo, useState, useEffect } from "react";
import ProductImage from "@/components/ProductImage";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingCart, Trash2, Plus, Minus, Home, MessageCircle, Phone } from "lucide-react";
import { isBase64, isUrl } from '@/utils/image-utils';
import { productImageList } from "@/lib/product-images";

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
  brand?: string;
  condition?: string;
  availability?: string;
  published?: boolean;
  featured?: boolean;
  startingPrice?: boolean;
  specs?: Record<string, unknown>;
};

type QuoteItem = { product: Product; qty: number };

/* -------------------------------------------
   MAIN COMPONENT
------------------------------------------- */
export default function ICTProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    fetch("/api/products")
      .then(async (r) => {
        const data = await r.json();
        if (!mounted) return;
        if (!r.ok) {
          setLoadError(data?.message || data?.error || "Failed to load products");
          setProducts(Array.isArray(data?.products) ? data.products : []);
          return;
        }
        if (Array.isArray(data)) {
          setProducts(data);
          setLoadError(null);
        } else {
          setProducts([]);
          setLoadError(data?.message || "Unexpected response from server");
        }
      })
      .catch(() => {
        if (mounted) {
          setProducts([]);
          setLoadError("Network error — is the server running and Supabase configured?");
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [brand, setBrand] = useState("All");
  const [condition, setCondition] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* -------------------------------------------
     CATEGORIES
  ------------------------------------------- */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter((value): value is string => Boolean(value))));
    return ["All", ...cats];
  }, [products]);
  const brands = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.brand).filter(Boolean) as string[]))], [products]);
  const conditions = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.condition).filter(Boolean) as string[]))], [products]);

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
        return matchCategory && matchQuery && (brand === "All" || p.brand === brand) && (condition === "All" || p.condition === condition) && p.price <= maxPrice;
      });


    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

    return list;
  }, [products, query, category, sortBy, brand, condition, maxPrice]);

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
    let msg = "Hello GetAxe,\nPlease provide a formal quotation for:\n\n";
    quoteItems.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.product.title} — Qty: ${it.qty} — ${currency(
        it.product.price
      )}\n`;
    });
    msg += `\nIndicative estimate only: ${currency(quoteTotal)}\nPlease confirm model, availability, configuration and final price.\n\nThank you.`;
    return msg;
  };

  const sendWhatsApp = () => {
    if (quoteItems.length === 0) return alert("Add items to quote first.");
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/254736889880?text=${msg}`, "_blank");
  };

  const sendEmail = () => {
    if (quoteItems.length === 0) return alert("Add items first.");
    const subject = encodeURIComponent("Quote Request — getaxekenya.com");
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:hello@getaxekenya.com?subject=${subject}&body=${body}`;
  };

  /* -------------------------------------------
     UI
  ------------------------------------------- */
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] pb-32 md:pb-10">
      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/80 hover:text-[var(--color-accent)]">
            <Home className="w-4 h-4" /> Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">ICT Products</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <div className="flex flex-col gap-6 mb-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#10241f] via-[#111916] to-[#0b1110] p-6 sm:p-9 lg:p-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
            <div>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-[0.2em]">
                GetAxe Kenya · ICT catalogue
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">Technology that gets work done.</h1>
              <p className="text-sm sm:text-base text-white/65 mt-3 max-w-2xl leading-relaxed">
                Browse ICT equipment for schools, offices and institutions. Build a product list and request a formal quote for your configuration.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
                <span>Procurement and delivery</span><span>Installation and configuration</span><span>Bulk and school quotes</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20an%20ICT%20product%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 text-slate-950 font-semibold px-5 py-3 text-sm hover:bg-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp quote
              </a>
              <a
                href="tel:+254736889880"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101312] p-4 sm:p-5 space-y-4">
            <div className="flex flex-col lg:flex-row gap-3">
            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full lg:flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm outline-none focus:border-emerald-300/60"
            />

            <select
              className="w-full lg:w-52 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select className="w-full lg:w-44 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-sm" value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Filter by brand">{brands.map((b) => <option key={b}>{b}</option>)}</select>
            <select className="w-full lg:w-48 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-sm" value={condition} onChange={(e) => setCondition(e.target.value)} aria-label="Filter by condition">{conditions.map((c) => <option key={c}>{c}</option>)}</select>

            <select
              className="w-full lg:w-48 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>

            <button
              onClick={() => setDrawerOpen(true)}
              className="hidden md:flex items-center gap-2 bg-emerald-300 text-slate-950 px-5 py-3 rounded-xl font-semibold"
            >
              <ShoppingCart size={18} />
              Quote ({quoteItems.length})
            </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="shrink-0 text-xs text-white/60">Up to <span className="font-semibold text-white">KES {maxPrice.toLocaleString("en-KE")}</span></label>
              <input className="w-full accent-emerald-300" type="range" min="1000" max="1000000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label="Maximum price" />
              <button className="shrink-0 text-xs text-emerald-200 hover:text-white" onClick={() => { setQuery(""); setCategory("All"); setBrand("All"); setCondition("All"); setMaxPrice(1000000); setSortBy("featured"); }}>Reset</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${category === c ? "bg-emerald-300 text-slate-950" : "bg-white/5 text-white/70 hover:bg-white/10"}`}>{c}</button>)}
            </div>
          </div>
        </div>

        {/* -------------------------------------------
            PRODUCT GRID
        ------------------------------------------- */}
        <div className="mb-4 flex items-center justify-between text-sm text-white/55"><span>{filtered.length} {filtered.length === 1 ? "product" : "products"}</span><span>Prices are indicative until confirmed by GetAxe</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {loading ? (
            <div className="p-8 col-span-full text-center">Loading products…</div>
          ) : loadError ? (
            <div className="p-8 col-span-full text-center space-y-3">
              <p className="text-red-400 font-medium">Could not load products</p>
              <p className="text-sm text-white/70 max-w-xl mx-auto">{loadError}</p>
              <p className="text-xs text-white/50">
                Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, run schema.sql, then restart npm run dev. Admin: /admin/products
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 col-span-full text-center space-y-2">
              <p className="text-white/80">No ICT products yet.</p>
              <p className="text-sm text-white/50">
                Add products at <a className="underline" href="/admin/products">/admin/products</a>
              </p>
            </div>
          ) : (
            filtered.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group bg-[#111615] border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg shadow-black/10 hover:border-emerald-300/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-white to-slate-100 overflow-hidden">
                  {p.featured && <span className="absolute top-3 left-3 z-10 rounded-full bg-emerald-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950">Featured</span>}
                  {p.availability === "on_order" && <span className="absolute top-3 right-3 z-10 rounded-full bg-slate-900/85 px-3 py-1 text-[10px] font-semibold text-white">Available on order</span>}
                  <ProductImage productId={p.id} src={productImageList(p)[0]} alt={p.title} className="object-contain p-4 sm:p-6 transition-transform duration-300 group-hover:scale-[1.03]" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                </div>

                <div className="p-5 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide text-white/45"><span>{p.category}</span>{p.condition && <span className="rounded-full bg-white/5 px-2.5 py-1 normal-case tracking-normal text-white/65">{p.condition}</span>}</div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-2">{p.short}</p>
                  {p.specs && <ul className="mt-3 space-y-1 text-xs text-white/55">{Object.entries(p.specs).slice(0, 3).map(([k, v]) => <li key={k} className="truncate"><span className="text-white/40">{k}:</span> {String(v)}</li>)}</ul>}
                  <div className="mt-auto pt-5">
                    <div className="flex items-end justify-between gap-3 border-t border-white/[0.08] pt-4">
                      <div><div className="text-xl font-bold">{p.startingPrice !== false ? "From " : ""}{currency(p.price)}</div><div className="mt-1 text-[10px] text-white/40">Indicative starting price</div></div>
                      <span className="text-right text-[10px] leading-relaxed text-white/45">{p.brand}{p.availability === "on_order" ? " · On order" : ""}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3">
                      <button onClick={() => addToQuote(p)} className="rounded-xl bg-emerald-300 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-200 transition-colors">Add to quote</button>
                      <Link href={`/ict-products/${p.id}`} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold hover:bg-white/5">Details</Link>
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
                        <div className="relative w-20 h-16 bg-white rounded overflow-hidden">
                          <ProductImage productId={it.product.id} src={productImageList(it.product)[0]} alt={it.product.title} className="object-contain p-1" sizes="80px" />
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
