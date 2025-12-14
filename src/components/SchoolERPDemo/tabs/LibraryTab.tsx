"use client";
import React from 'react';

export default function LibraryTab({ books = [], issues = [], students = [], onIssue, onReturn }: { books?: any[]; issues?: any[]; students?: any[]; onIssue?: (b:string,s:string)=>void; onReturn?: (id:string)=>void }){
  return (
    <div>
      <h3 className="font-bold mb-3">Library</h3>
      <div className="max-h-96 overflow-auto">
        {books.map(b => (
          <div key={b.id} className="p-2 border-b border-white/6 flex items-center justify-between">
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm text-gray-400">{b.author} • {b.qty} copies</div>
            </div>
            <div>
              <select onChange={(e) => { const sid = e.target.value; if (sid) onIssue?.(b.id, sid); }} className="bg-black/20 text-sm p-1 rounded">
                <option value="">Issue to...</option>
                {students.map((s:any) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
