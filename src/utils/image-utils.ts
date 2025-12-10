// // utils/image-utils.ts

// // Check if string is valid Base64 image (complete)
// export const isValidBase64 = (str: string | undefined): boolean => {
//   if (!str || typeof str !== 'string') return false;
  
//   const trimmed = str.trim();
  
//   // Check for complete Base64 image pattern with actual data
//   // Should have: data:image/type;base64,actual_base64_data
//   const pattern = /^data:image\/(jpeg|png|jpg|gif|webp|bmp|svg\+xml);base64,[A-Za-z0-9+/]+={0,2}$/i;
//   return pattern.test(trimmed);
// };

// // Check if string is incomplete Base64 (just prefix)
// export const isIncompleteBase64 = (str: string | undefined): boolean => {
//   if (!str || typeof str !== 'string') return false;
//   const trimmed = str.trim();
//   return trimmed.startsWith('data:image') && !isValidBase64(trimmed);
// };

// // Check if string is URL or path
// export const isUrl = (str: string | undefined): boolean => {
//   if (!str || typeof str !== 'string') return false;
  
//   const trimmed = str.trim();
  
//   // Check for URLs (http/https)
//   if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
//     return true;
//   }
  
//   // Check for absolute paths (starting with /)
//   if (trimmed.startsWith('/')) {
//     return true;
//   }
  
//   return false;
// };

// // Check if it's a relative path in public folder
// export const isPublicPath = (str: string | undefined): boolean => {
//   if (!str || typeof str !== 'string') return false;
  
//   const trimmed = str.trim();
  
//   // Public folder paths typically start with / and have image extensions
//   if (!trimmed.startsWith('/')) return false;
  
//   const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
//   return imageExtensions.some(ext => trimmed.toLowerCase().endsWith(ext));
// };

// // Convert image to optimized Base64 (for uploads)
// export const convertToBase64 = async (file: File, maxSizeKB = 500): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
    
//     reader.onload = async (event) => {
//       try {
//         let base64 = event.target?.result as string;
        
//         // Optimize image if it's too large
//         if (file.size > maxSizeKB * 1024) {
//           base64 = await compressBase64Image(base64, maxSizeKB);
//         }
        
//         resolve(base64);
//       } catch (error) {
//         reject(error);
//       }
//     };
    
//     reader.onerror = error => reject(error);
//   });
// };

// // Compress Base64 image
// const compressBase64Image = async (base64: string, maxSizeKB: number): Promise<string> => {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.src = base64;
    
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       let width = img.width;
//       let height = img.height;
      
//       // Calculate new dimensions (max 1200px width)
//       const MAX_WIDTH = 1200;
//       if (width > MAX_WIDTH) {
//         height = Math.round((height * MAX_WIDTH) / width);
//         width = MAX_WIDTH;
//       }
      
//       canvas.width = width;
//       canvas.height = height;
      
//       const ctx = canvas.getContext('2d');
//       if (!ctx) {
//         resolve(base64); // Return original if can't compress
//         return;
//       }
      
//       // Draw resized image
//       ctx.drawImage(img, 0, 0, width, height);
      
//       // Get compressed Base64
//       const quality = Math.max(0.1, Math.min(1, (maxSizeKB * 1024) / (base64.length * 0.75)));
//       const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      
//       resolve(compressedBase64);
//     };
    
//     img.onerror = () => resolve(base64); // Return original if compression fails
//   });
// };

// utils/image-utils.ts

// Check if string is valid Base64 image (complete)
export const isValidBase64 = (str: string | undefined): boolean => {
  if (!str || typeof str !== 'string') return false;
  
  const trimmed = str.trim();
  
  // Check for complete Base64 image pattern with actual data
  // Should have: data:image/type;base64,actual_base64_data
  const pattern = /^data:image\/(jpeg|png|jpg|gif|webp|bmp|svg\+xml);base64,[A-Za-z0-9+/]+={0,2}$/i;
  return pattern.test(trimmed);
};

// Check if string is incomplete Base64 (just prefix)
export const isIncompleteBase64 = (str: string | undefined): boolean => {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  return trimmed.startsWith('data:image') && !isValidBase64(trimmed);
};

// Alias for isValidBase64 (to match component import)
export const isBase64 = (str: string | undefined): boolean => {
  return isValidBase64(str);
};

// Check if string is URL or path
export const isUrl = (str: string | undefined): boolean => {
  if (!str || typeof str !== 'string') return false;
  
  const trimmed = str.trim();
  
  // Check for URLs (http/https)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return true;
  }
  
  // Check for absolute paths (starting with /)
  if (trimmed.startsWith('/')) {
    return true;
  }
  
  return false;
};

// Check if it's a relative path in public folder
export const isPublicPath = (str: string | undefined): boolean => {
  if (!str || typeof str !== 'string') return false;
  
  const trimmed = str.trim();
  
  // Public folder paths typically start with / and have image extensions
  if (!trimmed.startsWith('/')) return false;
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  return imageExtensions.some(ext => trimmed.toLowerCase().endsWith(ext));
};

// Convert image to optimized Base64 (for uploads)
export const convertToBase64 = async (file: File, maxSizeKB = 500): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = async (event) => {
      try {
        let base64 = event.target?.result as string;
        
        // Optimize image if it's too large
        if (file.size > maxSizeKB * 1024) {
          base64 = await compressBase64Image(base64, maxSizeKB);
        }
        
        resolve(base64);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = error => reject(error);
  });
};

// Compress Base64 image
const compressBase64Image = async (base64: string, maxSizeKB: number): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions (max 1200px width)
      const MAX_WIDTH = 1200;
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64); // Return original if can't compress
        return;
      }
      
      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get compressed Base64
      const quality = Math.max(0.1, Math.min(1, (maxSizeKB * 1024) / (base64.length * 0.75)));
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      
      resolve(compressedBase64);
    };
    
    img.onerror = () => resolve(base64); // Return original if compression fails
  });
};

    // Normalize an array of stored image entries — repairs cases where Base64 data URLs
    // were accidentally split at commas (e.g. ['data:image/jpeg;base64', '/9j/4AAQ...'])
    export const normalizeImageList = (images?: string[] | null): string[] => {
      if (!images || !Array.isArray(images)) return [];

      const out: string[] = [];
      const base64PayloadRe = /^[A-Za-z0-9+/\/=]+$/; // matches base64 payload (may include = and leading /)

      for (let i = 0; i < images.length; i++) {
        const raw = (images[i] ?? '').trim();
        if (!raw) continue;

        // If this is already a full data URL, keep it
        if (isValidBase64(raw)) {
          out.push(raw);
          continue;
        }

        // If looks like a data URI header but missing comma/payload, try to join with next
        if (raw.startsWith('data:image') && !raw.includes(',')) {
          const next = (images[i + 1] ?? '').trim();
          if (next && (base64PayloadRe.test(next) || next.startsWith('/'))) {
            out.push(`${raw},${next}`);
            i++; // skip next since consumed
            continue;
          }
        }

        // If this looks like a payload fragment that follows a header, try to attach to previous
        if (base64PayloadRe.test(raw) && out.length > 0 && out[out.length - 1].startsWith('data:image') && !out[out.length - 1].includes(',')) {
          out[out.length - 1] = `${out[out.length - 1]},${raw}`;
          continue;
        }

        // Otherwise push as-is (URL or other string)
        out.push(raw);
      }

      return out;
    };