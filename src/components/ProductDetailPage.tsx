// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
// import Link from "next/link";

// import { currency } from "@/utils/currency";


// // -------------------------------------------
// // Main Component
// // -------------------------------------------
// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   type Product = {
//     id: string;
//     title: string;
//     price: number;
//     category?: string;
//     images?: string[];
//     short?: string;
//     description?: string;
//     features?: string[];
//     videos?: string[];
//     specs?: Record<string, any>;
//   };

//   // const [quoteItems, setQuoteItems] = useState([]);
//   type QuoteItem = { product: Product; qty: number };
//   const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // -------------------------------------------
//   // Fetch product by ID
//   // -------------------------------------------
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     let mounted = true;
//     setLoading(true);
//     fetch(`/api/products/${id}`)
//       .then((r) => {
//         if (!r.ok) throw new Error("Not found");
//         return r.json();
//       })
//       .then((data) => mounted && setProduct(data))
//       .catch(() => mounted && setProduct(null))
//       .finally(() => mounted && setLoading(false));
//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   if (loading)
//     return <div className="min-h-screen flex items-center justify-center text-white">Loading…</div>;

//   if (!product)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Product not found.
//         <button
//           onClick={() => router.back()}
//           className="ml-4 px-4 py-2 bg-[var(--color-accent)] text-black rounded-full"
//         >
//           Go Back
//         </button>
//       </div>
//     );

//   // -------------------------------------------
//   // Quote Handlers
//   // -------------------------------------------
//   const addToQuote = (prod: Product) => {
//     setQuoteItems((prev) => {
//       const found = prev.find((p) => p.product.id === prod.id);
//       if (found) return prev.map((p) => (p.product.id === prod.id ? { ...p, qty: p.qty + 1 } : p));
//       return [{ product: prod, qty: 1 }, ...prev];
//     });
//     setDrawerOpen(true);
//   };

//   const changeQty = (productId: string, delta: number) =>
//     setQuoteItems((prev) =>
//       prev
//         .map((p) => (p.product.id === productId ? { ...p, qty: Math.max(1, p.qty + delta) } : p))
//         .filter(Boolean)
//     );

//   const removeFromQuote = (productId: string) =>
//     setQuoteItems((prev) => prev.filter((p) => p.product.id !== productId));

//   const quoteTotal = quoteItems.reduce((sum, it) => sum + it.product.price * it.qty, 0);

//   const buildMessage = () => {
//     let msg = `Hello GetAxe.Tech,\nI would like a quote for:\n\n`;
//     quoteItems.forEach((it, idx) => {
//       msg += `${idx + 1}. ${it.product.title} — Qty: ${it.qty} — ${currency(it.product.price)}\n`;
//     });
//     msg += `\nApprox Total: ${currency(quoteTotal)}\n\nThank you.`;
//     return msg;
//   };

//   const sendWhatsApp = () => {
//     if (!quoteItems.length) return alert("Add items to quote first.");
//     const msg = encodeURIComponent(buildMessage());
//     window.open(`https://wa.me/254700000000?text=${msg}`, "_blank");
//   };

//   const sendEmail = () => {
//     if (!quoteItems.length) return alert("Add items first.");
//     const subject = encodeURIComponent("Quote Request — GetAxe.Tech");
//     const body = encodeURIComponent(buildMessage());
//     window.location.href = `mailto:sales@getaxe.tech?subject=${subject}&body=${body}`;
//   };

//   // -------------------------------------------
//   // UI
//   // -------------------------------------------
//   return (
//     <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] pb-32 md:pb-10">
//       <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
//         {/* Images */}
//         <div className="flex-1 grid grid-cols-1 gap-4">
//           {(product.images ?? []).map((img, i) => (
//             <div key={i} className="relative w-full h-60 md:h-80 rounded-2xl overflow-hidden bg-black/20">
//               <Image src={img} alt={`${product.title} image ${i + 1}`} fill className="object-cover" />
//             </div>
//           ))}
//         </div>

//         {/* Details */}
//         <div className="flex-1 flex flex-col gap-4">
//           <h1 className="text-3xl font-bold">{product.title}</h1>
//           <div className="text-xl font-semibold">{currency(product.price)}</div>
//           <div className="text-sm text-white/50">{product.category}</div>
//           <p className="mt-4 text-white/70">{product.description}</p>

//           {product.features && product.features.length > 0 && (
//             <div className="mt-4">
//               <h4 className="font-semibold">Key Features</h4>
//               <ul className="list-disc ml-5 mt-2 text-white/70">
//                 {product.features.map((f, i) => (
//                   <li key={i}>{f}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Videos */}
//           {product.videos && product.videos.length > 0 && (
//             <div className="mt-6">
//               <h4 className="font-semibold mb-2">Product Videos</h4>
//               <div className="flex flex-col gap-4">
//                 {product.videos.map((v, i) => {
//                   // simple YouTube detection & embed
//                   const ytMatch = v.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/);
//                   const id = ytMatch ? ytMatch[1] : null;
//                   return (
//                     <div key={i} className="w-full rounded overflow-hidden bg-black/20">
//                       {id ? (
//                         <iframe
//                           title={`video-${i}`}
//                           src={`https://www.youtube.com/embed/${id}`}
//                           className="w-full h-56"
//                           allowFullScreen
//                         />
//                       ) : (
//                         <video controls src={v} className="w-full h-56 object-cover" />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           <button
//             onClick={() => addToQuote(product)}
//             className="mt-6 w-full md:w-auto px-6 py-3 bg-[var(--color-primary)] text-black rounded-full font-semibold hover:opacity-95"
//           >
//             Add to Quote
//           </button>

//           <Link href="/ict-products" className="text-[var(--color-accent)] mt-2 hover:underline">
//             ← Back to Products
//           </Link>
//         </div>
//       </div>

//       {/* Floating Quote Button (Mobile) */}
//       <button
//         onClick={() => setDrawerOpen(true)}
//         className="md:hidden fixed bottom-28 right-4 z-50 px-5 py-3 bg-[var(--color-accent)] text-black rounded-full shadow-xl flex items-center gap-2"
//       >
//         <ShoppingCart size={18} />
//         Quote ({quoteItems.length})
//       </button>

//       {/* Quote Drawer */}
//       <AnimatePresence>
//         {drawerOpen && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/60 z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setDrawerOpen(false)}
//             />
//             <motion.aside
//               className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-[#111] z-50 shadow-2xl p-6 overflow-y-auto"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", stiffness: 260, damping: 30 }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold">Your Quote</h3>
//                 <button onClick={() => setDrawerOpen(false)}>
//                   <X size={22} />
//                 </button>
//               </div>

//               {quoteItems.length === 0 ? (
//                 <div className="text-center py-20 text-white/60">Your quote is empty.</div>
//               ) : (
//                 <>
//                   <ul className="flex flex-col gap-6 mb-6">
//                     {quoteItems.map((it) => (
//                       <li key={it.product.id} className="flex gap-3">
//                         <div className="relative w-20 h-16 bg-black/30 rounded overflow-hidden">
//                           <Image src={it.product.images?.[0] ?? "/samples/laptop1.jpg"} alt={it.product.title} fill className="object-cover" />
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex justify-between">
//                             <div>
//                               <div className="text-sm font-medium">{it.product.title}</div>
//                               <div className="text-xs text-white/60">{currency(it.product.price)}</div>
//                             </div>
//                             <button onClick={() => removeFromQuote(it.product.id)} className="text-white/50 hover:text-red-400">
//                               <Trash2 size={16} />
//                             </button>
//                           </div>

//                           <div className="flex items-center gap-2 mt-2">
//                             <button onClick={() => changeQty(it.product.id, -1)} className="p-1 bg-black/30 rounded">
//                               <Minus size={14} />
//                             </button>
//                             <div className="px-3 py-1 bg-black/50 rounded">{it.qty}</div>
//                             <button onClick={() => changeQty(it.product.id, +1)} className="p-1 bg-black/30 rounded">
//                               <Plus size={14} />
//                             </button>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="border-t border-white/10 pt-4">
//                     <div className="flex justify-between mb-3">
//                       <span className="text-white/60">Subtotal</span>
//                       <span className="font-semibold">{currency(quoteTotal)}</span>
//                     </div>

//                     <button
//                       onClick={sendWhatsApp}
//                       className="w-full bg-[var(--color-accent)] text-black px-4 py-3 rounded-full font-semibold mb-2"
//                     >
//                       Request Quote via WhatsApp
//                     </button>
//                     <button
//                       onClick={sendEmail}
//                       className="w-full border border-white/20 px-4 py-3 rounded-full font-semibold"
//                     >
//                       Request Quote via Email
//                     </button>
//                   </div>
//                 </>
//               )}
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";

import { currency } from "@/utils/currency";

// -------------------------------------------
// Types
// -------------------------------------------
type ProductSpecsValue = string | number | boolean | ProductSpecs;
interface ProductSpecs {
  [key: string]: ProductSpecsValue;
}

export type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  images?: string[];
  short?: string;
  description?: string;
  features?: string[];
  videos?: string[];
  specs?: ProductSpecs;
};

type QuoteItem = { product: Product; qty: number };

// -------------------------------------------
// Main Component
// -------------------------------------------
export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // -------------------------------------------
  // Fetch product by ID
  // -------------------------------------------
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);

    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json() as Promise<Product>;
      })
      .then((data) => mounted && setProduct(data))
      .catch(() => mounted && setProduct(null))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading…
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Product not found.
        <button
          onClick={() => router.back()}
          className="ml-4 px-4 py-2 bg-[var(--color-accent)] text-black rounded-full"
        >
          Go Back
        </button>
      </div>
    );

  // -------------------------------------------
  // Quote Handlers
  // -------------------------------------------
  const addToQuote = (prod: Product) => {
    setQuoteItems((prev) => {
      const found = prev.find((p) => p.product.id === prod.id);
      if (found) return prev.map((p) => (p.product.id === prod.id ? { ...p, qty: p.qty + 1 } : p));
      return [{ product: prod, qty: 1 }, ...prev];
    });
    setDrawerOpen(true);
  };

  const changeQty = (productId: string, delta: number) =>
    setQuoteItems((prev) =>
      prev
        .map((p) => (p.product.id === productId ? { ...p, qty: Math.max(1, p.qty + delta) } : p))
        .filter(Boolean)
    );

  const removeFromQuote = (productId: string) =>
    setQuoteItems((prev) => prev.filter((p) => p.product.id !== productId));

  const quoteTotal = quoteItems.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  const buildMessage = () => {
    let msg = `Hello GetAxe.Tech,\nI would like a quote for:\n\n`;
    quoteItems.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.product.title} — Qty: ${it.qty} — ${currency(it.product.price)}\n`;
    });
    msg += `\nApprox Total: ${currency(quoteTotal)}\n\nThank you.`;
    return msg;
  };

  const sendWhatsApp = () => {
    if (!quoteItems.length) return alert("Add items to quote first.");
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/254700000000?text=${msg}`, "_blank");
  };

  const sendEmail = () => {
    if (!quoteItems.length) return alert("Add items first.");
    const subject = encodeURIComponent("Quote Request — GetAxe.Tech");
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:sales@getaxe.tech?subject=${subject}&body=${body}`;
  };

  // -------------------------------------------
  // UI
  // -------------------------------------------
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] pb-32 md:pb-10">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Images */}
        <div className="flex-1 grid grid-cols-1 gap-4">
          {product.images?.map((img, i) => (
            <div key={i} className="relative w-full h-60 md:h-80 rounded-2xl overflow-hidden bg-black/20">
              <Image src={img} alt={`${product.title} image ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="text-xl font-semibold">{currency(product.price)}</div>
          <div className="text-sm text-white/50">{product.category}</div>
          <p className="mt-4 text-white/70">{product.description}</p>

          {product.features?.length ? (
            <div className="mt-4">
              <h4 className="font-semibold">Key Features</h4>
              <ul className="list-disc ml-5 mt-2 text-white/70">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Videos */}
          {product.videos?.length ? (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Product Videos</h4>
              <div className="flex flex-col gap-4">
                {product.videos.map((v, i) => {
                  const ytMatch = v.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/);
                  const id = ytMatch ? ytMatch[1] : null;
                  return (
                    <div key={i} className="w-full rounded overflow-hidden bg-black/20">
                      {id ? (
                        <iframe
                          title={`video-${i}`}
                          src={`https://www.youtube.com/embed/${id}`}
                          className="w-full h-56"
                          allowFullScreen
                        />
                      ) : (
                        <video controls src={v} className="w-full h-56 object-cover" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <button
            onClick={() => addToQuote(product)}
            className="mt-6 w-full md:w-auto px-6 py-3 bg-[var(--color-primary)] text-black rounded-full font-semibold hover:opacity-95"
          >
            Add to Quote
          </button>

          <Link href="/ict-products" className="text-[var(--color-accent)] mt-2 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>

      {/* Floating Quote Button (Mobile) */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed bottom-28 right-4 z-50 px-5 py-3 bg-[var(--color-accent)] text-black rounded-full shadow-xl flex items-center gap-2"
      >
        <ShoppingCart size={18} />
        Quote ({quoteItems.length})
      </button>

      {/* Quote Drawer */}
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

              {quoteItems.length === 0 ? (
                <div className="text-center py-20 text-white/60">Your quote is empty.</div>
              ) : (
                <>
                  <ul className="flex flex-col gap-6 mb-6">
                    {quoteItems.map((it) => (
                      <li key={it.product.id} className="flex gap-3">
                        <div className="relative w-20 h-16 bg-black/30 rounded overflow-hidden">
                          <Image
                            src={it.product.images?.[0] ?? "/samples/laptop1.jpg"}
                            alt={it.product.title}
                            fill
                            className="object-cover"
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
