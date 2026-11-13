"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { ProductMedia, ProductVariant } from "@/lib/product-variants";

export default function ProductMediaAdmin({ productId }: { productId: string }) {
  const [media, setMedia] = useState<ProductMedia[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [variantId, setVariantId] = useState("");
  const [imageType, setImageType] = useState("reference");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const [mr, vr] = await Promise.all([fetch(`/api/products/${productId}/media`), fetch(`/api/products/${productId}/variants`)]);
    const [md, vd] = await Promise.all([mr.json(), vr.json()]);
    setMedia(md.media || []);
    setVariants(vd.variants || []);
  }, [productId]);
  useEffect(() => { load(); }, [load]);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setMessage("");
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.set("file", file);
      form.set("variant_id", variantId);
      form.set("image_type", imageType);
      form.set("display_order", String(media.length));
      form.set("is_main", String(media.length === 0));
      form.set("alt_text", file.name.replace(/\.[^.]+$/, ""));
      const response = await fetch(`/api/products/${productId}/media`, { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) { setMessage(result.error || "Upload failed"); return; }
    }
    setMessage("Images uploaded to Supabase Storage");
    await load();
  }

  async function update(item: ProductMedia, updates: Record<string, unknown>) {
    const response = await fetch(`/api/products/${productId}/media`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mediaId: item.id, ...updates }) });
    const result = await response.json();
    if (!response.ok) setMessage(result.error || "Update failed"); else await load();
  }
  async function move(index: number, delta: number) {
    const next = index + delta;
    if (next < 0 || next >= media.length) return;
    const first = media[index];
    const second = media[next];
    const firstOrder = first.display_order ?? index;
    const secondOrder = second.display_order ?? next;
    await Promise.all([
      fetch(`/api/products/${productId}/media`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mediaId: first.id, display_order: secondOrder }) }),
      fetch(`/api/products/${productId}/media`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mediaId: second.id, display_order: firstOrder }) }),
    ]);
    await load();
  }
  async function remove(item: ProductMedia) {
    if (!confirm("Delete this product photograph?")) return;
    const response = await fetch(`/api/products/${productId}/media?mediaId=${encodeURIComponent(item.id)}`, { method: "DELETE" });
    if (response.ok) await load(); else setMessage("Delete failed");
  }

  async function replace(item: ProductMedia, file: File) {
    const form = new FormData();
    form.set("file", file);
    form.set("variant_id", item.variant_id || "");
    form.set("image_type", item.image_type || "reference");
    form.set("display_order", String(item.display_order || 0));
    form.set("is_main", String(!!item.is_main));
    form.set("alt_text", item.alt_text || "");
    form.set("caption", item.caption || "");
    form.set("source_url", item.source_url || "");
    form.set("attribution", item.attribution || "");
    const uploaded = await fetch(`/api/products/${productId}/media`, { method: "POST", body: form });
    if (!uploaded.ok) { const result = await uploaded.json(); setMessage(result.error || "Replacement upload failed"); return; }
    const removed = await fetch(`/api/products/${productId}/media?mediaId=${encodeURIComponent(item.id)}`, { method: "DELETE" });
    if (!removed.ok) setMessage("New image uploaded, but old image cleanup failed. Review the gallery.");
    await load();
  }

  return <section className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 space-y-4">
    <h3 className="font-semibold">Product photo gallery</h3>
    <p className="text-xs text-white/55">Uploads are stored in the Supabase product-images bucket. Reference images are illustrative and are not represented as actual stock.</p>
    <div className="flex flex-wrap gap-2">
      <select value={variantId} onChange={(e) => setVariantId(e.target.value)} className="rounded bg-black/50 p-2 text-sm"><option value="">Parent product</option>{variants.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}</select>
      <select value={imageType} onChange={(e) => setImageType(e.target.value)} className="rounded bg-black/50 p-2 text-sm"><option value="reference">Reference photograph</option><option value="actual_stock">Actual stock photograph</option><option value="detail">Detail photograph</option><option value="other">Other</option></select>
      <label className="rounded bg-emerald-700 px-4 py-2 text-sm cursor-pointer">Upload images<input className="hidden" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => { upload(e.target.files); e.currentTarget.value = ""; }} /></label>
    </div>
    {message && <p className="text-xs text-amber-200">{message}</p>}
    <div className="grid sm:grid-cols-2 gap-3">{media.map((item, index) => <article key={item.id} className="rounded-lg border border-white/10 p-3 space-y-2">
      <Image src={item.public_url} alt={item.alt_text || ""} width={480} height={240} unoptimized className="h-36 w-full rounded bg-black object-contain" />
      <p className="text-xs">{item.image_type === "actual_stock" ? "Actual stock" : item.image_type === "reference" ? "Reference image" : item.image_type}</p>
      <input aria-label="Alt text" placeholder="Alt text" defaultValue={item.alt_text || ""} onBlur={(e) => update(item, { alt_text: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
      <input aria-label="Caption" placeholder="Caption" defaultValue={item.caption || ""} onBlur={(e) => update(item, { caption: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
      <input aria-label="Source URL" placeholder="Source URL" defaultValue={item.source_url || ""} onBlur={(e) => update(item, { source_url: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
      <input aria-label="Attribution" placeholder="Attribution" defaultValue={item.attribution || ""} onBlur={(e) => update(item, { attribution: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
      <div className="flex gap-2"><button type="button" disabled={index === 0} onClick={() => move(index, -1)} className="text-xs">↑</button><button type="button" disabled={index === media.length - 1} onClick={() => move(index, 1)} className="text-xs">↓</button><button type="button" onClick={() => update(item, { is_main: true })} className="text-xs">{item.is_main ? "Main image" : "Set main"}</button><button type="button" onClick={() => remove(item)} className="ml-auto text-xs text-red-300">Delete</button></div>
      <label className="text-xs text-emerald-200 cursor-pointer">Replace image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => { const file = e.currentTarget.files?.[0]; if (file) replace(item, file); e.currentTarget.value = ""; }} /></label>
    </article>)}</div>
  </section>;
}
