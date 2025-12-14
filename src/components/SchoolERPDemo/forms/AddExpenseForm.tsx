"use client";
import React, { useState } from 'react';

export default function AddExpenseForm({ onAdd }: { onAdd: (desc: string, amount: number) => void }){
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState(0);
  return (
    <div>
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="w-full mb-2 p-2 bg-black/20 rounded" />
      <input type="number" value={amt} onChange={(e) => setAmt(Number(e.target.value))} className="w-full mb-2 p-2 bg-black/20 rounded" />
      <button onClick={() => { if (desc) { onAdd(desc, amt); setDesc(""); setAmt(0); } }} className="w-full px-3 py-2 bg-[var(--color-accent)] text-black rounded">Add Expense</button>
    </div>
  );
}
