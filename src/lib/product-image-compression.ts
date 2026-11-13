import { MAX_COMPRESSED_PRODUCT_IMAGE_BYTES } from "./product-image-limits";

const MAX_SOURCE_IMAGE_BYTES = 30 * 1024 * 1024;
const MAX_DIMENSIONS = [2560, 2048, 1600, 1280, 1024, 800, 640, 480];
const WEBP_QUALITIES = [0.92, 0.88, 0.85, 0.82];

export type CompressedProductImage = {
  file: File;
  originalSize: number;
  width?: number;
  height?: number;
};

export function getImageResizeDimensions(width: number, height: number, maxDimension: number) {
  if (width <= 0 || height <= 0 || maxDimension <= 0) {
    throw new Error("Image dimensions must be positive.");
  }
  const scale = Math.min(1, maxDimension / Math.max(width, height));
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function getWebpBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Your browser could not encode this image."));
      } else if (blob.type !== "image/webp") {
        reject(new Error("Your browser does not support WebP image compression."));
      } else {
        resolve(blob);
      }
    }, "image/webp", quality);
  });
}

export async function compressProductImage(file: File): Promise<CompressedProductImage> {
  if (file.size === 0) throw new Error("The selected file is empty.");
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, or GIF images can be processed.");
  }
  if (file.size > MAX_SOURCE_IMAGE_BYTES) {
    throw new Error("Source image exceeds the 30 MB processing limit.");
  }

  if (file.size < MAX_COMPRESSED_PRODUCT_IMAGE_BYTES) {
    return {
      file,
      originalSize: file.size,
    };
  }

  if (file.type === "image/gif") {
    throw new Error("GIF is over 100 KB; convert it to a still image first to preserve its animation.");
  }
  if (typeof createImageBitmap !== "function") {
    throw new Error("This browser cannot process images for upload. Try a current version of Chrome, Edge, or Firefox.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("The image could not be decoded. Check that the file is a valid image.");
  }

  try {
    const naturalMaxDimension = Math.max(bitmap.width, bitmap.height);
    const dimensionsToTry = Array.from(
      new Set([
        Math.min(naturalMaxDimension, MAX_DIMENSIONS[0]),
        ...MAX_DIMENSIONS.filter((dimension) => dimension < naturalMaxDimension),
      ])
    ).sort((a, b) => b - a);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) throw new Error("Your browser could not prepare the image for compression.");

    for (const maxDimension of dimensionsToTry) {
      const dimensions = getImageResizeDimensions(bitmap.width, bitmap.height, maxDimension);
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      for (const quality of WEBP_QUALITIES) {
        const blob = await getWebpBlob(canvas, quality);
        if (blob.size < MAX_COMPRESSED_PRODUCT_IMAGE_BYTES) {
          const outputName = `${file.name.replace(/\.[^.]+$/, "")}.webp`;
          return {
            file: new File([blob], outputName, { type: "image/webp", lastModified: file.lastModified }),
            originalSize: file.size,
            width: dimensions.width,
            height: dimensions.height,
          };
        }
      }
    }

    throw new Error("Could not reach under 100 KB without reducing quality beyond the allowed limit. Try a simpler or smaller image.");
  } finally {
    bitmap.close();
  }
}
