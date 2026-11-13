import { describe, expect, it } from "vitest";
import { formatKes, priceRangeFromVariants, startingPriceFromVariants, type ProductVariant } from "../src/lib/product-variants";

const variant = (overrides: Partial<ProductVariant>): ProductVariant => ({
  id: "variant-1",
  product_id: "product-1",
  label: "Configuration",
  price: null,
  availability: "request_quote",
  ...overrides,
});

describe("catalogue variant pricing", () => {
  it("uses the lowest positive price among published, available variants", () => {
    expect(startingPriceFromVariants([
      variant({ price: 26000 }),
      variant({ id: "v2", price: 22000 }),
      variant({ id: "v3", price: 10000, published: false }),
      variant({ id: "v4", price: 1, availability: "unavailable" }),
    ])).toBe(22000);
  });

  it("does not invent a price when all variants require a quote", () => {
    const variants = [variant({ price: null }), variant({ id: "v2", price: 0 })];
    expect(startingPriceFromVariants(variants)).toBeNull();
    expect(priceRangeFromVariants(variants)).toEqual({ min: null, max: null });
    expect(formatKes(startingPriceFromVariants(variants))).toBe("Request a quote");
  });
});
