"use client";
import React, { useState, useEffect } from 'react';
import type { Student } from '../types';

export default function CreateInvoiceForm({ students, onCreate }: { students: Student[]; onCreate: (sid: string, amt: number) => void }){
  const [sid, setSid] = useState(students[0]?.id ?? "");
  const [amt, setAmt] = useState(20000);
  useEffect(() => { if (!sid && students[0]) setSid(students[0].id); }, [students]);
  return (
    <div>
      <select value={sid} onChange={(e) => setSid(e.target.value)} className="w-full mb-2 p-2 bg-black/20 rounded"><option value="">Select student</option>{students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
      <input type="number" value={amt} onChange={(e) => setAmt(Number(e.target.value))} className="w-full mb-2 p-2 bg-black/20 rounded" />
      <button onClick={() => { if (sid) onCreate(sid, amt); }} className="w-full px-3 py-2 bg-[var(--color-accent)] text-black rounded">Create Invoice</button>
    </div>
  );
}
