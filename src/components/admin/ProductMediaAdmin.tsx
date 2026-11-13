"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { ProductMedia, ProductVariant } from "@/lib/product-variants";
import {
  compressProductImage,
} from "@/lib/product-image-compression";
import { MAX_COMPRESSED_PRODUCT_IMAGE_BYTES } from "@/lib/product-image-limits";

type Props = { productId: string };

export default function ProductMediaAdmin({ productId }: Props) {
  const [media, setMedia] = useState<ProductMedia[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [variantId, setVariantId] = useState("");
  const [imageType, setImageType] = useState("reference");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

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
    else {
      if (result.warning) setMessage(result.warning);
      await load();
    }
  }

  async function upload(files: FileList | File[] | null, replaceItem?: ProductMedia) {
    if (!files?.length) return;
    setMessage("");
    const selectedFiles = Array.from(files);
    setUploading(true);
    let uploaded = 0;
    const notices: string[] = [];
    const errors: string[] = [];
    const maxDisplayOrder = Math.max(-1, ...media.map((item) => item.display_order ?? -1));

    try {
      for (const [index, file] of selectedFiles.entries()) {
        try {
          const compressed = await compressProductImage(file);
          const form = new FormData();
          form.set("file", compressed.file);
          form.set("variant_id", replaceItem ? replaceItem.variant_id || "" : variantId);
          form.set("image_type", replaceItem?.image_type || imageType);
          form.set("display_order", String(replaceItem?.display_order ?? maxDisplayOrder + index + 1));
          form.set("is_main", String(replaceItem ? !!replaceItem.is_main : media.length === 0 && index === 0));
          form.set("alt_text", replaceItem?.alt_text || file.name.replace(/\.[^.]+$/, ""));
          if (replaceItem?.caption) form.set("caption", replaceItem.caption);
          if (replaceItem?.source_url) form.set("source_url", replaceItem.source_url);
          if (replaceItem?.attribution) form.set("attribution", replaceItem.attribution);
          const response = await fetch(`/api/products/${productId}/media`, { method: "POST", body: form });
          const result = await response.json();
          if (!response.ok) {
            errors.push(`${file.name}: ${result.error || "Upload failed."}`);
            continue;
          }
          uploaded++;
          if (compressed.file.size < file.size) {
            notices.push(
              `${file.name}: compressed ${Math.ceil(file.size / 1024)} KB to ${Math.ceil(compressed.file.size / 1024)} KB` +
                (compressed.width && compressed.height ? ` (${compressed.width}×${compressed.height})` : "") +
                "."
            );
          }
          if (result.warning) notices.push(`${file.name}: ${result.warning}`);

          if (replaceItem) {
            const removed = await fetch(`/api/products/${productId}/media?mediaId=${encodeURIComponent(replaceItem.id)}`, { method: "DELETE" });
            const removedResult = await removed.json();
            if (!removed.ok || removedResult.warning) {
              errors.push(removedResult.warning || "Replacement uploaded, but old image cleanup failed. Review the gallery.");
            }
          }
        } catch (error) {
          errors.push(`${file.name}: ${error instanceof Error ? error.message : "Upload failed."}`);
        }
      }

      try {
        await load();
      } catch (error) {
        errors.push(`Upload finished, but the gallery could not be refreshed: ${error instanceof Error ? error.message : "refresh failed."}`);
      }

      setMessage([
        uploaded ? `${uploaded} image${uploaded === 1 ? "" : "s"} uploaded.` : "",
        ...notices,
        ...errors.map((error) => `Skipped or failed: ${error}`),
      ].filter(Boolean).join(" "));
    } finally {
      setUploading(false);
    }
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
    const result = await response.json();
    if (response.ok) {
      if (result.warning) setMessage(result.warning);
      await load();
    } else setMessage(result.error || "Delete failed");
  }

  return (
    <section className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 space-y-4">
      <h3 className="font-semibold">Product photo gallery</h3>
      <p className="text-xs text-white/55">
        Images over {Math.floor(MAX_COMPRESSED_PRODUCT_IMAGE_BYTES / 1000)} KB are optimized before upload using visually high-quality WebP compression.
        Images that cannot meet the target without stronger compression are skipped with an explanation.
      </p>
      <div className="flex flex-wrap gap-2">
        <select value={variantId} onChange={(e) => setVariantId(e.target.value)} className="rounded bg-black/50 p-2 text-sm">
          <option value="">Parent product</option>{variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.label}</option>)}
        </select>
        <select value={imageType} onChange={(e) => setImageType(e.target.value)} className="rounded bg-black/50 p-2 text-sm">
          <option value="reference">Reference photograph</option><option value="actual_stock">Actual stock photograph</option><option value="detail">Detail photograph</option><option value="other">Other</option>
        </select>
        <label className={`rounded bg-emerald-700 px-4 py-2 text-sm ${uploading ? "cursor-wait opacity-60" : "cursor-pointer"}`}>
          {uploading ? "Uploading…" : "Upload images"}
          <input disabled={uploading} className="hidden" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => { void upload(e.currentTarget.files); e.currentTarget.value = ""; }} />
        </label>
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
            <label className={`text-xs text-emerald-200 ${uploading ? "cursor-wait opacity-60" : "cursor-pointer"}`}>Replace image<input disabled={uploading} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => { const file = e.currentTarget.files?.[0]; if (file) void upload([file], item); e.currentTarget.value = ""; }} /></label>
          </article>
        ))}
      </div>
    </section>
  );
}
