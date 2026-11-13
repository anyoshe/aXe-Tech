import { describe, expect, it } from "vitest";
import { hasValidProductImageSignature, PRODUCT_IMAGE_EXTENSIONS } from "../src/lib/product-media-validation";

describe("product image upload validation", () => {
  it("recognizes supported image signatures against their declared MIME type", () => {
    expect(hasValidProductImageSignature(Buffer.from([0xff, 0xd8, 0xff, 0x00]), "image/jpeg")).toBe(true);
    expect(hasValidProductImageSignature(Buffer.from("89504e470d0a1a0a", "hex"), "image/png")).toBe(true);
    expect(hasValidProductImageSignature(Buffer.from("RIFF0000WEBP", "ascii"), "image/webp")).toBe(true);
    expect(hasValidProductImageSignature(Buffer.from("GIF89a", "ascii"), "image/gif")).toBe(true);
  });

  it("rejects mismatched or unsupported content and has a fixed extension allowlist", () => {
    const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0x00]);
    expect(hasValidProductImageSignature(jpeg, "image/png")).toBe(false);
    expect(hasValidProductImageSignature(jpeg, "application/octet-stream")).toBe(false);
    expect(PRODUCT_IMAGE_EXTENSIONS["image/svg+xml"]).toBeUndefined();
  });
});
