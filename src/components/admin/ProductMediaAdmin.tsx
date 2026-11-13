"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { ProductMedia, ProductVariant } from "@/lib/product-variants";

type Props = { productId: string };

export default function ProductMediaAdmin({ productId }: Props) {
  const [media, setMedia] = useState<ProductMedia[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [variantId, setVariantId] = useState("");
  const [imageType, setImageType] = useState("reference");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const [mediaResponse, variantResponse] = await Promise.all([
      fetch(`/api/products/${productId}/media`),
      fetch(`/api/products/${productId}/variants`),
    ]);
    const [mediaData, variantData] = await Promise.all([mediaResponse.json(), variantResponse.json()]);
    setMedia(mediaData.media || []);
    setVariants(variantData.variants || []);
  }, [productId]);

  useEffect(() => { void load(); }, [load]);

  async function update(item: ProductMedia, updates: Record<string, unknown>) {
    const response = await fetch(`/api/products/${productId}/media`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mediaId: item.id, ...updates }),
    });
    const result = await response.json();
    if (!response.ok) setMessage(result.error || "Update failed");
    else await load();
  }

  async function upload(files: FileList | File[] | null, replaceItem?: ProductMedia) {
    if (!files?.length) return;
    setMessage("");
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.set("file", file);
      form.set("variant_id", replaceItem?.variant_id || variantId);
      form.set("image_type", replaceItem?.image_type || imageType);
      form.set("display_order", String(replaceItem?.display_order ?? media.length));
      form.set("is_main", String(replaceItem ? !!replaceItem.is_main : media.length === 0));
      form.set("alt_text", replaceItem?.alt_text || file.name.replace(/\.[^.]+$/, ""));
      if (replaceItem?.caption) form.set("caption", replaceItem.caption);
      if (replaceItem?.source_url) form.set("source_url", replaceItem.source_url);
      if (replaceItem?.attribution) form.set("attribution", replaceItem.attribution);
      const response = await fetch(`/api/products/${productId}/media`, { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) { setMessage(result.error || "Upload failed"); return; }
      if (replaceItem) {
        const removed = await fetch(`/api/products/${productId}/media?mediaId=${encodeURIComponent(replaceItem.id)}`, { method: "DELETE" });
        if (!removed.ok) setMessage("Replacement uploaded, but old image cleanup failed. Review the gallery.");
      }
    }
    if (!replaceItem) setMessage("Images uploaded to Supabase Storage");
    await load();
  }

  async function move(index: number, delta: number) {
    const next = index + delta;
    if (next < 0 || next >= media.length) return;
    const first = media[index];
    const second = media[next];
    const firstOrder = first.display_order ?? index;
    const secondOrder = second.display_order ?? next;
    const responses = await Promise.all([
      update(first, { display_order: secondOrder }),
      update(second, { display_order: firstOrder }),
    ]);
    await load();
    return responses;
  }

  async function remove(item: ProductMedia) {
    if (!confirm("Delete this product photograph?")) return;
    const response = await fetch(`/api/products/${productId}/media?mediaId=${encodeURIComponent(item.id)}`, { method: "DELETE" });
    if (response.ok) await load();
    else setMessage("Delete failed");
  }

  return (
    <section className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 space-y-4">
      <h3 className="font-semibold">Product photo gallery</h3>
      <p className="text-xs text-white/55">Uploads use the Supabase product-images bucket. Reference images are illustrative and are not represented as actual stock.</p>
      <div className="flex flex-wrap gap-2">
        <select value={variantId} onChange={(e) => setVariantId(e.target.value)} className="rounded bg-black/50 p-2 text-sm">
          <option value="">Parent product</option>{variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.label}</option>)}
        </select>
        <select value={imageType} onChange={(e) => setImageType(e.target.value)} className="rounded bg-black/50 p-2 text-sm">
          <option value="reference">Reference photograph</option><option value="actual_stock">Actual stock photograph</option><option value="detail">Detail photograph</option><option value="other">Other</option>
        </select>
        <label className="rounded bg-emerald-700 px-4 py-2 text-sm cursor-pointer">Upload images<input className="hidden" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => { void upload(e.currentTarget.files); e.currentTarget.value = ""; }} /></label>
      </div>
      {message && <p className="text-xs text-amber-200">{message}</p>}
      <div className="grid sm:grid-cols-2 gap-3">
        {media.map((item, index) => (
          <article key={item.id} className="rounded-lg border border-white/10 p-3 space-y-2">
            <Image src={item.public_url} alt={item.alt_text || ""} width={480} height={240} unoptimized className="h-36 w-full rounded bg-black object-contain" />
            <p className="text-xs">{item.image_type === "actual_stock" ? "Actual stock" : item.image_type === "reference" ? "Reference image" : item.image_type}</p>
            <input aria-label="Alt text" placeholder="Alt text" defaultValue={item.alt_text || ""} onBlur={(e) => void update(item, { alt_text: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
            <input aria-label="Caption" placeholder="Caption" defaultValue={item.caption || ""} onBlur={(e) => void update(item, { caption: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
            <input aria-label="Source URL" placeholder="Source URL" defaultValue={item.source_url || ""} onBlur={(e) => void update(item, { source_url: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
            <input aria-label="Attribution" placeholder="Attribution" defaultValue={item.attribution || ""} onBlur={(e) => void update(item, { attribution: e.target.value })} className="w-full rounded bg-black/50 p-2 text-xs" />
            <div className="flex gap-2"><button type="button" disabled={index === 0} onClick={() => void move(index, -1)} className="text-xs">↑</button><button type="button" disabled={index === media.length - 1} onClick={() => void move(index, 1)} className="text-xs">↓</button><button type="button" onClick={() => void update(item, { is_main: true })} className="text-xs">{item.is_main ? "Main image" : "Set main"}</button><button type="button" onClick={() => void remove(item)} className="ml-auto text-xs text-red-300">Delete</button></div>
            <label className="text-xs text-emerald-200 cursor-pointer">Replace image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => { const file = e.currentTarget.files?.[0]; if (file) void upload([file], item); e.currentTarget.value = ""; }} /></label>
          </article>
        ))}
      </div>
    </section>
  );
}
