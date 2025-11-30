// "use client";

// import { useEffect, useState } from "react";

// type Product = {
//   id: string;
//   title: string;
//   price: number;
//   category?: string;
//   images?: string[];
//   short?: string;
//   description?: string;
//   features?: string[];
//   videos?: string[];
// };

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({ id: "", title: "", price: "", category: "", images: "", videos: "", features: "", short: "", description: "" });
//   const [editing, setEditing] = useState<string | null>(null);

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

//   useEffect(() => { fetchProducts(); }, []);

//   const resetForm = () => setForm({ id: "", title: "", price: "", category: "", images: "", videos: "", features: "", short: "", description: "" });

//   const handleCreate = async () => {
//     const payload = {
//       id: form.id || `prod-${Date.now()}`,
//       title: form.title,
//       price: Number(form.price) || 0,
//       category: form.category,
//       images: form.images ? form.images.split(',').map(s=>s.trim()) : [],
//       videos: form.videos ? form.videos.split(',').map(s=>s.trim()) : [],
//       features: form.features ? form.features.split(',').map(s=>s.trim()) : [],
//       short: form.short,
//       description: form.description,
//     };
//     const r = await fetch('/api/products', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
//     if (r.ok) {
//       resetForm();
//       fetchProducts();
//     } else {
//       alert('Error creating product');
//     }
//   };

//   const handleUpdate = async () => {
//     if (!editing) return;
//     const payload = {
//       title: form.title,
//       price: Number(form.price) || 0,
//       category: form.category,
//       images: form.images ? form.images.split(',').map(s=>s.trim()) : [],
//       videos: form.videos ? form.videos.split(',').map(s=>s.trim()) : [],
//       features: form.features ? form.features.split(',').map(s=>s.trim()) : [],
//       short: form.short,
//       description: form.description,
//     };
//     const r = await fetch(`/api/products/${editing}`, { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
//     if (r.ok) {
//       setEditing(null);
//       resetForm();
//       fetchProducts();
//     } else {
//       alert('Error updating product');
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Delete product?')) return;
//     const r = await fetch(`/api/products/${id}`, { method: 'DELETE' });
//     if (r.ok) fetchProducts(); else alert('Delete failed');
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
//       description: p.description || ''
//     });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleSeed = async () => {
//     if (!confirm('Seed products from sample data? (dev only)')) return;
//     const r = await fetch('/api/products/seed', { method: 'POST' });
//     if (r.ok) fetchProducts(); else alert('Seed failed');
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin — Products</h1>

//       <div className="mb-6 p-4 bg-[#0b0b0b] rounded">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <input placeholder="ID (optional)" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} className="p-2 bg-[#111]" />
//           <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="p-2 bg-[#111]" />
//           <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="p-2 bg-[#111]" />
//           <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="p-2 bg-[#111]" />
//           <input placeholder="Images (comma separated)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
//           <input placeholder="Videos (comma separated, YouTube or file URLs)" value={form.videos} onChange={e=>setForm({...form,videos:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
//           <input placeholder="Features (comma separated)" value={form.features} onChange={e=>setForm({...form,features:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
//           <input placeholder="Short" value={form.short} onChange={e=>setForm({...form,short:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
//           <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
//         </div>

//         <div className="mt-3 flex gap-2">
//           {editing ? (
//             <>
//               <button onClick={handleUpdate} className="px-4 py-2 bg-[var(--color-accent)]">Update</button>
//               <button onClick={()=>{setEditing(null); resetForm();}} className="px-4 py-2 border">Cancel</button>
//             </>
//           ) : (
//             <button onClick={handleCreate} className="px-4 py-2 bg-[var(--color-accent)]">Create</button>
//           )}
//           <button onClick={resetForm} className="px-4 py-2 border">Reset</button>
//           <button onClick={handleSeed} className="px-4 py-2 border">Seed (dev)</button>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold mb-2">Products</h2>
//         {loading && <div>Loading…</div>}
//         {!loading && products.length === 0 && <div>No products</div>}
//         <div className="grid gap-3">
//           {products.map(p => (
//             <div key={p.id} className="p-3 bg-[#0b0b0b] rounded flex items-center justify-between">
//               <div>
//                 <div className="font-medium">{p.title} <span className="text-xs text-white/60">({p.id})</span></div>
//                 <div className="text-sm text-white/60">{p.category} — KSh {p.price.toLocaleString()}</div>
//               </div>
//               <div className="flex gap-2">
//                 <button onClick={()=>handleEditClick(p)} className="px-3 py-1 border">Edit</button>
//                 <button onClick={()=>handleDelete(p.id)} className="px-3 py-1 border text-red-400">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
    specs: "" 
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

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
      specs: "" 
    });
    setEditing(null);
    setMessage("");
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCreate = async () => {
    if (!form.title || !form.price) {
      showMessage("Title and price are required");
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
        showMessage('Product created successfully!');
        resetForm();
        fetchProducts();
      } else {
        showMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      showMessage('Error creating product');
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
        showMessage('Product updated successfully!');
        resetForm();
        fetchProducts();
      } else {
        showMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      showMessage('Error updating product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const r = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const result = await r.json();
      
      if (r.ok) {
        showMessage('Product deleted successfully!');
        fetchProducts();
      } else {
        showMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      showMessage('Error deleting product');
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
        showMessage(`Seeded products successfully!`);
        fetchProducts();
      } else {
        showMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      showMessage('Error seeding products');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin — Products Management</h1>
          <p className="text-white/60">Create, edit, and manage your ICT products</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg ${
            message.includes('Error') ? 'bg-red-500/20 border border-red-500' : 'bg-green-500/20 border border-green-500'
          }`}>
            {message}
          </div>
        )}

        {/* Product Form */}
        <div className="mb-8 p-6 bg-[#0b0b0b] rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">
            {editing ? `Edit Product: ${editing}` : 'Create New Product'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Product ID *</label>
              <input 
                placeholder="e.g., lap-001" 
                value={form.id} 
                onChange={e => setForm({...form, id: e.target.value})} 
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
                onChange={e => setForm({...form, category: e.target.value})} 
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Title *</label>
              <input 
                placeholder="Product title" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/60 mb-2">Price (KSh) *</label>
              <input 
                type="number"
                placeholder="0" 
                value={form.price} 
                onChange={e => setForm({...form, price: e.target.value})} 
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/60 mb-2">Short Description</label>
              <input 
                placeholder="Brief product description" 
                value={form.short} 
                onChange={e => setForm({...form, short: e.target.value})} 
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Images (comma separated URLs)</label>
              <input 
                placeholder="/samples/laptop1.jpg, /samples/laptop2.jpg" 
                value={form.images} 
                onChange={e => setForm({...form, images: e.target.value})} 
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
              <p className="text-xs text-white/40 mt-1">Use absolute paths or full URLs</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Videos (comma separated YouTube or file URLs)</label>
              <input 
                placeholder="https://youtube.com/embed/..., /videos/demo.mp4" 
                value={form.videos} 
                onChange={e => setForm({...form, videos: e.target.value})} 
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Features (comma separated)</label>
              <input 
                placeholder="Intel Core i3, 8GB RAM, 256GB SSD" 
                value={form.features} 
                onChange={e => setForm({...form, features: e.target.value})} 
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Full Description</label>
              <textarea 
                placeholder="Detailed product description..." 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                rows={3}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-2">Specifications (JSON format)</label>
              <textarea 
                placeholder='{"processor": "Intel i5", "ram": "8GB", "storage": "512GB SSD"}' 
                value={form.specs} 
                onChange={e => setForm({...form, specs: e.target.value})} 
                rows={3}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-lg focus:border-[var(--color-accent)] outline-none font-mono text-sm"
              />
              <p className="text-xs text-white/40 mt-1">Must be valid JSON format</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {editing ? (
              <>
                <button onClick={handleUpdate} className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90">
                  Update Product
                </button>
                <button onClick={resetForm} className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10">
                  Cancel Edit
                </button>
              </>
            ) : (
              <button onClick={handleCreate} className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90">
                Create Product
              </button>
            )}
            <button onClick={resetForm} className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10">
              Reset Form
            </button>
            <button onClick={handleSeed} className="px-6 py-3 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/10">
              Seed Sample Data
            </button>
          </div>
        </div>

        {/* Products List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Products ({products.length})</h2>
            <div className="flex gap-2">
              <button onClick={fetchProducts} className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10">
                Refresh
              </button>
            </div>
          </div>
          
          {loading && (
            <div className="text-center py-8 text-white/60">Loading products...</div>
          )}
          
          {!loading && products.length === 0 && (
            <div className="text-center py-8 text-white/60 border border-white/10 rounded-lg">
              No products found. Create your first product or seed sample data.
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
                    <p className="text-white/60 text-sm mb-2">{p.short}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-[var(--color-accent)] font-semibold">
                        KSh {p.price.toLocaleString()}
                      </span>
                      <span className="text-white/40">ID: {p.id}</span>
                      <span className="text-white/40">
                        {p.images?.length || 0} images, {p.features?.length || 0} features
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}