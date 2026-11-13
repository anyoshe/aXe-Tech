"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductMedia } from "@/lib/product-variants";

type Props = { productId: string };

export default function ProductMediaAdmin({ productId }: Props) {
  const [media, setMedia] = useState<ProductMedia[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageType, setImageType] = useState("reference");
  const [altText, setAltText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch(`/api/products/${productId}/media`);
    const d = await r.json();
    setMedia(d.media || []);
  }

  useEffect(() => {
    load();
  }, [productId]);

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setMsg(null);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("image_type", imageType);
      fd.append("alt_text", altText || file.name);
      fd.append("is_main", media.length === 0 ? "true" : "false");
      fd.append("display_order", String(media.length));
      const r = await fetch(`/api/products/${productId}/media`, { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) {
        setMsg(d.error || "Upload failed");
        setUploading(false);
        return;
      }
    }
    setMsg("Uploaded to Supabase Storage (product-images)");
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    load();
  }

  async function setMain(id: string) {
    // Re-upload metadata path: patch via delete+not ideal; use products update through media POST public_url
    const item = media.find((m) => m.id === id);
    if (!item) return;
    const fd = new FormData();
    fd.append("public_url", item.public_url);
    fd.append("is_main", "true");
    fd.append("image_type", item.image_type || "reference");
    fd.append("alt_text", item.alt_text || "");
    // simpler: call products PUT images order - for now delete others main via API only on insert
    // Update all: fetch PATCH not implemented — reorder by re-inserting main
    await fetch(`/api/products/${productId}/media?mediaId=${id}`, { method: "DELETE" });
    const fd2 = new FormData();
    fd2.append("public_url", item.public_url);
    fd2.append("is_main", "true");
    fd2.append("image_type", item.image_type || "reference");
    fd2.append("alt_text", item.alt_text || "");
    fd2.append("display_order", "0");
    await fetch(`/api/products/${productId}/media`, { method: "POST", body: fd2 });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Remove this image from gallery (and Storage file if stored)?")) return;
    await fetch(`/api/products/${productId}/media?mediaId=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 space-y-4">
      <h3 className="text-sm font-semibold text-white">Product gallery (Supabase Storage)</h3>
      <p className="text-xs text-white/50">
        Uploads go to the <code className="text-white/70">product-images</code> bucket. Mark photos as{" "}
        <strong className="text-white/70">reference</strong> (model) or <strong className="text-white/70">actual stock</strong>.
        Do not upload manufacturer images unless you have reuse rights.
      </p>

      <div className="flex flex-wrap gap-2 items-end">
        <label className="text-xs text-white/60">
          Type
          <select
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
            className="mt-1 block rounded-lg bg-black/40 border border-white/10 px-2 py-1.5"
          >
            <option value="reference">Reference / model</option>
            <option value="actual_stock">Actual stock unit</option>
            <option value="detail">Detail</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="text-xs text-white/60 flex-1 min-w-[12rem]">
          Alt text
          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the photo"
            className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-2 py-1.5"
          />
        </label>
        <label className="text-xs font-medium text-black bg-[var(--color-accent)] rounded-lg px-3 py-2 cursor-pointer">
          {uploading ? "Uploading…" : "Upload images"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => onUpload(e.target.files)}
          />
        </label>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {media.map((m) => (
            <div key={m.id} className="relative rounded-lg border border-white/10 overflow-hidden bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.public_url} alt={m.alt_text || ""} className="h-28 w-full object-contain bg-white/5" />
              <div className="p-2 text-[10px] text-white/60 space-y-1">
                <p>{m.image_type}{m.is_main ? " · MAIN" : ""}</p>
                <div className="flex gap-2">
                  {!m.is_main && (
                    <button type="button" className="underline" onClick={() => setMain(m.id)}>
                      Set main
                    </button>
                  )}
                  <button type="button" className="text-red-300 underline" onClick={() => remove(m.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {msg && <p className="text-xs text-emerald-300">{msg}</p>}
    </div>
  );
}
