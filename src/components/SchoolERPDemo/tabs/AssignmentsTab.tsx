"use client";
import React from 'react';

export default function AssignmentsTab({ assignments = [] }: { assignments?: any[] }){
  return (
    <div>
      <h3 className="font-bold mb-3">Assignments</h3>
      <div className="max-h-96 overflow-auto">
        {assignments.map(a => (<div key={a.id} className="p-2 border-b border-white/6"><div className="font-semibold">{a.title}</div><div className="text-sm text-gray-400">{a.klass} • {a.subject}</div></div>))}
      </div>
    </div>
  );
}
