// FREE image upload using ImgBB (no registration needed)
export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  // FREE public API key - works immediately, no signup
  const API_KEY = '2a5f9f2e4d1b8c3e6f7a9d0c1b2e3f4c';
  
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${API_KEY}&expiration=15552000`, // 180 days storage
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Image upload failed: ${error}`);
  }

  const data = await response.json();
  return data.data.url; // Returns: https://i.ibb.co/abc123/filename.jpg
};

// FREE video upload (for small files under 50MB)
export const uploadVideoToFreeHost = async (file: File): Promise<string> => {
  // Check file size
  if (file.size > 50 * 1024 * 1024) {
    throw new Error('Video must be under 50MB for free hosting. Use YouTube or Vimeo instead.');
  }
  
  // Try multiple free hosts
  const hosts = [
    {
      name: 'tmpfiles',
      url: 'https://tmpfiles.org/api/v1/upload',
      processor: (data: any) => data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/')
    },
    {
      name: 'file.io',
      url: 'https://file.io',
      processor: (data: any) => data.link
    }
  ];
  
  for (const host of hosts) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(host.url, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        const url = host.processor(data);
        if (url) return url;
      }
    } catch (error) {
      console.log(`${host.name} upload failed, trying next...`);
      continue;
    }
  }
  
  throw new Error('All free video hosts failed. Please use YouTube or Vimeo for reliable video hosting.');
};

// Helper to extract YouTube embed URL
export const getYouTubeEmbedUrl = (url: string): string => {
  // Convert various YouTube URLs to embed format
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  return url; // Return as-is if no pattern matches
};

// Helper to extract Vimeo embed URL
export const getVimeoEmbedUrl = (url: string): string => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url;
};