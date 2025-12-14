"use client";
import React, { useState } from 'react';

export default function AddStudentForm({ classes, onAdd }: { classes: string[]; onAdd: (p: { name: string; klass: string; roll?: number }) => void }) {
  const [name, setName] = useState("");
  const [klass, setKlass] = useState(classes[0] ?? "Form 1");
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full mb-2 p-2 bg-black/20 rounded" />
      <select value={klass} onChange={(e) => setKlass(e.target.value)} className="w-full mb-2 p-2 bg-black/20 rounded">{classes.length ? classes.map(c => <option key={c} value={c}>{c}</option>) : <option>Form 1</option>}</select>
      <button onClick={() => { if (name) { onAdd({ name, klass }); setName(""); } }} className="w-full px-3 py-2 bg-[var(--color-accent)] text-black rounded">Add Student</button>
    </div>
  );
}
