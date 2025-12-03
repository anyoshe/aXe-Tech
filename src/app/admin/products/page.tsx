// "use client";

// import { useEffect, useState, useRef } from "react";
// import { ImageIcon, Upload, X, Loader2, Video, FileVideo, Youtube, Globe } from "lucide-react";
// import { uploadImageToImgBB, uploadVideoToFreeHost, getYouTubeEmbedUrl, getVimeoEmbedUrl } from "@/lib/image-utils";

// type Product = {
//   id: string;
//   title: string;
//   price: number;
//   category?: string;
//   images: string[];
//   short?: string;
//   description?: string;
//   features: string[];
//   videos: string[];
//   specs?: Record<string, unknown>;
//   createdAt?: string;
//   updatedAt?: string;
// };

// type UploadingFile = {
//   file: File;
//   preview: string;
//   uploading: boolean;
//   error?: string;
//   url?: string;
//   type: 'image' | 'video';
// };

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
//   const [form, setForm] = useState({
//     id: "",
//     title: "",
//     price: "",
//     category: "",
//     images: "",
//     videos: "",
//     features: "",
//     short: "",
//     description: "",
//     specs: "{}"
//   });
//   const [editing, setEditing] = useState<string | null>(null);
//   const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
//   const [videoInputMode, setVideoInputMode] = useState<'upload' | 'url'>('url');
//   const [videoUrlInput, setVideoUrlInput] = useState('');

//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const videoInputRef = useRef<HTMLInputElement>(null);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const r = await fetch('/api/products');
//       const data = await r.json();
//       setProducts(data || []);
//     } catch {
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const resetForm = () => {
//     setForm({
//       id: "",
//       title: "",
//       price: "",
//       category: "",
//       images: "",
//       videos: "",
//       features: "",
//       short: "",
//       description: "",
//       specs: "{}"
//     });
//     setEditing(null);
//     setUploadingFiles([]);
//     setMessage(null);
//     setVideoUrlInput('');
//   };

//   const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage(null), 5000);
//   };

//   // ========== FREE IMAGE UPLOAD ==========
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const newFiles: UploadingFile[] = Array.from(files).map(file => ({
//       file,
//       preview: URL.createObjectURL(file),
//       uploading: true,
//       type: 'image'
//     }));

//     setUploadingFiles(prev => [...prev, ...newFiles]);

//     for (const fileObj of newFiles) {
//       try {
//         const url = await uploadImageToImgBB(fileObj.file);

//         setUploadingFiles(prev =>
//           prev.map(f =>
//             f.file === fileObj.file
//               ? { ...f, uploading: false, url }
//               : f
//           )
//         );

//         const currentImages = form.images ? form.images.split(',').filter(Boolean) : [];
//         const updatedImages = [...currentImages, url];
//         setForm(prev => ({ ...prev, images: updatedImages.join(', ') }));

//         showMessage('Image uploaded successfully! (Free hosting, 6-month storage)');

//       } catch (error) {
//         console.error('Upload error:', error);
//         setUploadingFiles(prev =>
//           prev.map(f =>
//             f.file === fileObj.file
//               ? { ...f, uploading: false, error: error instanceof Error ? error.message : 'Upload failed' }
//               : f
//           )
//         );
//         showMessage(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
//       }
//     }

//     if (imageInputRef.current) {
//       imageInputRef.current.value = '';
//     }
//   };

//   // ========== VIDEO HANDLING ==========
//   const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const file = files[0];
//     const fileObj: UploadingFile = {
//       file,
//       preview: '',
//       uploading: true,
//       type: 'video'
//     };

//     setUploadingFiles(prev => [...prev, fileObj]);

//     try {
//       if (file.size > 50 * 1024 * 1024) {
//         throw new Error('Video too large (max 50MB). Use YouTube/Vimeo links instead.');
//       }

//       const url = await uploadVideoToFreeHost(file);

//       setUploadingFiles(prev =>
//         prev.map(f =>
//           f.file === file
//             ? { ...f, uploading: false, url }
//             : f
//         )
//       );

//       const currentVideos = form.videos ? form.videos.split(',').filter(Boolean) : [];
//       const updatedVideos = [...currentVideos, url];
//       setForm(prev => ({ ...prev, videos: updatedVideos.join(', ') }));

//       showMessage('Video uploaded! (Free hosting, temporary storage)');

//     } catch (error) {
//       console.error('Upload error:', error);
//       setUploadingFiles(prev =>
//         prev.map(f =>
//           f.file === file
//             ? { ...f, uploading: false, error: error instanceof Error ? error.message : 'Upload failed' }
//             : f
//         )
//       );
//       showMessage(`Video upload failed. Try YouTube/Vimeo links instead.`, 'error');
//     }

//     if (videoInputRef.current) {
//       videoInputRef.current.value = '';
//     }
//   };

//   const handleAddVideoUrl = () => {
//     if (!videoUrlInput.trim()) return;

//     let processedUrl = videoUrlInput.trim();

//     // Convert YouTube URLs to embed format
//     if (videoUrlInput.includes('youtube.com') || videoUrlInput.includes('youtu.be')) {
//       processedUrl = getYouTubeEmbedUrl(videoUrlInput);
//     }

//     // Convert Vimeo URLs to embed format
//     if (videoUrlInput.includes('vimeo.com')) {
//       processedUrl = getVimeoEmbedUrl(videoUrlInput);
//     }

//     const currentVideos = form.videos ? form.videos.split(',').filter(Boolean) : [];
//     const updatedVideos = [...currentVideos, processedUrl];
//     setForm(prev => ({ ...prev, videos: updatedVideos.join(', ') }));

//     setVideoUrlInput('');
//     showMessage('Video URL added successfully!');
//   };

//   const removeUploadingFile = (index: number) => {
//     setUploadingFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const removeImageFromList = (urlToRemove: string) => {
//     const images = form.images.split(',').map(s => s.trim()).filter(Boolean);
//     const updatedImages = images.filter(url => url !== urlToRemove);
//     setForm(prev => ({ ...prev, images: updatedImages.join(', ') }));
//   };

//   const removeVideoFromList = (urlToRemove: string) => {
//     const videos = form.videos.split(',').map(s => s.trim()).filter(Boolean);
//     const updatedVideos = videos.filter(url => url !== urlToRemove);
//     setForm(prev => ({ ...prev, videos: updatedVideos.join(', ') }));
//   };

//   // ========== PRODUCT CRUD FUNCTIONS (Keep these as is) ==========
//   const handleCreate = async () => {
//     if (!form.title || !form.price) {
//       showMessage("Title and price are required", 'error');
//       return;
//     }

//     try {
//       const payload = {
//         id: form.id || `prod-${Date.now()}`,
//         title: form.title,
//         price: Number(form.price) || 0,
//         category: form.category,
//         images: form.images ? form.images.split(',').map(s => s.trim()).filter(s => s) : [],
//         videos: form.videos ? form.videos.split(',').map(s => s.trim()).filter(s => s) : [],
//         features: form.features ? form.features.split(',').map(s => s.trim()).filter(s => s) : [],
//         short: form.short,
//         description: form.description,
//         specs: form.specs ? JSON.parse(form.specs) : {},
//       };

//       const r = await fetch('/api/products', {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await r.json();

//       if (r.ok) {
//         showMessage('Product created successfully!');
//         resetForm();
//         fetchProducts();
//       } else {
//         showMessage(`Error: ${result.message}`, 'error');
//       }
//     } catch (error) {
//       showMessage('Error creating product', 'error');
//     }
//   };

//   const handleUpdate = async () => {
//     if (!editing) return;

//     try {
//       const payload = {
//         id: editing,
//         title: form.title,
//         price: Number(form.price) || 0,
//         category: form.category,
//         images: form.images ? form.images.split(',').map(s => s.trim()).filter(s => s) : [],
//         videos: form.videos ? form.videos.split(',').map(s => s.trim()).filter(s => s) : [],
//         features: form.features ? form.features.split(',').map(s => s.trim()).filter(s => s) : [],
//         short: form.short,
//         description: form.description,
//         specs: form.specs ? JSON.parse(form.specs) : {},
//       };

//       const r = await fetch(`/api/products`, {
//         method: 'PUT',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const result = await r.json();

//       if (r.ok) {
//         showMessage('Product updated successfully!');
//         resetForm();
//         fetchProducts();
//       } else {
//         showMessage(`Error: ${result.message}`, 'error');
//       }
//     } catch (error) {
//       showMessage('Error updating product', 'error');
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;

//     try {
//       const r = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
//       const result = await r.json();

//       if (r.ok) {
//         showMessage('Product deleted successfully!');
//         fetchProducts();
//       } else {
//         showMessage(`Error: ${result.message}`, 'error');
//       }
//     } catch (error) {
//       showMessage('Error deleting product', 'error');
//     }
//   };

//   const handleEditClick = (p: Product) => {
//     setEditing(p.id);
//     setForm({
//       id: p.id,
//       title: p.title,
//       price: String(p.price),
//       category: p.category || '',
//       images: (p.images || []).join(', '),
//       videos: (p.videos || []).join(', '),
//       features: (p.features || []).join(', '),
//       short: p.short || '',
//       description: p.description || '',
//       specs: p.specs ? JSON.stringify(p.specs, null, 2) : '{}'
//     });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleSeed = async () => {
//     if (!confirm('This will add sample products to your database. Continue?')) return;

//     try {
//       const r = await fetch('/api/products/seed', { method: 'POST' });
//       const result = await r.json();

//       if (r.ok) {
//         showMessage(`Seeded products successfully!`);
//         fetchProducts();
//       } else {
//         showMessage(`Error: ${result.message}`, 'error');
//       }
//     } catch (error) {
//       showMessage('Error seeding products', 'error');
//     }
//   };

//   // ========== RENDER ==========
//   return (
//     <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Admin — Products Management</h1>
//           <p className="text-white/60">Create, edit, and manage your ICT products</p>

//           {/* Free Hosting Notice */}
//           <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg">
//             <div className="flex items-start gap-3">
//               <div className="bg-green-500/20 p-2 rounded-full">
//                 <span className="text-green-400 text-sm font-bold">FREE</span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-green-300">100% Free Media Hosting Active</h3>
//                 <p className="text-white/70 text-sm mt-1">
//                   • <strong>Images:</strong> Upload to ImgBB (32MB max, 6-month storage)
//                   <br />
//                   • <strong>Videos:</strong> Use YouTube/Vimeo links (recommended) or upload small videos (max 50MB)
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Message Alert */}
//         {message && (
//           <div className={`p-4 mb-6 rounded-lg border ${message.type === 'error'
//               ? 'bg-red-500/20 border-red-500'
//               : 'bg-green-500/20 border-green-500'
//             }`}>
//             <div className="flex items-center gap-2">
//               <span className={`w-2 h-2 rounded-full ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
//                 }`} />
//               <div className="whitespace-pre-line">{message.text}</div>
//             </div>
//           </div>
//         )}

//         {/* Product Form */}
//         <div className="mb-8 p-6 bg-[#0b0b0b] rounded-xl border border-white/10">
//           <h2 className="text-xl font-semibold mb-4">
//             {editing ? `Edit Product: ${editing}` : 'Create New Product'}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             {/* Basic Info */}
//             <div>
//               <label className="block text-sm text-white/60 mb-2">Product ID *</label>
//               <input
//                 placeholder="e.g., lap-001"
//                 value={form.id}
//                 onChange={e => setForm({ ...form, id: e.target.value })}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//                 disabled={editing !== null}
//               />
//               <p className="text-xs text-white/40 mt-1">Required, must be unique</p>
//             </div>

//             <div>
//               <label className="block text-sm text-white/60 mb-2">Category</label>
//               <input
//                 placeholder="e.g., Laptops, Tablets, Printers"
//                 value={form.category}
//                 onChange={e => setForm({ ...form, category: e.target.value })}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm text-white/60 mb-2">Title *</label>
//               <input
//                 placeholder="Product title"
//                 value={form.title}
//                 onChange={e => setForm({ ...form, title: e.target.value })}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-white/60 mb-2">Price (KSh) *</label>
//               <input
//                 type="number"
//                 placeholder="0"
//                 value={form.price}
//                 onChange={e => setForm({ ...form, price: e.target.value })}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-white/60 mb-2">Short Description</label>
//               <input
//                 placeholder="Brief product description"
//                 value={form.short}
//                 onChange={e => setForm({ ...form, short: e.target.value })}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//               />
//             </div>

//             {/* ========== IMAGE UPLOAD SECTION ========== */}
//             <div className="md:col-span-2">
//               <div className="flex items-center gap-2 mb-2">
//                 <label className="block text-sm text-white/60">Product Images</label>
//                 <span className="text-xs bg-green-500 text-black px-2 py-0.5 rounded-full">FREE</span>
//               </div>

//               {/* Image Upload Button */}
//               <div className="mb-4">
//                 <input
//                   type="file"
//                   ref={imageInputRef}
//                   onChange={handleImageUpload}
//                   multiple
//                   accept="image/*"
//                   className="hidden"
//                   id="image-upload"
//                 />
//                 <label
//                   htmlFor="image-upload"
//                   className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors"
//                 >
//                   <ImageIcon className="w-4 h-4" />
//                   Upload Images (Free)
//                 </label>
//                 <p className="text-xs text-white/40 mt-2">
//                   JPG, PNG, WebP • Max 32MB per file • Hosted on ImgBB (6-month storage)
//                 </p>
//               </div>

//               {/* Upload Progress */}
//               {uploadingFiles.filter(f => f.type === 'image').length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="text-sm font-medium text-white/60 mb-2">
//                     Uploading Images ({uploadingFiles.filter(f => f.type === 'image').length})
//                   </h4>
//                   <div className="flex flex-wrap gap-3">
//                     {uploadingFiles.filter(f => f.type === 'image').map((file, index) => (
//                       <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20">
//                         <img
//                           src={file.preview}
//                           alt="Uploading"
//                           className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
//                           {file.uploading ? (
//                             <Loader2 className="w-6 h-6 animate-spin" />
//                           ) : file.error ? (
//                             <div className="text-center p-2">
//                               <X className="w-6 h-6 text-red-500 mx-auto mb-1" />
//                               <p className="text-xs text-red-400">Failed</p>
//                             </div>
//                           ) : (
//                             <div className="text-center p-2">
//                               <div className="w-6 h-6 mx-auto mb-1">
//                                 <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                               </div>
//                               <p className="text-xs text-green-400">Done</p>
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeUploadingFile(
//                             uploadingFiles.findIndex(f => f.file === file.file)
//                           )}
//                           className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Current Images */}
//               <div className="mb-4">
//                 <label className="block text-sm text-white/60 mb-2">
//                   Image URLs ({form.images ? form.images.split(',').filter(Boolean).length : 0})
//                 </label>
//                 <textarea
//                   placeholder="Image URLs will appear here after upload, or paste URLs manually (comma separated)"
//                   value={form.images}
//                   onChange={e => setForm({ ...form, images: e.target.value })}
//                   rows={2}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//                 />

//                 {/* Image Previews */}
//                 {form.images && (
//                   <div className="mt-3">
//                     <div className="flex flex-wrap gap-3">
//                       {form.images.split(',').map((url, index) => (
//                         url.trim() && (
//                           <div key={index} className="relative group">
//                             <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden border border-white/10">
//                               <img
//                                 src={url.trim()}
//                                 alt={`Product image ${index + 1}`}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
//                                 }}
//                               />
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeImageFromList(url.trim())}
//                               className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                             <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-1 text-center truncate">
//                               {index + 1}
//                             </div>
//                           </div>
//                         )
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ========== VIDEO SECTION ========== */}
//             <div className="md:col-span-2">
//               <div className="flex items-center gap-2 mb-2">
//                 <label className="block text-sm text-white/60">Product Videos</label>
//                 <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">FREE</span>
//               </div>

//               {/* Video Input Mode Selector */}
//               <div className="flex gap-2 mb-4">
//                 <button
//                   type="button"
//                   onClick={() => setVideoInputMode('url')}
//                   className={`px-4 py-2 rounded-lg flex items-center gap-2 ${videoInputMode === 'url'
//                       ? 'bg-blue-600'
//                       : 'bg-gray-800 hover:bg-gray-700'
//                     }`}
//                 >
//                   <Globe className="w-4 h-4" />
//                   Add Video URL
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setVideoInputMode('upload')}
//                   className={`px-4 py-2 rounded-lg flex items-center gap-2 ${videoInputMode === 'upload'
//                       ? 'bg-purple-600'
//                       : 'bg-gray-800 hover:bg-gray-700'
//                     }`}
//                 >
//                   <Upload className="w-4 h-4" />
//                   Upload Video
//                 </button>
//               </div>

//               {/* Video URL Input */}
//               {videoInputMode === 'url' && (
//                 <div className="mb-4">
//                   <div className="flex gap-2 mb-3">
//                     <input
//                       type="text"
//                       value={videoUrlInput}
//                       onChange={(e) => setVideoUrlInput(e.target.value)}
//                       placeholder="Paste YouTube or Vimeo URL"
//                       className="flex-1 p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//                     />
//                     <button
//                       onClick={handleAddVideoUrl}
//                       className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
//                     >
//                       Add Video
//                     </button>
//                   </div>
//                   <p className="text-xs text-white/40">
//                     Supports: YouTube (watch/embed URLs), Vimeo. We'll convert to embed format automatically.
//                   </p>
//                   <div className="mt-2 flex gap-3">
//                     <a
//                       href="https://www.youtube.com/upload"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-sm text-red-400 hover:text-red-300 underline flex items-center gap-1"
//                     >
//                       <Youtube className="w-4 h-4" />
//                       Upload to YouTube
//                     </a>
//                     <span className="text-white/40">•</span>
//                     <a
//                       href="https://vimeo.com/upload"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-sm text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
//                     >
//                       <Video className="w-4 h-4" />
//                       Upload to Vimeo
//                     </a>
//                   </div>
//                 </div>
//               )}

//               {/* Video Upload */}
//               {videoInputMode === 'upload' && (
//                 <div className="mb-4">
//                   <input
//                     type="file"
//                     ref={videoInputRef}
//                     onChange={handleVideoUpload}
//                     accept="video/*"
//                     className="hidden"
//                     id="video-upload"
//                   />
//                   <label
//                     htmlFor="video-upload"
//                     className="inline-flex items-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg cursor-pointer transition-colors mb-2"
//                   >
//                     <Video className="w-4 h-4" />
//                     Upload Video File
//                   </label>
//                   <p className="text-xs text-white/40">
//                     MP4, MOV • Max 50MB • Temporary free hosting (not recommended for production)
//                     <br />
//                     <span className="text-yellow-400">For production, use YouTube/Vimeo links instead.</span>
//                   </p>
//                 </div>
//               )}

//               {/* Video Upload Progress */}
//               {uploadingFiles.filter(f => f.type === 'video').length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="text-sm font-medium text-white/60 mb-2">
//                     Uploading Videos
//                   </h4>
//                   <div className="flex flex-wrap gap-3">
//                     {uploadingFiles.filter(f => f.type === 'video').map((file, index) => (
//                       <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20">
//                         <div className="w-full h-full bg-purple-900/50 flex items-center justify-center">
//                           <FileVideo className="w-8 h-8 text-purple-300" />
//                         </div>
//                         <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
//                           {file.uploading ? (
//                             <Loader2 className="w-6 h-6 animate-spin" />
//                           ) : file.error ? (
//                             <div className="text-center p-2">
//                               <X className="w-6 h-6 text-red-500 mx-auto mb-1" />
//                               <p className="text-xs text-red-400">Failed</p>
//                             </div>
//                           ) : (
//                             <div className="text-center p-2">
//                               <div className="w-6 h-6 mx-auto mb-1">
//                                 <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                               </div>
//                               <p className="text-xs text-green-400">Done</p>
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeUploadingFile(
//                             uploadingFiles.findIndex(f => f.file === file.file)
//                           )}
//                           className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Current Videos */}
//               <div className="mb-4">
//                 <label className="block text-sm text-white/60 mb-2">
//                   Video URLs ({form.videos ? form.videos.split(',').filter(Boolean).length : 0})
//                 </label>
//                 <textarea
//                   placeholder="Video URLs (YouTube/Vimeo embed links or uploaded video URLs)"
//                   value={form.videos}
//                   onChange={e => setForm({ ...form, videos: e.target.value })}
//                   rows={2}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//                 />

//                 {/* Video Previews */}
//                 {form.videos && (
//                   <div className="mt-3">
//                     <div className="flex flex-wrap gap-3">
//                       {form.videos.split(',').map((url, index) => (
//                         url.trim() && (
//                           <div key={index} className="relative group">
//                             <div className="w-40 h-24 bg-gray-800 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
//                               {url.includes('youtube.com') || url.includes('youtu.be') ? (
//                                 <div className="text-center p-2">
//                                   <Youtube className="w-8 h-8 text-red-500 mx-auto mb-1" />
//                                   <p className="text-xs text-white/60">YouTube Video</p>
//                                 </div>
//                               ) : url.includes('vimeo.com') ? (
//                                 <div className="text-center p-2">
//                                   <Video className="w-8 h-8 text-blue-500 mx-auto mb-1" />
//                                   <p className="text-xs text-white/60">Vimeo Video</p>
//                                 </div>
//                               ) : (
//                                 <video
//                                   src={url.trim()}
//                                   className="max-h-full max-w-full"
//                                   controls
//                                 />
//                               )}
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeVideoFromList(url.trim())}
//                               className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                             <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-1 text-center truncate">
//                               {url.includes('youtube.com') ? 'YouTube' :
//                                 url.includes('vimeo.com') ? 'Vimeo' : 'Video'} {index + 1}
//                             </div>
//                           </div>
//                         )
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Other Fields */}
//             <div className="md:col-span-2">
//               <label className="block text-sm text-white/60 mb-2">Features (comma separated)</label>
//               <input
//                 placeholder="Intel Core i3, 8GB RAM, 256GB SSD"
//                 value={form.features}
//                 onChange={e => setForm({ ...form, features: e.target.value })}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm text-white/60 mb-2">Full Description</label>
//               <textarea
//                 placeholder="Detailed product description..."
//                 value={form.description}
//                 onChange={e => setForm({ ...form, description: e.target.value })}
//                 rows={4}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
//               />
//             </div>


//             <div className="md:col-span-2">
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-sm text-white/60">Specifications (JSON format)</label>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     // Insert example JSON
//                     const example = {
//                       processor: "Intel Core i5",
//                       ram: "8GB DDR4",
//                       storage: "512GB SSD",
//                       display: "14\" FHD",
//                       battery: "Up to 10 hours",
//                       ports: "2x USB 3.0, 1x USB-C, HDMI",
//                       warranty: "1 year"
//                     };
//                     setForm({ ...form, specs: JSON.stringify(example, null, 2) });
//                   }}
//                   className="text-xs text-blue-400 hover:text-blue-300 underline"
//                 >
//                   Insert Example
//                 </button>
//               </div>

//               <textarea
//                 placeholder={`Example format:
//                       {
//                         "processor": "Intel Core i5",
//                         "ram": "8GB DDR4", 
//                         "storage": "512GB SSD",
//                         "display": "14\\" FHD",
//                         "ports": "2x USB 3.0, 1x USB-C"
//                       }`}
//                 value={form.specs}
//                 onChange={e => setForm({ ...form, specs: e.target.value })}
//                 rows={6}
//                 className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none font-mono text-sm"
//               />

//               <div className="flex justify-between items-center mt-1">
//                 <p className="text-xs text-white/40">
//                   Must be valid JSON. Use double quotes for keys and values.
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     try {
//                       JSON.parse(form.specs || '{}');
//                       showMessage('✓ JSON is valid!', 'success');
//                     } catch (error) {
//                       showMessage('✗ Invalid JSON: ' + (error as Error).message, 'error');
//                     }
//                   }}
//                   className="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
//                 >
//                   Validate JSON
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
//             {editing ? (
//               <>
//                 <button
//                   onClick={handleUpdate}
//                   className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   Update Product
//                 </button>
//                 <button
//                   onClick={resetForm}
//                   className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10"
//                 >
//                   Cancel Edit
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handleCreate}
//                 className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Create Product
//               </button>
//             )}
//             <button
//               onClick={resetForm}
//               className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10"
//             >
//               Reset Form
//             </button>
//             <button
//               onClick={handleSeed}
//               className="px-6 py-3 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/10"
//             >
//               Seed Sample Data
//             </button>
//           </div>
//         </div>

//         {/* Products List */}
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Products ({products.length})</h2>
//             <div className="flex gap-2">
//               <button
//                 onClick={fetchProducts}
//                 className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 flex items-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Refresh
//               </button>
//             </div>
//           </div>

//           {loading && (
//             <div className="text-center py-12">
//               <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-white/60" />
//               <p className="text-white/60">Loading products...</p>
//             </div>
//           )}

//           {!loading && products.length === 0 && (
//             <div className="text-center py-12 border border-white/10 rounded-lg">
//               <ImageIcon className="w-12 h-12 mx-auto mb-4 text-white/40" />
//               <h3 className="text-lg font-medium mb-2">No products found</h3>
//               <p className="text-white/60 mb-4">Create your first product or seed sample data</p>
//               <button
//                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                 className="px-4 py-2 bg-[var(--color-accent)] text-black rounded-lg"
//               >
//                 Create Product
//               </button>
//             </div>
//           )}

//           <div className="grid gap-4">
//             {products.map(p => (
//               <div key={p.id} className="p-4 bg-[#0b0b0b] rounded-lg border border-white/10 hover:border-white/20 transition-colors">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="font-semibold text-lg">{p.title}</h3>
//                       <span className="px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs rounded-full">
//                         {p.category || 'Uncategorized'}
//                       </span>
//                     </div>
//                     <p className="text-white/60 text-sm mb-3">{p.short}</p>
//                     <div className="flex flex-wrap gap-4 text-sm">
//                       <span className="text-[var(--color-accent)] font-semibold">
//                         KSh {p.price.toLocaleString()}
//                       </span>
//                       <span className="text-white/40">ID: {p.id}</span>
//                       <span className="text-white/40 flex items-center gap-1">
//                         <ImageIcon className="w-3 h-3" />
//                         {p.images?.length || 0} images
//                       </span>
//                       <span className="text-white/40 flex items-center gap-1">
//                         <Video className="w-3 h-3" />
//                         {p.videos?.length || 0} videos
//                       </span>
//                       {p.createdAt && (
//                         <span className="text-white/40">
//                           Added: {new Date(p.createdAt).toLocaleDateString()}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditClick(p)}
//                       className="px-4 py-2 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 {/* Image Thumbnails in Product Card */}
//                 {p.images && p.images.length > 0 && (
//                   <div className="mt-4 pt-4 border-t border-white/10">
//                     <div className="flex gap-2 overflow-x-auto pb-2">
//                       {p.images.slice(0, 5).map((img, index) => (
//                         <div key={index} className="w-16 h-16 flex-shrink-0 rounded overflow-hidden border border-white/10">
//                           <img
//                             src={img}
//                             alt={`${p.title} ${index + 1}`}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
//                             }}
//                           />
//                         </div>
//                       ))}
//                       {p.images.length > 5 && (
//                         <div className="w-16 h-16 flex-shrink-0 rounded border border-dashed border-white/20 flex items-center justify-center text-white/40">
//                           +{p.images.length - 5}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import { ImageIcon, Upload, X, Loader2, Video, FileVideo, Youtube, Globe } from "lucide-react";
import { convertToBase64, isBase64, isUrl } from "@/lib/image-utils";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  images: string[];
  short?: string;
  description?: string;
  features: string[];
  videos: string[];
  specs?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

type UploadingFile = {
  file: File;
  preview: string;
  uploading: boolean;
  error?: string;
  url?: string;
  type: 'image' | 'video';
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    category: "",
    images: "",
    videos: "",
    features: "",
    short: "",
    description: "",
    specs: "{}"
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [videoInputMode, setVideoInputMode] = useState<'upload' | 'url'>('url');
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/products');
      const data = await r.json();
      setProducts(data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm({
      id: "",
      title: "",
      price: "",
      category: "",
      images: "",
      videos: "",
      features: "",
      short: "",
      description: "",
      specs: "{}"
    });
    setEditing(null);
    setUploadingFiles([]);
    setMessage(null);
    setVideoUrlInput('');
  };

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // ========== BASE64 IMAGE UPLOAD TO MONGODB ==========
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: UploadingFile[] = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
      type: 'image'
    }));

    setUploadingFiles(prev => [...prev, ...newFiles]);

    for (const fileObj of newFiles) {
      try {
        // Convert to Base64 (auto-compressed to ~300KB)
        const base64Image = await convertToBase64(fileObj.file, 300);
        
        setUploadingFiles(prev =>
          prev.map(f =>
            f.file === fileObj.file
              ? { ...f, uploading: false, url: base64Image }
              : f
          )
        );

        // Add to form as Base64 string
        const currentImages = form.images ? form.images.split(',').filter(Boolean) : [];
        const updatedImages = [...currentImages, base64Image];
        setForm(prev => ({ ...prev, images: updatedImages.join(', ') }));

        showMessage('✓ Image added! (Stored in MongoDB as Base64)');

      } catch (error) {
        console.error('Upload error:', error);
        setUploadingFiles(prev =>
          prev.map(f =>
            f.file === fileObj.file
              ? { ...f, uploading: false, error: error instanceof Error ? error.message : 'Failed to process image' }
              : f
          )
        );
        showMessage(`✗ Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      }
    }

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // ========== VIDEO HANDLING ==========
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileObj: UploadingFile = {
      file,
      preview: '',
      uploading: true,
      type: 'video'
    };

    setUploadingFiles(prev => [...prev, fileObj]);

    try {
      if (file.size > 50 * 1024 * 1024) {
        throw new Error('Video too large (max 50MB). Use YouTube/Vimeo links instead.');
      }

      // For videos, we'll use Base64 too (but warn about size)
      if (file.size > 10 * 1024 * 1024) {
        showMessage('⚠️ Video is large. Consider using YouTube/Vimeo for better performance.', 'error');
      }

      const reader = new FileReader();
      const videoBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setUploadingFiles(prev =>
        prev.map(f =>
          f.file === file
            ? { ...f, uploading: false, url: videoBase64 }
            : f
        )
      );

      const currentVideos = form.videos ? form.videos.split(',').filter(Boolean) : [];
      const updatedVideos = [...currentVideos, videoBase64];
      setForm(prev => ({ ...prev, videos: updatedVideos.join(', ') }));

      showMessage('Video added! (Stored in MongoDB) Note: Large videos may slow down loading.');

    } catch (error) {
      console.error('Upload error:', error);
      setUploadingFiles(prev =>
        prev.map(f =>
          f.file === file
            ? { ...f, uploading: false, error: error instanceof Error ? error.message : 'Upload failed' }
            : f
        )
      );
      showMessage(`Video upload failed. Try YouTube/Vimeo links instead.`, 'error');
    }

    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleAddVideoUrl = () => {
    if (!videoUrlInput.trim()) return;

    let processedUrl = videoUrlInput.trim();

    // Convert YouTube URLs to embed format
    if (videoUrlInput.includes('youtube.com') || videoUrlInput.includes('youtu.be')) {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
      ];
      
      for (const pattern of patterns) {
        const match = videoUrlInput.match(pattern);
        if (match && match[1]) {
          processedUrl = `https://www.youtube.com/embed/${match[1]}`;
          break;
        }
      }
    }

    // Convert Vimeo URLs to embed format
    if (videoUrlInput.includes('vimeo.com')) {
      const match = videoUrlInput.match(/vimeo\.com\/(\d+)/);
      if (match && match[1]) {
        processedUrl = `https://player.vimeo.com/video/${match[1]}`;
      }
    }

    const currentVideos = form.videos ? form.videos.split(',').filter(Boolean) : [];
    const updatedVideos = [...currentVideos, processedUrl];
    setForm(prev => ({ ...prev, videos: updatedVideos.join(', ') }));

    setVideoUrlInput('');
    showMessage('✓ Video URL added successfully!');
  };

  const removeUploadingFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeImageFromList = (urlToRemove: string) => {
    const images = form.images.split(',').map(s => s.trim()).filter(Boolean);
    const updatedImages = images.filter(url => url !== urlToRemove);
    setForm(prev => ({ ...prev, images: updatedImages.join(', ') }));
  };

  const removeVideoFromList = (urlToRemove: string) => {
    const videos = form.videos.split(',').map(s => s.trim()).filter(Boolean);
    const updatedVideos = videos.filter(url => url !== urlToRemove);
    setForm(prev => ({ ...prev, videos: updatedVideos.join(', ') }));
  };

  // ========== PRODUCT CRUD FUNCTIONS ==========
  const handleCreate = async () => {
    if (!form.title || !form.price) {
      showMessage("Title and price are required", 'error');
      return;
    }

    try {
      const payload = {
        id: form.id || `prod-${Date.now()}`,
        title: form.title,
        price: Number(form.price) || 0,
        category: form.category,
        images: form.images ? form.images.split(',').map(s => s.trim()).filter(s => s) : [],
        videos: form.videos ? form.videos.split(',').map(s => s.trim()).filter(s => s) : [],
        features: form.features ? form.features.split(',').map(s => s.trim()).filter(s => s) : [],
        short: form.short,
        description: form.description,
        specs: form.specs ? JSON.parse(form.specs) : {},
      };

      const r = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await r.json();

      if (r.ok) {
        showMessage('✓ Product created successfully! (Images stored in MongoDB)');
        resetForm();
        fetchProducts();
      } else {
        showMessage(`✗ Error: ${result.message}`, 'error');
      }
    } catch (error) {
      showMessage('✗ Error creating product', 'error');
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      const payload = {
        id: editing,
        title: form.title,
        price: Number(form.price) || 0,
        category: form.category,
        images: form.images ? form.images.split(',').map(s => s.trim()).filter(s => s) : [],
        videos: form.videos ? form.videos.split(',').map(s => s.trim()).filter(s => s) : [],
        features: form.features ? form.features.split(',').map(s => s.trim()).filter(s => s) : [],
        short: form.short,
        description: form.description,
        specs: form.specs ? JSON.parse(form.specs) : {},
      };

      const r = await fetch(`/api/products`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await r.json();

      if (r.ok) {
        showMessage('✓ Product updated successfully!');
        resetForm();
        fetchProducts();
      } else {
        showMessage(`✗ Error: ${result.message}`, 'error');
      }
    } catch (error) {
      showMessage('✗ Error updating product', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const r = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const result = await r.json();

      if (r.ok) {
        showMessage('✓ Product deleted successfully!');
        fetchProducts();
      } else {
        showMessage(`✗ Error: ${result.message}`, 'error');
      }
    } catch (error) {
      showMessage('✗ Error deleting product', 'error');
    }
  };

  const handleEditClick = (p: Product) => {
    setEditing(p.id);
    setForm({
      id: p.id,
      title: p.title,
      price: String(p.price),
      category: p.category || '',
      images: (p.images || []).join(', '),
      videos: (p.videos || []).join(', '),
      features: (p.features || []).join(', '),
      short: p.short || '',
      description: p.description || '',
      specs: p.specs ? JSON.stringify(p.specs, null, 2) : '{}'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSeed = async () => {
    if (!confirm('This will add sample products to your database. Continue?')) return;

    try {
      const r = await fetch('/api/products/seed', { method: 'POST' });
      const result = await r.json();

      if (r.ok) {
        showMessage(`✓ Seeded products successfully!`);
        fetchProducts();
      } else {
        showMessage(`✗ Error: ${result.message}`, 'error');
      }
    } catch (error) {
      showMessage('✗ Error seeding products', 'error');
    }
  };

  // Helper to display image previews (handles both URLs and Base64)
  const renderImagePreview = (url: string, index: number) => {
    const isBase64Img = isBase64(url);
    const isUrlImg = isUrl(url);
    
    return (
      <div key={index} className="relative group">
        <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden border border-white/10">
          <img
            src={url.trim()}
            alt={`Product image ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => removeImageFromList(url.trim())}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <X className="w-3 h-3" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-1 text-center truncate">
          {isBase64Img ? 'MongoDB' : isUrlImg ? 'URL' : 'Image'} {index + 1}
        </div>
      </div>
    );
  };

  // ========== RENDER ==========
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin — Products Management</h1>
          <p className="text-white/60">Create, edit, and manage your ICT products</p>

          {/* MongoDB Storage Notice */}
          <div className="mt-4 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <span className="text-green-400 text-sm font-bold">MONGODB</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-300">Images Stored in MongoDB</h3>
                <p className="text-white/70 text-sm mt-1">
                  • <strong>Images:</strong> Upload as Base64 (stored directly in database)
                  <br />
                  • <strong>Storage:</strong> 100% free with MongoDB Atlas
                  <br />
                  • <strong>Reliability:</strong> Images never disappear, available worldwide
                  <br />
                  • <strong>Max size:</strong> 500KB per image (auto-compressed)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg border ${message.type === 'error'
              ? 'bg-red-500/20 border-red-500'
              : 'bg-green-500/20 border-green-500'
            }`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                }`} />
              <div className="whitespace-pre-line">{message.text}</div>
            </div>
          </div>
        )}

        {/* Product Form */}
        <div className="mb-8 p-6 bg-[#0b0b0b] rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">
            {editing ? `Edit Product: ${editing}` : 'Create New Product'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Basic Info */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Product ID *</label>
              <input
                placeholder="e.g., lap-001"
                value={form.id}
                onChange={e => setForm({ ...form, id: e.target.value })}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
                disabled={editing !== null}
              />
              <p className="text-xs text-white/40 mt-1">Required, must be unique</p>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Category</label>
              <input
                placeholder="e.g., Laptops, Tablets, Printers"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Title *</label>
              <input
                placeholder="Product title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Price (KSh) *</label>
              <input
                type="number"
                placeholder="0"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Short Description</label>
              <input
                placeholder="Brief product description"
                value={form.short}
                onChange={e => setForm({ ...form, short: e.target.value })}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>

            {/* ========== IMAGE UPLOAD SECTION ========== */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm text-white/60">Product Images</label>
                <span className="text-xs bg-green-500 text-black px-2 py-0.5 rounded-full">MONGODB</span>
              </div>

              {/* Image Upload Button */}
              <div className="mb-4">
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg cursor-pointer transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  Upload to MongoDB
                </label>
                <p className="text-xs text-white/40 mt-2">
                  JPG, PNG, WebP • Max 5MB per file • Auto-compressed to ~300KB • Stored directly in database
                </p>
              </div>

              {/* Upload Progress */}
              {uploadingFiles.filter(f => f.type === 'image').length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white/60 mb-2">
                    Processing Images ({uploadingFiles.filter(f => f.type === 'image').length})
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {uploadingFiles.filter(f => f.type === 'image').map((file, index) => (
                      <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20">
                        <img
                          src={file.preview}
                          alt="Uploading"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          {file.uploading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : file.error ? (
                            <div className="text-center p-2">
                              <X className="w-6 h-6 text-red-500 mx-auto mb-1" />
                              <p className="text-xs text-red-400">Failed</p>
                            </div>
                          ) : (
                            <div className="text-center p-2">
                              <div className="w-6 h-6 mx-auto mb-1">
                                <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-xs text-green-400">In MongoDB</p>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUploadingFile(
                            uploadingFiles.findIndex(f => f.file === file.file)
                          )}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Images */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm text-white/60">
                    Images ({form.images ? form.images.split(',').filter(Boolean).length : 0})
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        // Add a URL manually
                        const url = prompt('Enter image URL:');
                        if (url) {
                          const currentImages = form.images ? form.images.split(',').filter(Boolean) : [];
                          const updatedImages = [...currentImages, url];
                          setForm(prev => ({ ...prev, images: updatedImages.join(', ') }));
                        }
                      }}
                      className="text-xs px-2 py-1 bg-blue-900/50 hover:bg-blue-900/70 rounded"
                    >
                      Add URL
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Clear all images
                        if (confirm('Remove all images?')) {
                          setForm(prev => ({ ...prev, images: '' }));
                        }
                      }}
                      className="text-xs px-2 py-1 bg-red-900/50 hover:bg-red-900/70 rounded"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                
                <textarea
                  placeholder="Base64 images appear here after upload, or paste URLs manually (comma separated)"
                  value={form.images}
                  onChange={e => setForm({ ...form, images: e.target.value })}
                  rows={3}
                  className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none font-mono text-xs"
                />
                
                {/* Image Previews */}
                {form.images && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-3">
                      {form.images.split(',').map((url, index) => (
                        url.trim() && renderImagePreview(url.trim(), index)
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ========== VIDEO SECTION ========== */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm text-white/60">Product Videos</label>
                <span className="text-xs bg-purple-500 text-black px-2 py-0.5 rounded-full">YOUTUBE/VIMEO</span>
              </div>

              {/* Video Input Mode Selector */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setVideoInputMode('url')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${videoInputMode === 'url'
                      ? 'bg-blue-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                  <Globe className="w-4 h-4" />
                  Add Video URL (Recommended)
                </button>
                <button
                  type="button"
                  onClick={() => setVideoInputMode('upload')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${videoInputMode === 'upload'
                      ? 'bg-purple-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload to MongoDB
                </button>
              </div>

              {/* Video URL Input */}
              {videoInputMode === 'url' && (
                <div className="mb-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      placeholder="Paste YouTube or Vimeo URL (e.g., https://youtube.com/watch?v=...)"
                      className="flex-1 p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
                    />
                    <button
                      onClick={handleAddVideoUrl}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Add Video
                    </button>
                  </div>
                  <p className="text-xs text-white/40">
                    Supports: YouTube (watch/embed URLs), Vimeo. We'll convert to embed format automatically.
                    <br />
                    <span className="text-green-400">✓ Recommended for production - videos load faster</span>
                  </p>
                  <div className="mt-2 flex gap-3">
                    <a
                      href="https://www.youtube.com/upload"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-red-400 hover:text-red-300 underline flex items-center gap-1"
                    >
                      <Youtube className="w-4 h-4" />
                      Upload to YouTube (Free)
                    </a>
                    <span className="text-white/40">•</span>
                    <a
                      href="https://vimeo.com/upload"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                    >
                      <Video className="w-4 h-4" />
                      Upload to Vimeo (Free Tier)
                    </a>
                  </div>
                </div>
              )}

              {/* Video Upload to MongoDB */}
              {videoInputMode === 'upload' && (
                <div className="mb-4">
                  <input
                    type="file"
                    ref={videoInputRef}
                    onChange={handleVideoUpload}
                    accept="video/*"
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg cursor-pointer transition-colors mb-2"
                  >
                    <Video className="w-4 h-4" />
                    Upload Video to MongoDB
                  </label>
                  <p className="text-xs text-white/40">
                    MP4, MOV • Max 50MB • Stored as Base64 in MongoDB
                    <br />
                    <span className="text-yellow-400">⚠️ Not recommended for large videos - use YouTube/Vimeo links for better performance.</span>
                  </p>
                </div>
              )}

              {/* Video Upload Progress */}
              {uploadingFiles.filter(f => f.type === 'video').length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white/60 mb-2">
                    Processing Videos
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {uploadingFiles.filter(f => f.type === 'video').map((file, index) => (
                      <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20">
                        <div className="w-full h-full bg-purple-900/50 flex items-center justify-center">
                          <FileVideo className="w-8 h-8 text-purple-300" />
                        </div>
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          {file.uploading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : file.error ? (
                            <div className="text-center p-2">
                              <X className="w-6 h-6 text-red-500 mx-auto mb-1" />
                              <p className="text-xs text-red-400">Failed</p>
                            </div>
                          ) : (
                            <div className="text-center p-2">
                              <div className="w-6 h-6 mx-auto mb-1">
                                <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-xs text-green-400">In MongoDB</p>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUploadingFile(
                            uploadingFiles.findIndex(f => f.file === file.file)
                          )}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Videos */}
              <div className="mb-4">
                <label className="block text-sm text-white/60 mb-2">
                  Video URLs ({form.videos ? form.videos.split(',').filter(Boolean).length : 0})
                </label>
                <textarea
                  placeholder="Video URLs (YouTube/Vimeo embed links or MongoDB Base64)"
                  value={form.videos}
                  onChange={e => setForm({ ...form, videos: e.target.value })}
                  rows={2}
                  className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none font-mono text-xs"
                />

                {/* Video Previews */}
                {form.videos && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-3">
                      {form.videos.split(',').map((url, index) => (
                        url.trim() && (
                          <div key={index} className="relative group">
                            <div className="w-40 h-24 bg-gray-800 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
                              {url.includes('youtube.com') || url.includes('youtu.be') ? (
                                <div className="text-center p-2">
                                  <Youtube className="w-8 h-8 text-red-500 mx-auto mb-1" />
                                  <p className="text-xs text-white/60">YouTube</p>
                                  <p className="text-xs text-white/40 truncate max-w-[120px]">
                                    {url.replace('https://www.youtube.com/embed/', '').substring(0, 10)}...
                                  </p>
                                </div>
                              ) : url.includes('vimeo.com') ? (
                                <div className="text-center p-2">
                                  <Video className="w-8 h-8 text-blue-500 mx-auto mb-1" />
                                  <p className="text-xs text-white/60">Vimeo</p>
                                </div>
                              ) : url.startsWith('data:video/') ? (
                                <div className="text-center p-2">
                                  <FileVideo className="w-8 h-8 text-purple-500 mx-auto mb-1" />
                                  <p className="text-xs text-white/60">MongoDB</p>
                                  <p className="text-xs text-white/40">
                                    {Math.round(url.length * 0.75 / 1024)}KB
                                  </p>
                                </div>
                              ) : (
                                <video
                                  src={url.trim()}
                                  className="max-h-full max-w-full"
                                  controls
                                />
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeVideoFromList(url.trim())}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-1 text-center truncate">
                              {url.includes('youtube.com') ? 'YouTube' :
                                url.includes('vimeo.com') ? 'Vimeo' :
                                url.startsWith('data:video/') ? 'MongoDB' : 'Video'} {index + 1}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Other Fields */}
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Features (comma separated)</label>
              <input
                placeholder="Intel Core i3, 8GB RAM, 256GB SSD"
                value={form.features}
                onChange={e => setForm({ ...form, features: e.target.value })}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Full Description</label>
              <textarea
                placeholder="Detailed product description..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>


            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-white/60">Specifications (JSON format)</label>
                <button
                  type="button"
                  onClick={() => {
                    // Insert example JSON
                    const example = {
                      processor: "Intel Core i5",
                      ram: "8GB DDR4",
                      storage: "512GB SSD",
                      display: "14\" FHD",
                      battery: "Up to 10 hours",
                      ports: "2x USB 3.0, 1x USB-C, HDMI",
                      warranty: "1 year"
                    };
                    setForm({ ...form, specs: JSON.stringify(example, null, 2) });
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 underline"
                >
                  Insert Example
                </button>
              </div>

              <textarea
                placeholder={`Example format:
                      {
                        "processor": "Intel Core i5",
                        "ram": "8GB DDR4", 
                        "storage": "512GB SSD",
                        "display": "14\\" FHD",
                        "ports": "2x USB 3.0, 1x USB-C"
                      }`}
                value={form.specs}
                onChange={e => setForm({ ...form, specs: e.target.value })}
                rows={6}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none font-mono text-sm"
              />

              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-white/40">
                  Must be valid JSON. Use double quotes for keys and values.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      JSON.parse(form.specs || '{}');
                      showMessage('✓ JSON is valid!', 'success');
                    } catch (error) {
                      showMessage('✗ Invalid JSON: ' + (error as Error).message, 'error');
                    }
                  }}
                  className="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
                >
                  Validate JSON
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            {editing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Product
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10"
                >
                  Cancel Edit
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Product
              </button>
            )}
            <button
              onClick={resetForm}
              className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10"
            >
              Reset Form
            </button>
            <button
              onClick={handleSeed}
              className="px-6 py-3 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/10"
            >
              Seed Sample Data
            </button>
          </div>
        </div>

        {/* Products List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Products ({products.length})</h2>
            <div className="flex gap-2">
              <button
                onClick={fetchProducts}
                className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-white/60" />
              <p className="text-white/60">Loading products...</p>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-12 border border-white/10 rounded-lg">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-white/60 mb-4">Create your first product or seed sample data</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 bg-[var(--color-accent)] text-black rounded-lg"
              >
                Create Product
              </button>
            </div>
          )}

          <div className="grid gap-4">
            {products.map(p => (
              <div key={p.id} className="p-4 bg-[#0b0b0b] rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{p.title}</h3>
                      <span className="px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs rounded-full">
                        {p.category || 'Uncategorized'}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-3">{p.short}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-[var(--color-accent)] font-semibold">
                        KSh {p.price.toLocaleString()}
                      </span>
                      <span className="text-white/40">ID: {p.id}</span>
                      <span className="text-white/40 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        {p.images?.length || 0} images
                        {p.images?.some(img => isBase64(img)) && (
                          <span className="text-green-400 text-xs">(MongoDB)</span>
                        )}
                      </span>
                      <span className="text-white/40 flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {p.videos?.length || 0} videos
                      </span>
                      {p.createdAt && (
                        <span className="text-white/40">
                          Added: {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="px-4 py-2 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Image Thumbnails in Product Card */}
                {p.images && p.images.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {p.images.slice(0, 5).map((img, index) => (
                        <div key={index} className="w-16 h-16 flex-shrink-0 rounded overflow-hidden border border-white/10">
                          <img
                            src={img}
                            alt={`${p.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
                            }}
                          />
                          {isBase64(img) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-green-900/80 text-[8px] p-0.5 text-center text-green-300">
                              MongoDB
                            </div>
                          )}
                        </div>
                      ))}
                      {p.images.length > 5 && (
                        <div className="w-16 h-16 flex-shrink-0 rounded border border-dashed border-white/20 flex items-center justify-center text-white/40">
                          +{p.images.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}