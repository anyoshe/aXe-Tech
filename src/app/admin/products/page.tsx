"use client";

import { useEffect, useState, useRef } from "react";
import {
  ImageIcon,
  Upload,
  X,
  Loader2,
  Video,
  Youtube,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Database,
} from "lucide-react";
import { convertToBase64, isBase64, isUrl } from "@/utils/image-utils";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  images: string[];
  short?: string;
  description?: string;
  features: string[];
  videos: string[];
  specs?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

type UploadingFile = {
  file: File;
  preview: string;
  uploading: boolean;
  error?: string;
  url?: string;
  type: "image" | "video";
};

const CATEGORIES = [
  "Laptops",
  "Lab Equipment",
  "Networking",
  "Printers",
  "Accessories",
  "Software",
  "Services",
  "Design",
  "AV",
  "Consumables",
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    category: "Laptops",
    images: "[]",
    videos: "[]",
    features: "",
    short: "",
    description: "",
    specs: "{}",
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [publicPathInput, setPublicPathInput] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const parseFormList = (s?: string | null): string[] => {
    if (!s) return [];
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean);
    } catch {
      return String(s)
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    }
    return [];
  };

  const stringifyFormList = (arr: string[]) => JSON.stringify(arr || []);

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const r = await fetch("/api/products");
      const data = await r.json();
      if (!r.ok) {
        setProducts([]);
        setLoadError(data?.message || data?.error || "Failed to load products from Supabase");
        return;
      }
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
        setLoadError(data?.message || "Unexpected response");
      }
    } catch {
      setProducts([]);
      setLoadError("Network error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm({
      id: "",
      title: "",
      price: "",
      category: "Laptops",
      images: "[]",
      videos: "[]",
      features: "",
      short: "",
      description: "",
      specs: "{}",
    });
    setEditing(null);
    setUploadingFiles([]);
    setVideoUrlInput("");
    setPublicPathInput("");
  };

  /** Prefer public paths (/samples/...) or http(s) URLs; Base64 still allowed as fallback */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const newFiles: UploadingFile[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
      type: "image" as const,
    }));
    setUploadingFiles((prev) => [...prev, ...newFiles]);

    for (const fileObj of newFiles) {
      try {
        const base64Image = await convertToBase64(fileObj.file, 300);
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.file === fileObj.file ? { ...f, uploading: false, url: base64Image } : f
          )
        );
        const current = parseFormList(form.images);
        setForm((prev) => ({
          ...prev,
          images: stringifyFormList([...current, base64Image]),
        }));
        showMessage("Image ready (will save to Supabase with product)");
      } catch (error) {
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.file === fileObj.file
              ? {
                  ...f,
                  uploading: false,
                  error: error instanceof Error ? error.message : "Failed",
                }
              : f
          )
        );
        showMessage("Failed to process image", "error");
      }
    }
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const addPublicPath = () => {
    let path = publicPathInput.trim();
    if (!path) return;
    if (!path.startsWith("/") && !path.startsWith("http")) {
      path = `/samples/${path.replace(/^samples\//, "")}`;
    }
    const current = parseFormList(form.images);
    setForm((prev) => ({ ...prev, images: stringifyFormList([...current, path]) }));
    setPublicPathInput("");
    showMessage(`Added image path: ${path}`);
  };

  const handleAddVideoUrl = () => {
    if (!videoUrlInput.trim()) return;
    let processedUrl = videoUrlInput.trim();

    if (videoUrlInput.includes("youtube.com") || videoUrlInput.includes("youtu.be")) {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
      ];
      for (const pattern of patterns) {
        const match = videoUrlInput.match(pattern);
        if (match?.[1]) {
          processedUrl = `https://www.youtube.com/embed/${match[1]}`;
          break;
        }
      }
    }
    if (videoUrlInput.includes("vimeo.com")) {
      const match = videoUrlInput.match(/vimeo\.com\/(\d+)/);
      if (match?.[1]) processedUrl = `https://player.vimeo.com/video/${match[1]}`;
    }
    // Local public video
    if (processedUrl.startsWith("/samples/") || processedUrl.endsWith(".mp4")) {
      if (!processedUrl.startsWith("/")) processedUrl = `/samples/${processedUrl}`;
    }

    const current = parseFormList(form.videos);
    setForm((prev) => ({ ...prev, videos: stringifyFormList([...current, processedUrl]) }));
    setVideoUrlInput("");
    showMessage("Video URL added");
  };

  const removeImageFromList = (urlToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      images: stringifyFormList(parseFormList(prev.images).filter((u) => u !== urlToRemove)),
    }));
  };

  const removeVideoFromList = (urlToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      videos: stringifyFormList(parseFormList(prev.videos).filter((u) => u !== urlToRemove)),
    }));
  };

  const buildPayload = () => {
    let parsedSpecs: Record<string, unknown> = {};
    if (form.specs?.trim() && form.specs.trim() !== "{}") {
      parsedSpecs = JSON.parse(form.specs);
    }
    const features = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    return {
      id: form.id || `prod-${Date.now()}`,
      title: form.title.trim(),
      price: Number(form.price),
      category: form.category || undefined,
      images: parseFormList(form.images),
      videos: parseFormList(form.videos),
      features,
      short: form.short || undefined,
      description: form.description || undefined,
      specs: parsedSpecs,
    };
  };

  const handleCreate = async () => {
    if (!form.title || !form.price) {
      showMessage("Title and price are required", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = buildPayload();
      const r = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await r.json();
      if (r.ok) {
        showMessage("Product saved to Supabase");
        resetForm();
        fetchProducts();
      } else {
        showMessage(result.message || "Create failed", "error");
      }
    } catch (e) {
      showMessage(e instanceof Error ? e.message : "Create failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const payload = { ...buildPayload(), id: editing };
      const r = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await r.json();
      if (r.ok) {
        showMessage("Product updated in Supabase");
        resetForm();
        fetchProducts();
      } else {
        showMessage(result.message || "Update failed", "error");
      }
    } catch (e) {
      showMessage(e instanceof Error ? e.message : "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete product "${id}"?`)) return;
    try {
      const r = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const result = await r.json();
      if (r.ok) {
        showMessage("Product deleted");
        if (editing === id) resetForm();
        fetchProducts();
      } else {
        showMessage(result.message || "Delete failed", "error");
      }
    } catch {
      showMessage("Delete failed", "error");
    }
  };

  const handleSeed = async () => {
    if (!confirm("Seed sample ICT products into Supabase? Existing IDs will be updated.")) return;
    setSaving(true);
    try {
      const r = await fetch("/api/products/seed", { method: "POST" });
      const result = await r.json();
      if (r.ok) {
        showMessage(`Seeded ${result.count ?? "sample"} products`);
        fetchProducts();
      } else {
        showMessage(result.message || "Seed failed", "error");
      }
    } catch {
      showMessage("Seed failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (p: Product) => {
    setEditing(p.id);
    setForm({
      id: p.id,
      title: p.title,
      price: String(p.price),
      category: p.category || "Laptops",
      images: stringifyFormList(p.images || []),
      videos: stringifyFormList(p.videos || []),
      features: (p.features || []).join("\n"),
      short: p.short || "",
      description: p.description || "",
      specs: JSON.stringify(p.specs || {}, null, 2),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const imagePreviewSrc = (src: string) => {
    if (isBase64(src) || isUrl(src) || src.startsWith("/")) return src;
    return src;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ICT Products Admin</h1>
            <p className="text-sm text-white/60 mt-1">
              Backed by <span className="text-emerald-400">Supabase</span> — create, edit, seed
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fetchProducts()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              type="button"
              onClick={handleSeed}
              disabled={saving}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium disabled:opacity-50"
            >
              <Database className="w-4 h-4" /> Seed sample products
            </button>
          </div>
        </header>

        {message && (
          <div
            className={`rounded-lg px-4 py-3 text-sm ${
              message.type === "error" ? "bg-red-500/20 text-red-200" : "bg-emerald-500/20 text-emerald-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {loadError && (
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            <p className="font-medium">Cannot load products</p>
            <p className="mt-1 text-amber-100/80">{loadError}</p>
            <p className="mt-2 text-xs text-white/50">
              Check .env.local Supabase keys and that you ran supabase/schema.sql
            </p>
          </div>
        )}

        {/* Form */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            {editing ? `Edit: ${editing}` : "Create product"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block space-y-1">
              <span className="text-xs text-white/60">Product ID</span>
              <input
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={form.id}
                disabled={!!editing}
                onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                placeholder="lap-hp-840"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-white/60">Category</span>
              <select
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1 sm:col-span-2">
              <span className="text-xs text-white/60">Title</span>
              <input
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="HP EliteBook 840 G6"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-white/60">Price (KES)</span>
              <input
                type="number"
                min={0}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="48000"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-white/60">Short description</span>
              <input
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={form.short}
                onChange={(e) => setForm((f) => ({ ...f, short: e.target.value }))}
              />
            </label>
            <label className="block space-y-1 sm:col-span-2">
              <span className="text-xs text-white/60">Full description</span>
              <textarea
                rows={3}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </label>
            <label className="block space-y-1 sm:col-span-2">
              <span className="text-xs text-white/60">Features (one per line)</span>
              <textarea
                rows={4}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm font-mono"
                value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                placeholder={"Intel Core i5\n8GB RAM\n256GB SSD"}
              />
            </label>
          </div>

          {/* Images */}
          <div className="space-y-3 border-t border-white/10 pt-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Images
            </h3>
            <p className="text-xs text-white/50">
              Prefer paths like <code className="text-emerald-400">/samples/dell7400.jpeg</code> from{" "}
              <code>public/</code>, or https URLs. File upload stores compressed data with the product row in
              Supabase.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={publicPathInput}
                onChange={(e) => setPublicPathInput(e.target.value)}
                placeholder="/samples/HP-eliteboo-840-g6.jpeg"
              />
              <button
                type="button"
                onClick={addPublicPath}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
              >
                <Plus className="w-4 h-4" /> Add path
              </button>
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-sm"
              >
                <Upload className="w-4 h-4" /> Upload file
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {parseFormList(form.images).map((src, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreviewSrc(src)} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImageFromList(src)}
                    className="absolute top-1 right-1 p-1 rounded bg-black/70 opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-0 inset-x-0 text-[9px] bg-black/70 px-1 truncate">
                    {isBase64(src) ? "data" : src.startsWith("/") ? "public" : "url"}
                  </span>
                </div>
              ))}
              {uploadingFiles
                .filter((f) => f.type === "image" && f.uploading)
                .map((f, i) => (
                  <div
                    key={`up-${i}`}
                    className="w-24 h-24 rounded-lg border border-white/10 flex items-center justify-center"
                  >
                    <Loader2 className="w-5 h-5 animate-spin text-white/50" />
                  </div>
                ))}
            </div>
          </div>

          {/* Videos */}
          <div className="space-y-3 border-t border-white/10 pt-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Video className="w-4 h-4" /> Videos
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                placeholder="YouTube URL or /samples/computertech.mp4"
              />
              <button
                type="button"
                onClick={handleAddVideoUrl}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
              >
                <Youtube className="w-4 h-4" /> Add video
              </button>
            </div>
            <ul className="space-y-1 text-xs text-white/70">
              {parseFormList(form.videos).map((v, i) => (
                <li key={i} className="flex items-center justify-between gap-2 bg-black/30 rounded px-2 py-1">
                  <span className="truncate">{v}</span>
                  <button type="button" onClick={() => removeVideoFromList(v)}>
                    <X className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {editing ? (
              <>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleUpdate}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-medium text-sm disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Update in Supabase
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-lg bg-white/10 text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-medium text-sm disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Create product
              </button>
            )}
          </div>
        </section>

        {/* List */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">
            Catalog {loading ? "…" : `(${products.length})`}
          </h2>
          {loading ? (
            <p className="text-white/50 text-sm">Loading from Supabase…</p>
          ) : products.length === 0 ? (
            <p className="text-white/50 text-sm">
              No products yet. Click <strong>Seed sample products</strong> or create one above.
            </p>
          ) : (
            <div className="grid gap-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-black/40 shrink-0">
                    {p.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreviewSrc(p.images[0])}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-white/50">
                          {p.id} · {p.category || "—"} · KSh {Number(p.price).toLocaleString("en-KE")}
                        </p>
                        <p className="text-sm text-white/60 mt-1 line-clamp-2">{p.short}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(p)}
                          className="px-3 py-1.5 rounded-lg bg-white/10 text-xs hover:bg-white/15"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-200 text-xs hover:bg-red-500/30 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
