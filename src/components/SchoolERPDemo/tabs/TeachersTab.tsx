"use client";
import React from 'react';

export default function TeachersTab({ teachers = [] }: { teachers?: any[] }){
  return (
    <div>
      <h3 className="font-bold mb-3">Teachers</h3>
      <div className="max-h-96 overflow-auto">
        {teachers.map((t:any) => <div key={t.id} className="p-2 border-b border-white/6"><div className="font-semibold">{t.name}</div><div className="text-sm text-gray-400">{t.subject}</div></div>)}
      </div>
    </div>
  );
}
