"use client";

import { useMemo, useState, useEffect } from "react";
import ProductImage from "@/components/ProductImage";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingCart, Trash2, Plus, Minus, Home, MessageCircle, Search, ArrowRight, ShieldCheck, Truck, PackageCheck } from "lucide-react";
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
  imageSources?: Record<string, { sourcePage?: string; rights?: string; notes?: string }>;
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
    <div className="min-h-screen bg-[#080d15] text-[var(--color-text-main)] pb-32 md:pb-10">
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] bg-[#080d15]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2 text-xs text-white/45">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/65 hover:text-emerald-300">
            <Home className="w-4 h-4" /> Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/80">ICT Store</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <div className="mb-9 space-y-5">
          <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1722] shadow-[0_24px_90px_-40px_rgba(16,185,129,0.28)]">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(16,185,129,0.20),transparent_38%),radial-gradient(ellipse_at_0%_100%,rgba(59,130,246,0.12),transparent_45%)]" />
            <div className="grid gap-9 p-6 sm:p-9 lg:grid-cols-[minmax(0,1.35fr)_minmax(270px,.65fr)] lg:items-center lg:p-12">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.8)]" />
                  GetAxe · ICT store
                </p>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  The right tech.
                  <span className="block bg-gradient-to-r from-emerald-200 to-cyan-300 bg-clip-text text-transparent">Ready for what&apos;s next.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Shop practical ICT equipment for schools, teams and growing businesses. Build a shortlist and get a clear quote for the setup you actually need.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20an%20ICT%20product%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-200"
                  >
                    <MessageCircle className="h-4 w-4" /> Talk to a specialist
                  </a>
                  <a href="#catalogue" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09]">
                    Browse the catalogue <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-slate-400">Products in this catalogue</span>
                    <PackageCheck className="h-5 w-5 text-emerald-300" />
                  </div>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{products.length.toLocaleString("en-KE")}</p>
                  <p className="mt-1 text-xs text-slate-400">Equipment and complete ICT setups</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><ShieldCheck className="h-5 w-5" /></span>
                    <div>
                      <p className="text-sm font-semibold text-white">Quote before you order</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">Confirm model, stock and final pricing with our team.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-xs text-slate-400">
                    <Truck className="h-4 w-4 shrink-0 text-emerald-300" />
                    Delivery and installation options available
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

          <div id="catalogue" className="scroll-mt-24 rounded-2xl border border-white/[0.09] bg-[#101722] p-4 shadow-xl shadow-black/10 sm:p-5">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
              <Search className="h-4 w-4 text-emerald-300" /> Find your equipment
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative w-full lg:flex-1">
              <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                placeholder="Search laptops, printers, networking..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/10"
              />
            </div>

            <select
              aria-label="Filter by category"
              className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white lg:w-52"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white lg:w-44" value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Filter by brand">{brands.map((b) => <option key={b}>{b}</option>)}</select>
            <select className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white lg:w-48" value={condition} onChange={(e) => setCondition(e.target.value)} aria-label="Filter by condition">{conditions.map((c) => <option key={c}>{c}</option>)}</select>

            <select
              aria-label="Sort products"
              className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white lg:w-48"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>

            <button
              onClick={() => setDrawerOpen(true)}
              className="hidden items-center gap-2 rounded-xl bg-emerald-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200 md:flex"
            >
              <ShoppingCart size={18} />
              Quote ({quoteItems.length})
            </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="shrink-0 text-xs text-slate-400">Maximum <span className="font-semibold text-white">KES {maxPrice.toLocaleString("en-KE")}</span></label>
              <input className="w-full accent-emerald-300" type="range" min="1000" max="1000000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label="Maximum price" />
              <button className="shrink-0 text-xs font-semibold text-emerald-200 hover:text-white" onClick={() => { setQuery(""); setCategory("All"); setBrand("All"); setCondition("All"); setMaxPrice(1000000); setSortBy("featured"); }}>Reset filters</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${category === c ? "border-emerald-200 bg-emerald-300 text-slate-950" : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]"}`}>{c}</button>)}
            </div>
          </div>

        {/* -------------------------------------------
            PRODUCT GRID
        ------------------------------------------- */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span><strong className="text-white">{filtered.length}</strong> {filtered.length === 1 ? "result" : "results"}{query && <> for <strong className="text-white">&ldquo;{query}&rdquo;</strong></>}</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-300" /> Prices are indicative until confirmed by GetAxe</span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
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
              <p className="text-lg font-semibold text-white">{products.length ? "No products match these filters." : "The catalogue is being prepared."}</p>
              <p className="text-sm text-slate-400">{products.length ? "Try a different search or reset your filters to see more equipment." : "Please check back soon or contact our team for a tailored ICT quote."}</p>
              {products.length > 0 && <button className="mt-2 text-sm font-semibold text-emerald-200 hover:text-white" onClick={() => { setQuery(""); setCategory("All"); setBrand("All"); setCondition("All"); setMaxPrice(1000000); setSortBy("featured"); }}>Clear all filters</button>}
            </div>
          ) : (
            filtered.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111925] shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-[0_20px_55px_-35px_rgba(52,211,153,0.45)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
                  {p.featured && <span className="absolute left-3 top-3 z-10 rounded-full border border-emerald-200/70 bg-emerald-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950">Featured</span>}
                  {p.availability === "on_order" && <span className="absolute right-3 top-3 z-10 rounded-full border border-slate-900/10 bg-white/90 px-3 py-1 text-[10px] font-semibold text-slate-700">Available on order</span>}
                  <ProductImage productId={p.id} src={productImageList(p)[0]} alt={p.title} className="object-contain object-center p-3 sm:p-4 transition-transform duration-300 group-hover:scale-[1.03]" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  {p.imageSources?.[productImageList(p)[0]]?.rights?.includes("CC BY-SA 4.0") && (
                    <span className="absolute bottom-2 right-2 rounded bg-slate-950/80 px-2 py-1 text-[9px] text-white/85">
                      Photo: <a href={p.imageSources[productImageList(p)[0]].sourcePage} target="_blank" rel="noopener noreferrer" className="underline">IT Photography</a>
                      {" · "}<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a>
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200/80"><span>{p.category}</span>{p.condition && <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 normal-case tracking-normal text-slate-300">{p.condition}</span>}</div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{p.short}</p>
                  {p.specs && <ul className="mt-4 space-y-1.5 border-t border-white/[0.07] pt-3 text-xs text-slate-300">{Object.entries(p.specs).slice(0, 3).map(([k, v]) => <li key={k} className="truncate"><span className="text-slate-500">{k}:</span> {String(v)}</li>)}</ul>}
                  <div className="mt-auto pt-5">
                    <div className="flex items-end justify-between gap-3 border-t border-white/[0.08] pt-4">
                      <div><div className="text-xl font-bold tracking-tight text-white">{p.startingPrice !== false ? "From " : ""}{currency(p.price)}</div><div className="mt-1 text-[10px] text-slate-500">Indicative starting price</div></div>
                      <span className="text-right text-[10px] leading-relaxed text-slate-400">{p.brand}{p.availability === "on_order" ? " · On order" : ""}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3">
                      <button onClick={() => addToQuote(p)} className="rounded-xl bg-emerald-300 px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-200">Add to quote</button>
                      <Link href={`/ict-products/${p.id}`} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.05]">Details</Link>
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
                          <ProductImage productId={it.product.id} src={productImageList(it.product)[0]} alt={it.product.title} className="object-contain object-center p-1" sizes="80px" />
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
