"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, Star, Shield, Battery, Cpu, HardDrive, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { normalizeImageList } from '@/utils/image-utils';

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
  createdAt?: string;
  updatedAt?: string;
};

type QuoteItem = { product: Product; qty: number };

// -------------------------------------------
// Utility Functions
// -------------------------------------------
const currency = (n: number | string) =>
  typeof n === "number" ? "KSh " + n.toLocaleString("en-KE") : String(n);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Image Helper Functions
const isBase64 = (str: string | undefined): boolean => {
  if (!str) return false;
  // Check for Base64 image pattern
  return /^data:image\/[a-zA-Z]+;base64,/.test(str);
};

const isUrl = (str: string | undefined): boolean => {
  if (!str) return false;
  return str.startsWith('http') || str.startsWith('/');
};

const getImageSource = (image: string | undefined): string => {
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

// -------------------------------------------
// Main Component
// -------------------------------------------
export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // -------------------------------------------
  // Fetch product by ID
  // -------------------------------------------
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Product not found");
        return r.json();
      })
      .then((data) => {
        if (mounted) {
          setProduct(data);
          console.log("Product data:", data); // Debug log
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setProduct(null);
        }
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

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

  const clearQuote = () => setQuoteItems([]);

  const quoteTotal = quoteItems.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  const buildMessage = () => {
    let msg = `Hello getaxekenya.com,\nI would like a quote for:\n\n`;
    quoteItems.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.product.title} — Qty: ${it.qty} — ${currency(it.product.price)}\n`;
    });
    msg += `\nApprox Total: ${currency(quoteTotal)}\n\nThank you.`;
    return msg;
  };

  const sendWhatsApp = () => {
    if (!quoteItems.length) return alert("Add items to quote first.");
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/254736889880?text=${msg}`, "_blank");
  };

  const sendEmail = () => {
    if (!quoteItems.length) return alert("Add items first.");
    const subject = encodeURIComponent("Quote Request — getaxekenya.com");
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:hello@getaxekenya.com?subject=${subject}&body=${body}`;
  };

  // -------------------------------------------
  // Loading State
  // -------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading product details...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------
  // Error State
  // -------------------------------------------
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-white/70 mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              Go Back
            </button>
            <Link
              href="/ict-products"
              className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-full font-semibold hover:opacity-95 transition-opacity"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------
  // Main UI
  // -------------------------------------------
  const images = normalizeImageList(product.images ?? []);
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] pb-32 md:pb-10">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/ict-products"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline transition-all"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/20">
              {isBase64(images[selectedImage]) ? (
                <img
                  src={getImageSource(images[selectedImage])}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={getImageSource(images[selectedImage])}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images && images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-[var(--color-accent)]" 
                        : "border-transparent hover:border-white/30"
                    }`}
                  >
                    {isBase64(image) ? (
                      <img
                        src={getImageSource(image)}
                        alt={`${product.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={getImageSource(image)}
                        alt={`${product.title} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Shield className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-2" />
                <p className="text-xs text-white/70">Warranty Included</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Battery className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-2" />
                <p className="text-xs text-white/70">Quality Checked</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Star className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-2" />
                <p className="text-xs text-white/70">Premium Support</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <span className="inline-block px-3 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full text-sm font-medium mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.title}</h1>
              <p className="text-lg text-white/70 mt-2">{product.short}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-[var(--color-accent)]">
                {currency(product.price)}
              </div>
              {product.createdAt && (
                <span className="text-sm text-white/50">
                  Added {formatDate(product.createdAt)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed">{product.description}</p>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[var(--color-accent)]" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-[var(--color-accent)]" />
                  Technical Specifications
                </h3>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-white/10 last:border-b-0">
                        <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-white/90 font-medium">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => addToQuote(product)}
                className="flex-1 px-8 py-4 bg-[var(--color-accent)] text-black rounded-full font-semibold hover:opacity-95 transition-all duration-300 transform hover:scale-105"
              >
                Add to Quote
              </button>
              <button
                onClick={() => {
                  addToQuote(product);
                  setDrawerOpen(true);
                }}
                className="flex-1 px-8 py-4 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-full font-semibold hover:bg-[var(--color-accent)]/10 transition-all"
              >
                Quick Quote
              </button>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        {product.videos && product.videos.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Product Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.videos.map((video, index) => {
                const ytMatch = video.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/);
                const id = ytMatch ? ytMatch[1] : null;
                
                return (
                  <div key={index} className="bg-white/5 rounded-2xl overflow-hidden">
                    {id ? (
                      <div className="aspect-video">
                        <iframe
                          title={`video-${index}`}
                          src={`https://www.youtube.com/embed/${id}`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video 
                        controls 
                        src={video} 
                        className="w-full aspect-video object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Quote Button (Mobile) */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed bottom-28 right-4 z-50 px-5 py-3 bg-[var(--color-accent)] text-black rounded-full shadow-2xl flex items-center gap-2 font-semibold hover:scale-105 transition-transform"
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
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {quoteItems.length === 0 ? (
                <div className="text-center py-20 text-white/60">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your quote is empty.</p>
                  <p className="text-sm mt-2">Add products to get started</p>
                </div>
              ) : (
                <>
                  <ul className="flex flex-col gap-4 mb-6">
                    {quoteItems.map((it) => (
                      <motion.li 
                        key={it.product.id} 
                        className="flex gap-3 p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="relative w-16 h-16 bg-black/30 rounded overflow-hidden flex-shrink-0">
                          {isBase64(normalizeImageList(it.product.images ?? [])[0]) ? (
                            <img
                              src={getImageSource(normalizeImageList(it.product.images ?? [])[0])}
                              alt={it.product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image
                              src={getImageSource(normalizeImageList(it.product.images ?? [])[0])}
                              alt={it.product.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{it.product.title}</div>
                              <div className="text-xs text-white/60">{currency(it.product.price)}</div>
                            </div>
                            <button
                              onClick={() => removeFromQuote(it.product.id)}
                              className="text-white/50 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => changeQty(it.product.id, -1)} 
                              className="p-1 bg-black/30 rounded hover:bg-black/50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <div className="px-3 py-1 bg-black/50 rounded min-w-8 text-center">{it.qty}</div>
                            <button 
                              onClick={() => changeQty(it.product.id, +1)} 
                              className="p-1 bg-black/30 rounded hover:bg-black/50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                            <div className="text-sm font-medium ml-auto">
                              {currency(it.product.price * it.qty)}
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="border-t border-white/10 pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-white/60">Subtotal</span>
                      <span className="font-bold text-[var(--color-accent)]">{currency(quoteTotal)}</span>
                    </div>
                    
                    {quoteItems.length > 1 && (
                      <button
                        onClick={clearQuote}
                        className="w-full text-sm text-red-400 hover:text-red-300 transition-colors py-2"
                      >
                        Clear All Items
                      </button>
                    )}

                    <button
                      onClick={sendWhatsApp}
                      className="w-full bg-[var(--color-accent)] text-black px-4 py-3 rounded-full font-semibold hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                    >
                      <span>📱</span>
                      Request Quote via WhatsApp
                    </button>

                    <button
                      onClick={sendEmail}
                      className="w-full border border-white/20 px-4 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>✉️</span>
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