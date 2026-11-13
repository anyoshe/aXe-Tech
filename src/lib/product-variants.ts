export type VariantAvailability =
  | "in_stock"
  | "on_order"
  | "request_quote"
  | "request_config"
  | "unavailable";

export type ProductVariant = {
  id: string;
  product_id: string;
  sku?: string | null;
  label: string;
  processor?: string | null;
  ram?: string | null;
  storage?: string | null;
  display?: string | null;
  os?: string | null;
  condition_grade?: "A" | "B" | "C" | null;
  battery_notes?: string | null;
  functional_inspection?: string | null;
  battery_assessment?: string | null;
  display_condition?: string | null;
  keyboard_touchpad_condition?: string | null;
  ports_connectivity_checks?: string | null;
  os_license_status?: string | null;
  price: number | null;
  currency?: string;
  availability: VariantAvailability;
  warranty?: string | null;
  warranty_coverage?: string | null;
  warranty_exclusions?: string | null;
  after_sales_support?: string | null;
  accessories?: string | null;
  notes?: string | null;
  sort_order?: number;
  published?: boolean;
};

export type ProductMedia = {
  id: string;
  product_id: string;
  variant_id?: string | null;
  storage_path?: string | null;
  public_url: string;
  title?: string | null;
  alt_text?: string | null;
  caption?: string | null;
  display_order?: number;
  is_main?: boolean;
  image_type?: "reference" | "actual_stock" | "detail" | "other";
  source_url?: string | null;
  attribution?: string | null;
};

/** Lowest confirmed numeric price among published, available variants */
export function startingPriceFromVariants(variants: ProductVariant[]): number | null {
  const prices = variants
    .filter(
      (v) =>
        v.published !== false &&
        v.availability !== "unavailable" &&
        typeof v.price === "number" &&
        v.price > 0
    )
    .map((v) => v.price as number);
  if (!prices.length) return null;
  return Math.min(...prices);
}

export function priceRangeFromVariants(variants: ProductVariant[]): {
  min: number | null;
  max: number | null;
} {
  const prices = variants
    .filter(
      (v) =>
        v.published !== false &&
        v.availability !== "unavailable" &&
        typeof v.price === "number" &&
        v.price > 0
    )
    .map((v) => v.price as number);
  if (!prices.length) return { min: null, max: null };
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function formatKes(amount: number | null | undefined): string {
  if (amount == null || Number.isNaN(amount)) return "Request a quote";
  return `KES ${Math.round(amount).toLocaleString("en-KE")}`;
}

export function availabilityLabel(a: VariantAvailability | string | undefined): string {
  switch (a) {
    case "in_stock":
      return "In stock";
    case "on_order":
      return "Available on order";
    case "request_config":
      return "Request configuration";
    case "unavailable":
      return "Unavailable";
    case "request_quote":
    default:
      return "Request a quote";
  }
}

export const CONDITION_GRADES = {
  A: "Cosmetic grade A: minimal visible wear.",
  B: "Cosmetic grade B: light visible wear.",
  C: "Cosmetic grade C: more noticeable visible wear.",
} as const;
