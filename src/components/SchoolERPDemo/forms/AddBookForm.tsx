"use client";
import React, { useState } from 'react';

export default function AddBookForm({ onAdd }: { onAdd: (title: string, author: string, qty: number) => void }){
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [qty, setQty] = useState(1);
  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 p-2 bg-black/20 rounded" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full mb-2 p-2 bg-black/20 rounded" />
      <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-full mb-2 p-2 bg-black/20 rounded" />
      <button onClick={() => { if (title) { onAdd(title, author, qty); setTitle(""); setAuthor(""); setQty(1); } }} className="w-full px-3 py-2 bg-[var(--color-accent)] text-black rounded">Add Book</button>
    </div>
  );
}
