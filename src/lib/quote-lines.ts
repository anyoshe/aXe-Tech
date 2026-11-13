import type { ProductVariant } from "@/lib/product-variants";

export type QuotePricedLine = { productId: string; qty: number; productPrice: number; variant?: ProductVariant | null };

export function quoteLineIdentity(productId: string, variantId?: string | null) {
  return `${productId}::${variantId || "base"}`;
}

export function lineHasConfirmedPrice(line: QuotePricedLine) {
  return line.variant
    ? typeof line.variant.price === "number" && Number.isFinite(line.variant.price) && line.variant.price > 0
    : Number.isFinite(line.productPrice) && line.productPrice > 0;
}

export function quoteSubtotal(lines: QuotePricedLine[]): number | null {
  if (lines.some((line) => !lineHasConfirmedPrice(line))) return null;
  return lines.reduce((sum, line) => sum + (line.variant?.price ?? line.productPrice) * line.qty, 0);
}
