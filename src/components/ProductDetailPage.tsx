"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import ProductConfigSelector from "@/components/ProductConfigSelector";
import BuyingAssurance from "@/components/BuyingAssurance";
import type { ProductVariant, ProductMedia } from "@/lib/product-variants";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, ShieldCheck, ClipboardCheck, PackageCheck, Cpu, HardDrive, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { productImageList } from '@/lib/product-images';
import { quoteLineIdentity, quoteSubtotal } from "@/lib/quote-lines";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { availabilityLabel, priceRangeFromVariants } from "@/lib/product-variants";

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
  brand?: string;
  condition?: string;
  availability?: string;
  startingPrice?: boolean;
  warranty?: string;
  imageSources?: Record<string, { sourcePage?: string; rights?: string; notes?: string }>;
  variants?: ProductVariant[];
  media?: ProductMedia[];
  hasVariants?: boolean;
};

type QuoteItem = { product: Product; qty: number; variant?: ProductVariant | null; configLabel?: string };
type SourcingField = {
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  type?: "text" | "number";
};

// -------------------------------------------
// Utility Functions
// -------------------------------------------
const currency = (n: number | string) =>
  typeof n === "number" ? "KSh " + n.toLocaleString("en-KE") : String(n);

const formatSpecValue = (value: ProductSpecsValue): string => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value && typeof value === "object") {
    return Object.entries(value).map(([key, item]) => `${key}: ${formatSpecValue(item)}`).join(" · ");
  }
  return String(value);
};

const canonicalSpecLabel = (key: string) => {
  const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normalized.includes("processor") || normalized === "cpu") return "Processor";
  if (normalized.includes("memory") || normalized === "ram") return "Memory";
  if (normalized.includes("storage") || normalized.includes("drive") || normalized === "disk") return "Storage";
  if (normalized.includes("display") || normalized === "screen") return "Display";
  if (normalized === "os" || normalized.includes("operatingsystem")) return "Operating system";
  if (normalized === "condition") return "Condition";
  return key.replace(/([A-Z])/g, " $1").trim();
};

function technicalEntries(specs: ProductSpecs | undefined, variant: ProductVariant | null, condition?: string) {
  const entries = new Map<string, { label: string; value: ProductSpecsValue }>();
  for (const [key, value] of Object.entries(specs || {})) {
    const label = canonicalSpecLabel(key);
    if (label === "Condition" && condition) continue;
    entries.set(label.toLowerCase(), { label, value });
  }
  if (variant) {
    const variantSpecs: Array<[string, string | null | undefined]> = [
      ["Processor", variant.processor],
      ["Memory", variant.ram],
      ["Storage", variant.storage],
      ["Display", variant.display],
      ["Operating system", variant.os],
    ];
    for (const [label, value] of variantSpecs) {
      if (value) entries.set(label.toLowerCase(), { label, value });
    }
  }
  return [...entries.values()];
}

function normalizedContent(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizedDescription(value: string) {
  return value
    .replace(/^(#{1,6})(?=\S)/gm, "$1 ")
    .replace(/^(#{1,6}\s+)#{1,6}\s+/gm, "$1");
}

function sourcingFieldsFor(product: Product): SourcingField[] {
  const category = `${product.category || ""} ${product.title}`.toLowerCase();
  if (/\btoner|ink bottle|cartridge|consumables\b/.test(category)) {
    return [
      { name: "consumable_printer_model", label: "Printer make and model", placeholder: "e.g. HP LaserJet Pro M404dn", required: true },
      { name: "consumable_code", label: "Cartridge / ink code", placeholder: "Enter the cartridge or ink code if known", required: true },
      { name: "consumable_type", label: "Supply type", options: ["Original / genuine", "Compatible", "Either"], required: true },
      { name: "consumable_color", label: "Color", placeholder: "Black, cyan, magenta, yellow, or set" },
      { name: "consumable_quantity", label: "Quantity", type: "number", placeholder: "Number of cartridges or bottles" },
    ];
  }
  if (/\bprinter|printers|photocopier\b/.test(category)) {
    return [
      { name: "printer_color", label: "Print output", options: ["Monochrome", "Color", "No preference"], required: true },
      { name: "printer_functions", label: "Functions", options: ["Print only", "Print, scan and copy", "Print, scan, copy and fax", "No preference"], required: true },
      { name: "printer_connectivity", label: "Connectivity", options: ["USB", "Wi-Fi", "Ethernet", "Wi-Fi and Ethernet", "No preference"], required: true },
      { name: "printer_paper_size", label: "Paper size", options: ["A4", "A3", "A4 and A3", "No preference"] },
      { name: "printer_duplex", label: "Automatic duplex", options: ["Required", "Not required", "No preference"] },
      { name: "printer_volume", label: "Expected monthly print volume", placeholder: "Approximate pages per month" },
      { name: "printer_consumables", label: "Consumables", placeholder: "Ink/toner preference or required cartridge code" },
    ];
  }
  if (/\blaptop|notebook\b/.test(category)) {
    return [
      { name: "laptop_use", label: "Main use", options: ["Office / business", "School / study", "Programming", "Design / engineering", "General use", "Other"], required: true },
      { name: "processor", label: "Processor", options: ["No preference", "Core i3 / Ryzen 3 class", "Core i5 / Ryzen 5 class", "Core i7 / Ryzen 7 class", "Other"], required: true },
      { name: "ram", label: "Memory (RAM)", options: ["No preference", "8 GB", "16 GB", "32 GB", "Other"], required: true },
      { name: "storage", label: "Storage", options: ["No preference", "256 GB SSD", "512 GB SSD", "1 TB SSD", "Other"], required: true },
      { name: "laptop_display", label: "Screen size / resolution", placeholder: "e.g. 14-inch Full HD" },
      { name: "laptop_os", label: "Operating system", options: ["No preference", "Windows 11 Pro", "Windows 11 Home", "Linux", "Other"] },
      { name: "laptop_graphics", label: "Graphics requirements", placeholder: "Integrated or dedicated graphics / software needs" },
    ];
  }
  if (/\bdesktop|workstation\b/.test(category)) {
    return [
      { name: "desktop_use", label: "Main use", options: ["Office / business", "School / study", "Programming", "Design / engineering", "General use", "Other"], required: true },
      { name: "processor", label: "Processor", options: ["No preference", "Core i3 / Ryzen 3 class", "Core i5 / Ryzen 5 class", "Core i7 / Ryzen 7 class", "Other"], required: true },
      { name: "ram", label: "Memory (RAM)", options: ["No preference", "8 GB", "16 GB", "32 GB", "Other"], required: true },
      { name: "storage", label: "Storage", options: ["No preference", "256 GB SSD", "512 GB SSD", "1 TB SSD", "Other"], required: true },
      { name: "desktop_monitor", label: "Monitor", placeholder: "e.g. 22-inch Full HD; state if needed" },
      { name: "desktop_accessories", label: "Included accessories", placeholder: "Keyboard, mouse, webcam, speakers, etc." },
      { name: "desktop_graphics", label: "Graphics requirements", placeholder: "Integrated or dedicated graphics / software needs" },
    ];
  }
  if (/\bcomputer lab|school lab|institutional.*lab|lab.*bundle|lab starter\b/.test(category)) {
    return [
      { name: "lab_quantity", label: "Number of computers", placeholder: "e.g. 20", type: "number", required: true },
      { name: "lab_computer_type", label: "Computer type", options: ["Desktop", "Laptop", "Mix of desktops and laptops", "No preference"], required: true },
      { name: "processor", label: "Target processor / performance", placeholder: "e.g. Core i5 class or no preference" },
      { name: "ram", label: "Memory per computer", placeholder: "e.g. 8 GB or 16 GB" },
      { name: "storage", label: "Storage per computer", placeholder: "e.g. 256 GB SSD" },
      { name: "lab_infrastructure", label: "Network and power requirements", placeholder: "Switches, Wi-Fi, cabling, UPS or power backup" },
      { name: "lab_software", label: "Software / licensing", placeholder: "Required applications, operating system or licenses" },
      { name: "lab_installation", label: "Site and installation", placeholder: "Site location, installation or training needs" },
    ];
  }
  return [
    { name: "configuration_type", label: "Configuration or product type", placeholder: "Describe the model or setup you need", required: true },
    { name: "configuration_use", label: "Main use / intended application", placeholder: "How the product will be used" },
  ];
}

function splitProductDescription(value: string) {
  const sections = {
    details: [] as string[],
    highlights: [] as string[],
    configurations: [] as string[],
    purchasing: [] as string[],
  };
  for (const section of normalizedDescription(value).split(/(?=^#{1,6}\s)/m)) {
    const heading = section.match(/^#{1,6}\s+(.+)$/m)?.[1] || "";
    const normalizedHeading = heading.toLowerCase();
    const target = /\b(highlights?|features?)\b/.test(normalizedHeading)
      ? sections.highlights
      : /\b(configurations?|variants?)\b/.test(normalizedHeading)
        ? sections.configurations
        : /\b(condition|inspection|purchas|availability|warrant|bulk|quotation|quotes?|shipping|delivery|accessories)\b/.test(normalizedHeading)
          ? sections.purchasing
          : sections.details;
    target.push(section.trim());
  }
  return {
    details: sections.details.join("\n\n"),
    highlights: sections.highlights.join("\n\n"),
    configurations: sections.configurations.join("\n\n"),
    purchasing: sections.purchasing.join("\n\n"),
  };
}

function ProductMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h2 className="mt-6 mb-2 text-lg font-semibold text-white first:mt-0">{children}</h2>,
        h2: ({ children }) => <h2 className="mt-6 mb-2 text-lg font-semibold text-white first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-5 mb-2 text-base font-semibold text-white first:mt-0">{children}</h3>,
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
        ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-white/85">{children}</strong>,
        a: ({ children, href }) => <a href={href} className="text-[var(--color-accent)] underline underline-offset-2">{children}</a>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [sourcingOpen, setSourcingOpen] = useState(false);
  const [sourcingMessage, setSourcingMessage] = useState("");

  useEffect(() => {
    setSelectedImage(0);
  }, [selectedVariant?.id]);

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
    const configLabel = selectedVariant
      ? selectedVariant.label
      : undefined;
    setQuoteItems((prev) => {
      const found = prev.find(
        (p) =>
          p.product.id === prod.id &&
          (selectedVariant ? p.variant?.id === selectedVariant.id : !p.variant)
      );
      if (found) return prev.map((p) => (p === found ? { ...p, qty: p.qty + 1 } : p));
      const priced = selectedVariant
        ? { ...prod, price: selectedVariant.price != null && selectedVariant.price > 0 ? selectedVariant.price : 0 }
        : prod;
      return [
        {
          product: priced,
          qty: 1,
          variant: selectedVariant,
          configLabel,
        },
        ...prev,
      ];
    });
    setDrawerOpen(true);
  };

  const quoteItemKey = (item: QuoteItem) => quoteLineIdentity(item.product.id, item.variant?.id);
  const changeQty = (itemKey: string, delta: number) =>
    setQuoteItems((prev) => prev.map((p) => (quoteItemKey(p) === itemKey ? { ...p, qty: Math.max(1, p.qty + delta) } : p)));

  const removeFromQuote = (itemKey: string) =>
    setQuoteItems((prev) => prev.filter((p) => quoteItemKey(p) !== itemKey));

  const clearQuote = () => setQuoteItems([]);

  const quoteTotal = quoteSubtotal(quoteItems.map((it) => ({ productId: it.product.id, qty: it.qty, productPrice: it.product.price, variant: it.variant })));
  const hasQuoteOnlyItems = quoteTotal === null;

  const buildMessage = () => {
    let msg = `Hello GetAxe,\nPlease provide a formal quotation for:\n\n`;
    quoteItems.forEach((it, idx) => {
      const cfg = it.configLabel || it.variant?.label;
      msg += `${idx + 1}. ${it.product.title}${cfg ? ` [${cfg}]` : ""} — Qty: ${it.qty}`;
      if (it.variant?.price != null && it.variant.price > 0) {
        msg += ` — ${currency(it.variant.price)}`;
      } else if (!it.variant && it.product.price) {
        msg += ` — indicative ${currency(it.product.price)}`;
      } else {
        msg += ` — request quote`;
      }
      if (it.variant) {
        const bits = [it.variant.processor, it.variant.ram, it.variant.storage, it.variant.condition_grade ? `Grade ${it.variant.condition_grade}` : ""]
          .filter(Boolean)
          .join(", ");
        if (bits) msg += `\n   Specs: ${bits}`;
      }
      msg += `\n`;
    });
    msg += hasQuoteOnlyItems
      ? "\nAt least one selected item requires a quotation; no total is shown. Please confirm availability and final prices.\n\nThank you."
      : `\nIndicative estimate only: ${currency(quoteTotal)}\nPlease confirm model, availability, configuration and final price.\n\nThank you.`;
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
              href="/shop"
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
  const visibleMedia = (product.media || []).filter((m) => !m.variant_id || m.variant_id === selectedVariant?.id);
  const orderedMedia = visibleMedia
    .slice()
    .sort((a, b) => Number(!!b.is_main) - Number(!!a.is_main) || (a.display_order ?? 0) - (b.display_order ?? 0));
  const mediaUrls = orderedMedia.map((m) => m.public_url).filter(Boolean);
  const images = mediaUrls.length ? mediaUrls : productImageList(product);
  const availableVariants = (product.variants || []).filter((variant) => variant.published !== false && variant.availability !== "unavailable");
  const hasInspectionDisclosures = Boolean([
    selectedVariant?.condition_grade,
    selectedVariant?.functional_inspection,
    selectedVariant?.battery_assessment,
    selectedVariant?.battery_notes,
    selectedVariant?.display_condition,
    selectedVariant?.keyboard_touchpad_condition,
    selectedVariant?.ports_connectivity_checks,
    selectedVariant?.os_license_status,
    selectedVariant?.accessories,
  ].some(Boolean));
  const technicalInfo = technicalEntries(product.specs, selectedVariant, product.condition);
  const highlightFeatures = (product.features || []).filter((feature) => {
    const normalizedFeature = normalizedContent(feature);
    return !technicalInfo.some(({ value }) => {
      const normalizedValue = normalizedContent(formatSpecValue(value));
      return normalizedFeature.length > 0 && normalizedValue.length > 2 &&
        (normalizedFeature.includes(normalizedValue) || normalizedValue.includes(normalizedFeature));
    });
  });
  const descriptionSections = splitProductDescription(product.description || "");
  const priceRange = priceRangeFromVariants(availableVariants);
  const sourcingFields = sourcingFieldsFor(product);
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] pb-32 md:pb-10">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline transition-all"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-x-8">
          <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-10">
            {/* Image Gallery */}
            <div className="order-1 min-w-0 space-y-4 lg:order-1">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/20">
              <ProductImage productId={product.id} src={images[selectedImage]} alt={orderedMedia[selectedImage]?.alt_text || product.title} className="object-contain object-center p-4" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            {orderedMedia[selectedImage]?.caption && <p className="text-xs text-white/60">{orderedMedia[selectedImage].caption}</p>}
            {orderedMedia[selectedImage]?.image_type === "reference" && <p className="text-xs text-amber-200/70">Reference image. Actual stock may differ.</p>}
            {orderedMedia[selectedImage]?.image_type === "actual_stock" && <p className="text-xs text-emerald-200/70">Photograph of actual stock</p>}
            {product.imageSources?.[images[selectedImage]]?.rights?.includes("CC BY-SA 4.0") && (
              <p className="text-right text-xs text-white/60">
                Photo: <a href={product.imageSources[images[selectedImage]].sourcePage} target="_blank" rel="noopener noreferrer" className="underline">IT Photography</a>
                {" · "}<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a>
              </p>
            )}

            {/* Thumbnail Gallery */}
            {images && images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => {
                  const meta = (product.media || []).find((m) => m.public_url === image);
                  return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-[var(--color-accent)]" 
                        : "border-transparent hover:border-white/30"
                    }`}
                  >
                    <ProductImage productId={product.id} src={image} alt={meta?.alt_text || `${product.title} view ${index + 1}`} className="object-contain object-center p-1.5" sizes="80px" />
                    {meta?.image_type === "actual_stock" && (
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-center text-emerald-200 py-0.5">Stock photo</span>
                    )}
                  </button>
                  );
                })}
              </div>
            )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                <div className="text-center px-2 py-2">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-accent)] mx-auto mb-2" />
                  <p className="text-xs text-white/70">Written quote</p>
                </div>
                <div className="text-center px-2 py-2">
                  <ClipboardCheck className="w-5 h-5 text-[var(--color-accent)] mx-auto mb-2" />
                  <p className="text-xs text-white/70">Scope confirmed</p>
                </div>
                <div className="text-center px-2 py-2">
                  <PackageCheck className="w-5 h-5 text-[var(--color-accent)] mx-auto mb-2" />
                  <p className="text-xs text-white/70">Terms disclosed</p>
                </div>
              </div>
            </div>

            {/* Product description and technical information */}
            <div className="order-4 min-w-0 space-y-8 border-t border-white/10 pt-6 lg:order-2 lg:pt-8">
              {(product.short || product.createdAt) && (
                <section className="space-y-3">
                  <h2 className="text-xl font-semibold tracking-tight text-white">Product overview</h2>
                  {product.short && <p className="text-base font-medium leading-relaxed text-white/90">{product.short}</p>}
                  {product.createdAt && <p className="text-xs text-white/40">Added {formatDate(product.createdAt)}</p>}
                </section>
              )}
            </div>

            {descriptionSections.details && (
              <section className="order-9 min-w-0 border-t border-white/10 pt-6 lg:order-5 lg:pt-8">
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-white">More about this product</h2>
                <div className="product-description text-sm leading-7 text-white/65">
                  <ProductMarkdown content={descriptionSections.details} />
                </div>
              </section>
            )}

            {(descriptionSections.highlights || highlightFeatures.length > 0) && (
                <section className="order-7 min-w-0 space-y-4 lg:order-3">
                  {descriptionSections.highlights ? (
                    <div className="product-description text-sm leading-7 text-white/65">
                      <ProductMarkdown content={descriptionSections.highlights} />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-[var(--color-accent)]" /> Key highlights
                      </h2>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {highlightFeatures.map((feature, index) => (
                          <li key={`${feature}-${index}`} className="flex gap-3 border-t border-white/[0.08] py-3 text-sm leading-relaxed text-white/75">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </section>
            )}

          </div>

          {/* Purchase decisions */}
          <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-6">
            {/* Category & Title */}
            <div className="order-2 min-w-0 lg:order-1">
              <span className="inline-block px-3 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full text-sm font-medium mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.title}</h1>
              {product.brand && <p className="mt-3 text-sm text-white/55">Brand: {product.brand}</p>}
              {product.condition && <p className="mt-2 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-white/65">{product.condition}</p>}
            </div>

            {/* Price and quote status */}
            <div className="order-3 min-w-0 space-y-2 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/45">Price</p>
              <p className="text-3xl font-bold text-[var(--color-accent)]">
                {availableVariants.length > 0
                  ? priceRange.min != null
                    ? priceRange.max != null && priceRange.max !== priceRange.min
                      ? `From ${currency(priceRange.min)} – ${currency(priceRange.max)}`
                      : `From ${currency(priceRange.min)}`
                    : "Request a quote"
                  : product.price > 0 ? `${product.startingPrice !== false ? "From " : ""}${currency(product.price)}` : "Request a quote"}
              </p>
              <p className="text-xs leading-relaxed text-white/50">Indicative pricing. Final price and availability are confirmed in a formal quotation.</p>
            </div>

            {/* Configuration choice */}
            {product.hasVariants || (product.variants && product.variants.length > 0) || descriptionSections.configurations ? (
              <section className="order-5 min-w-0 lg:order-3">
                <h2 className="mb-3 text-base font-semibold text-white">Available configurations</h2>
                <ProductConfigSelector
                variants={product.variants || []}
                onVariantChange={setSelectedVariant}
                showSelectedDetails={false}
                showPricing={false}
              />
                {descriptionSections.configurations && (
                  <div className="product-description mt-4 text-sm leading-7 text-white/65">
                    <ProductMarkdown
                      content={descriptionSections.configurations.replace(/^#{1,6}\s+available configurations\s*$/gim, "").trim()}
                    />
                  </div>
                )}
              </section>
            ) : null}

            {hasInspectionDisclosures && <section className="order-10 min-w-0 space-y-3 border-t border-white/10 pt-4 lg:order-4">
              <h2 className="text-base font-semibold text-white">Refurbished condition & inspection</h2>
              {selectedVariant?.condition_grade && <p className="text-sm text-white/65">Cosmetic grade: Grade {selectedVariant.condition_grade}</p>}
              {selectedVariant?.functional_inspection && <p className="text-sm leading-relaxed text-white/65">Functional inspection: {selectedVariant.functional_inspection}</p>}
              {(selectedVariant?.battery_assessment || selectedVariant?.battery_notes) && <p className="text-sm leading-relaxed text-white/65">Battery: {selectedVariant.battery_assessment || selectedVariant.battery_notes}</p>}
              {selectedVariant?.display_condition && <p className="text-sm leading-relaxed text-white/65">Display condition: {selectedVariant.display_condition}</p>}
              {selectedVariant?.keyboard_touchpad_condition && <p className="text-sm leading-relaxed text-white/65">Keyboard & touchpad: {selectedVariant.keyboard_touchpad_condition}</p>}
              {selectedVariant?.ports_connectivity_checks && <p className="text-sm leading-relaxed text-white/65">Ports & connectivity: {selectedVariant.ports_connectivity_checks}</p>}
              {selectedVariant?.os_license_status && <p className="text-sm leading-relaxed text-white/65">OS licensing: {selectedVariant.os_license_status}</p>}
              {selectedVariant?.accessories && <p className="text-sm leading-relaxed text-white/65">Included accessories: {selectedVariant.accessories}</p>}
            </section>}

            <div className="order-11 min-w-0 space-y-3 border-y border-white/10 py-4 lg:order-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/45">Availability</p>
              <p className="text-sm font-medium text-white/85">
                {selectedVariant
                  ? availabilityLabel(selectedVariant.availability)
                  : product.availability === "available"
                    ? "Confirm stock"
                    : product.availability === "on_order"
                      ? "Available on order"
                      : "Confirm availability in quote"}
              </p>
              {(selectedVariant?.warranty || product.warranty) && (
                <p className="text-sm leading-relaxed text-white/60">Warranty: {selectedVariant?.warranty || product.warranty}</p>
              )}
              {selectedVariant?.warranty_coverage && <p className="text-sm leading-relaxed text-white/60">Coverage: {selectedVariant.warranty_coverage}</p>}
              {selectedVariant?.warranty_exclusions && <p className="text-sm leading-relaxed text-white/60">Exclusions: {selectedVariant.warranty_exclusions}</p>}
              {selectedVariant?.after_sales_support && <p className="text-sm leading-relaxed text-white/60">After-sales support: {selectedVariant.after_sales_support}</p>}
            </div>

            {descriptionSections.purchasing && (
              <div className="order-12 min-w-0 border-t border-white/10 pt-4 text-sm leading-7 text-white/65 lg:order-6">
                <div className="product-description">
                  <ProductMarkdown content={descriptionSections.purchasing} />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="order-6 flex min-w-0 flex-col gap-3 pt-2 sm:flex-row lg:order-6">
              <button
                onClick={() => addToQuote(product)}
                className="min-h-12 flex-1 px-6 py-3 bg-[var(--color-accent)] text-black rounded-full font-semibold hover:opacity-95 transition-all duration-300"
              >
                Add to Quote
              </button>
              <button
                onClick={() => {
                  addToQuote(product);
                  setDrawerOpen(true);
                }}
                className="min-h-12 flex-1 px-6 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-full font-semibold hover:bg-[var(--color-accent)]/10 transition-all"
              >
                Quick Quote
              </button>
            </div>
            <section className="order-13 min-w-0 space-y-2 border-t border-white/10 pt-4 lg:order-7">
              <h2 className="text-sm font-semibold text-white">Institutional and bulk quotations</h2>
              <p className="text-sm leading-relaxed text-white/60">Schools, businesses and teams can request a written quotation with quantities and requirements confirmed for their order.</p>
              <p className="text-sm leading-relaxed text-white/60">Before ordering, confirm the selected configuration, availability, condition, warranty terms and final price in the formal quotation.</p>
            </section>
            {technicalInfo.length > 0 && (
              <section className="order-15 min-w-0 space-y-4 border-t border-white/10 pt-4 lg:order-8">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-[var(--color-accent)]" /> Technical information
                </h2>
                <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {technicalInfo.map(({ label, value }) => (
                    <div key={label} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 py-3 text-sm">
                      <dt className="text-white/50">{label}</dt>
                      <dd className="break-words text-right leading-relaxed text-white/85">{formatSpecValue(value)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            <div className="order-16 min-w-0 lg:order-9">
              <button
                type="button"
                onClick={() => setSourcingOpen((v) => !v)}
                className="text-sm text-[var(--color-accent)] underline underline-offset-2"
                aria-expanded={sourcingOpen}
              >
                Request a different configuration
              </button>
              {sourcingOpen && <form className="mt-3 grid min-w-0 gap-2 rounded-xl border border-white/10 p-4 sm:grid-cols-2" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const body = Object.fromEntries(formData.entries());
                const categoryDetails = sourcingFields
                  .filter(({ name }) => !["processor", "ram", "storage"].includes(name))
                  .map(({ name, label }) => {
                    const value = formData.get(name)?.toString().trim();
                    return value ? `${label}: ${value}` : "";
                  })
                  .filter(Boolean);
                const additionalRequirements = [
                  body.additional_requirements?.toString().trim(),
                  ...categoryDetails,
                ].filter(Boolean).join("\n");
                try {
                  const response = await fetch("/api/product-sourcing", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...body,
                      product_category: product.category || "ICT",
                      preferred_model: body.preferred_model || product.title,
                      processor: body.processor || selectedVariant?.processor,
                      ram: body.ram || selectedVariant?.ram,
                      storage: body.storage || selectedVariant?.storage,
                      additional_requirements: additionalRequirements,
                    }),
                  });
                  const result = await response.json();
                  setSourcingMessage(response.ok ? "Request received. We will confirm sourcing and availability." : result.error || "Could not submit request");
                  if (response.ok) form.reset();
                } catch {
                  setSourcingMessage("Could not submit request. Please check your connection and try again.");
                }
              }}>
                <input name="customer_name" required placeholder="Your name" aria-label="Your name" className="rounded bg-black/40 p-2 text-sm" />
                <input name="customer_contact" required placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp" className="rounded bg-black/40 p-2 text-sm" />
                <input name="customer_email" type="email" placeholder="Email (optional)" aria-label="Email (optional)" className="rounded bg-black/40 p-2 text-sm" />
                <input name="preferred_brand" placeholder="Preferred brand (optional)" aria-label="Preferred brand (optional)" className="rounded bg-black/40 p-2 text-sm" />
                {sourcingFields.map((field) => (
                  field.options ? (
                    <label key={field.name} className="grid gap-1 text-xs text-white/60">
                      {field.label}
                      <select name={field.name} required={field.required} defaultValue="" className="rounded bg-black/40 p-2 text-sm text-white">
                        <option value="" disabled>Select {field.label.toLowerCase()}</option>
                        {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </label>
                  ) : (
                    <label key={field.name} className="grid gap-1 text-xs text-white/60">
                      {field.label}
                      <input name={field.name} type={field.type || "text"} min={field.type === "number" ? 1 : undefined} required={field.required} placeholder={field.placeholder || field.label} className="rounded bg-black/40 p-2 text-sm text-white" />
                    </label>
                  )
                ))}
                <select name="condition_preference" aria-label="Condition preference" className="rounded bg-black/40 p-2 text-sm text-white"><option value="">Condition preference</option><option>New</option><option>Refurbished Grade A</option><option>Refurbished Grade B</option><option>Refurbished Grade C</option></select>
                <input name="budget" type="number" min="0" placeholder="Budget KES (optional)" aria-label="Budget KES (optional)" className="rounded bg-black/40 p-2 text-sm" />
                <textarea name="additional_requirements" placeholder="Anything else we should know?" aria-label="Additional requirements" className="rounded bg-black/40 p-2 text-sm sm:col-span-2" />
                <button className="rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-black font-semibold sm:col-span-2">Send sourcing request</button>
                {sourcingMessage && <p role="status" className="text-xs text-white/70 sm:col-span-2">{sourcingMessage}</p>}
              </form>}
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4"><BuyingAssurance /></div>

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
                        key={quoteItemKey(it)}
                        className="flex gap-3 p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="relative w-16 h-16 bg-black/30 rounded overflow-hidden flex-shrink-0">
                          <ProductImage productId={it.product.id} src={productImageList(it.product)[0]} alt={it.product.title} className="object-contain object-center p-1" sizes="64px" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{it.product.title}</div>
                              <div className="text-xs text-white/60">{it.variant ? (it.variant.price != null && it.variant.price > 0 ? currency(it.variant.price) : "Request a quote") : currency(it.product.price)}</div>
                              {it.variant && <div className="text-xs text-white/50">{it.variant.label}{[it.variant.processor, it.variant.ram, it.variant.storage, it.variant.display, it.variant.condition_grade ? `Grade ${it.variant.condition_grade}` : null].filter(Boolean).join(" · ")}</div>}
                            </div>
                            <button
                              onClick={() => removeFromQuote(quoteItemKey(it))}
                              className="text-white/50 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => changeQty(quoteItemKey(it), -1)}
                              className="p-1 bg-black/30 rounded hover:bg-black/50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <div className="px-3 py-1 bg-black/50 rounded min-w-8 text-center">{it.qty}</div>
                            <button 
                              onClick={() => changeQty(quoteItemKey(it), +1)}
                              className="p-1 bg-black/30 rounded hover:bg-black/50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                            <div className="text-sm font-medium ml-auto">
                              {it.variant && !(it.variant.price != null && it.variant.price > 0) ? "Quote required" : currency((it.variant?.price ?? it.product.price) * it.qty)}
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="border-t border-white/10 pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-white/60">Subtotal</span>
                      <span className="font-bold text-[var(--color-accent)]">{quoteTotal === null ? "Quotation required" : currency(quoteTotal)}</span>
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
