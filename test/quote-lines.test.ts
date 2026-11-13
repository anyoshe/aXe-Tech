import { describe, expect, it } from "vitest";
import { quoteLineIdentity, quoteSubtotal } from "@/lib/quote-lines";

describe("quotation line identity and totals", () => {
  it("keeps configurations of the same parent as separate line items", () => {
    expect(quoteLineIdentity("hp-840", "8gb-256gb")).not.toBe(quoteLineIdentity("hp-840", "16gb-512gb"));
    expect(quoteLineIdentity("hp-840")).toBe("hp-840::base");
  });

  it("does not calculate a subtotal when a variant needs a quote", () => {
    expect(quoteSubtotal([{ productId: "hp-840", qty: 1, productPrice: 30000, variant: { id: "quote", product_id: "hp-840", label: "16GB / 512GB", price: null, availability: "request_quote" } }])).toBeNull();
  });

  it("calculates only confirmed variant prices", () => {
    expect(quoteSubtotal([{ productId: "hp-840", qty: 2, productPrice: 30000, variant: { id: "priced", product_id: "hp-840", label: "8GB / 256GB", price: 35000, availability: "in_stock" } }])).toBe(70000);
  });
});
