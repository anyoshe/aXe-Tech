export const MAX_PRODUCT_IMAGE_BYTES = 5 * 1024 * 1024;

export const PRODUCT_IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function hasValidProductImageSignature(buffer: Buffer, contentType: string): boolean {
  switch (contentType) {
    case "image/jpeg":
      return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png":
      return buffer.length >= 8 && buffer.subarray(0, 8).toString("hex") === "89504e470d0a1a0a";
    case "image/webp":
      return buffer.length >= 12 && buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
    case "image/gif":
      return buffer.length >= 6 && /^GIF8[79]a$/.test(buffer.subarray(0, 6).toString());
    default:
      return false;
  }
}
