import { describe, expect, it } from "vitest";
import { getImageResizeDimensions } from "../src/lib/product-image-compression";
import { MAX_COMPRESSED_PRODUCT_IMAGE_BYTES } from "../src/lib/product-image-limits";

describe("product image compression limits", () => {
  it("uses a strict 100 KB upload target", () => {
    expect(MAX_COMPRESSED_PRODUCT_IMAGE_BYTES).toBe(100_000);
  });

  it("preserves aspect ratio while constraining the longest edge", () => {
    expect(getImageResizeDimensions(4000, 2000, 1600)).toEqual({ width: 1600, height: 800 });
  });

  it("does not enlarge images smaller than the selected maximum", () => {
    expect(getImageResizeDimensions(640, 480, 1600)).toEqual({ width: 640, height: 480 });
  });

  it("rejects invalid image dimensions", () => {
    expect(() => getImageResizeDimensions(0, 480, 1600)).toThrow("Image dimensions must be positive.");
  });
});
