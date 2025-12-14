"use client";
import React, { useState } from 'react';

export default function AddTeacherForm({ onAdd }: { onAdd: (name: string, subject: string) => void }){
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full mb-2 p-2 bg-black/20 rounded" />
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full mb-2 p-2 bg-black/20 rounded" />
      <button onClick={() => { if (name && subject) { onAdd(name, subject); setName(""); setSubject(""); } }} className="w-full px-3 py-2 bg-[var(--color-accent)] text-black rounded">Add Teacher</button>
    </div>
  );
}
