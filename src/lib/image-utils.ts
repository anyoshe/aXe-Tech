// Convert image to optimized Base64
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

// Check if string is Base64
export const isBase64 = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  return str.startsWith('data:image');
};

// Check if string is URL
export const isUrl = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  return str.startsWith('http') || str.startsWith('/');
};