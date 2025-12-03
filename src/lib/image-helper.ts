// Utility to handle both URL and Base64 images
import { isBase64, isUrl } from "./image-utils";

export const getImageSource = (image: string | undefined): string => {
  if (!image) return '/placeholder.jpg';
  
  // If it's a Base64 string
  if (isBase64(image)) {
    return image; // Use directly as src
  }
  
  // If it's a URL or path
  if (isUrl(image)) {
    return image;
  }
  
  // Fallback placeholder
  return '/placeholder.jpg';
};

export const isBase64Image = (image: string): boolean => {
  return isBase64(image);
};