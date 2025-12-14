"use client";
import React, { useState } from 'react';
import type { Subject } from '../types';

export default function CreateAssignmentForm({ classes, subjects, onCreate }: { classes: string[]; subjects: Subject[]; onCreate: (t: string, k: string, s: string, d?: string) => void }){
  const [title, setTitle] = useState("");
  const [klass, setKlass] = useState(classes[0] ?? "Form 1");
  const [subject, setSubject] = useState(subjects[0]?.name ?? "");
  const [due, setDue] = useState("");
  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 p-2 bg-black/20 rounded" />
      <select value={klass} onChange={(e) => setKlass(e.target.value)} className="w-full mb-2 p-2 bg-black/20 rounded">{classes.map(c => <option key={c}>{c}</option>)}</select>
      <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full mb-2 p-2 bg-black/20 rounded">{subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}</select>
      <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="w-full mb-2 p-2 bg-black/20 rounded" />
      <button onClick={() => { if (title) { onCreate(title, klass, subject, due || undefined); setTitle(""); } }} className="w-full px-3 py-2 bg-[var(--color-accent)] text-black rounded">Create</button>
    </div>
  );
}
