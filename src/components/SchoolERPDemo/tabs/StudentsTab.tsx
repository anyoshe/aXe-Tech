"use client";
import React from 'react';

export default function StudentsTab({ students = [], onView }: { students?: any[]; onView?: (id: string)=>void }){
  return (
    <div>
      <h3 className="font-bold mb-3">Students</h3>
      <div className="max-h-96 overflow-auto">
        {students.map((s: any) => (
          <div key={s.id} className="flex items-center justify-between p-2 border-b border-white/6">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-400">{s.klass} • Roll {s.roll}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-[var(--color-accent)] text-black rounded text-sm" onClick={() => onView?.(s.id)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
