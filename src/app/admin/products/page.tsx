"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  images?: string[];
  short?: string;
  description?: string;
  features?: string[];
  videos?: string[];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: "", title: "", price: "", category: "", images: "", videos: "", features: "", short: "", description: "" });
  const [editing, setEditing] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/products');
      const data = await r.json();
      setProducts(data || []);
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const resetForm = () => setForm({ id: "", title: "", price: "", category: "", images: "", videos: "", features: "", short: "", description: "" });

  const handleCreate = async () => {
    const payload = {
      id: form.id || `prod-${Date.now()}`,
      title: form.title,
      price: Number(form.price) || 0,
      category: form.category,
      images: form.images ? form.images.split(',').map(s=>s.trim()) : [],
      videos: form.videos ? form.videos.split(',').map(s=>s.trim()) : [],
      features: form.features ? form.features.split(',').map(s=>s.trim()) : [],
      short: form.short,
      description: form.description,
    };
    const r = await fetch('/api/products', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
    if (r.ok) {
      resetForm();
      fetchProducts();
    } else {
      alert('Error creating product');
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const payload = {
      title: form.title,
      price: Number(form.price) || 0,
      category: form.category,
      images: form.images ? form.images.split(',').map(s=>s.trim()) : [],
      videos: form.videos ? form.videos.split(',').map(s=>s.trim()) : [],
      features: form.features ? form.features.split(',').map(s=>s.trim()) : [],
      short: form.short,
      description: form.description,
    };
    const r = await fetch(`/api/products/${editing}`, { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
    if (r.ok) {
      setEditing(null);
      resetForm();
      fetchProducts();
    } else {
      alert('Error updating product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete product?')) return;
    const r = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (r.ok) fetchProducts(); else alert('Delete failed');
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
      description: p.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSeed = async () => {
    if (!confirm('Seed products from sample data? (dev only)')) return;
    const r = await fetch('/api/products/seed', { method: 'POST' });
    if (r.ok) fetchProducts(); else alert('Seed failed');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Products</h1>

      <div className="mb-6 p-4 bg-[#0b0b0b] rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="ID (optional)" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} className="p-2 bg-[#111]" />
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="p-2 bg-[#111]" />
          <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="p-2 bg-[#111]" />
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="p-2 bg-[#111]" />
          <input placeholder="Images (comma separated)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
          <input placeholder="Videos (comma separated, YouTube or file URLs)" value={form.videos} onChange={e=>setForm({...form,videos:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
          <input placeholder="Features (comma separated)" value={form.features} onChange={e=>setForm({...form,features:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
          <input placeholder="Short" value={form.short} onChange={e=>setForm({...form,short:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="p-2 bg-[#111] md:col-span-2" />
        </div>

        <div className="mt-3 flex gap-2">
          {editing ? (
            <>
              <button onClick={handleUpdate} className="px-4 py-2 bg-[var(--color-accent)]">Update</button>
              <button onClick={()=>{setEditing(null); resetForm();}} className="px-4 py-2 border">Cancel</button>
            </>
          ) : (
            <button onClick={handleCreate} className="px-4 py-2 bg-[var(--color-accent)]">Create</button>
          )}
          <button onClick={resetForm} className="px-4 py-2 border">Reset</button>
          <button onClick={handleSeed} className="px-4 py-2 border">Seed (dev)</button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Products</h2>
        {loading && <div>Loading…</div>}
        {!loading && products.length === 0 && <div>No products</div>}
        <div className="grid gap-3">
          {products.map(p => (
            <div key={p.id} className="p-3 bg-[#0b0b0b] rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title} <span className="text-xs text-white/60">({p.id})</span></div>
                <div className="text-sm text-white/60">{p.category} — KSh {p.price.toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>handleEditClick(p)} className="px-3 py-1 border">Edit</button>
                <button onClick={()=>handleDelete(p.id)} className="px-3 py-1 border text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
