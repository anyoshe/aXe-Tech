// // Utility to handle both URL and Base64 images
// import { isBase64, isUrl } from "./image-utils";

// export const getImageSource = (image: string | undefined): string => {
//   if (!image) return '/placeholder.jpg';
  
//   // If it's a Base64 string
//   if (isBase64(image)) {
//     return image; // Use directly as src
//   }
  
//   // If it's a URL or path
//   if (isUrl(image)) {
//     return image;
//   }
  
//   // Fallback placeholder
//   return '/placeholder.jpg';
// };

// export const isBase64Image = (image: string): boolean => {
//   return isBase64(image);
// };

// helpers/image-helpers.ts
import { isValidBase64, isIncompleteBase64, isUrl, isPublicPath } from "../utils/image-utils";

export const getImageSource = (image: string | undefined): string => {
  if (!image) return '/placeholder.jpg';
  
  const trimmed = image.trim();
  
  // 1. Check for valid Base64 (complete)
  if (isValidBase64(trimmed)) {
    return trimmed; // Use directly as src
  }
  
  // 2. Check for incomplete Base64 (just prefix) - return placeholder
  if (isIncompleteBase64(trimmed)) {
    console.warn('Incomplete Base64 image found:', trimmed.substring(0, 50) + '...');
    return '/placeholder.jpg'; // Return placeholder instead
  }
  
  // 3. Check for public folder paths
  if (isPublicPath(trimmed)) {
    return trimmed; // Public folder paths work directly
  }
  
  // 4. Check for URLs
  if (isUrl(trimmed)) {
    return trimmed;
  }
  
  // 5. Fallback placeholder
  return '/placeholder.jpg';
};

// For backward compatibility
export const isBase64 = (image: string | undefined): boolean => {
  return isValidBase64(image);
};

// Check if we should use unoptimized prop for Next.js Image
export const shouldUseUnoptimized = (image: string | undefined): boolean => {
  if (!image) return false;
  return isValidBase64(image) || isIncompleteBase64(image);
};

// Get the first valid image from an array
export const getFirstValidImage = (images: string[] | undefined): string => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '/placeholder.jpg';
  }
  
  for (const img of images) {
    const src = getImageSource(img);
    if (src !== '/placeholder.jpg') {
      return src;
    }
  }
  
  return '/placeholder.jpg';
};