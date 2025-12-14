"use client";
import React from 'react';

export default function FeesTab({ invoices = [], onRecord }: { invoices?: any[]; onRecord?: (sid:string, amt:number, invId?:string)=>void }){
  return (
    <div>
      <h3 className="font-bold mb-3">Fees / Invoices</h3>
      <div className="max-h-96 overflow-auto">
        {invoices.map(inv => (
          <div key={inv.id} className="p-2 border-b border-white/6 flex items-center justify-between">
            <div>
              <div className="font-semibold">Invoice {inv.id}</div>
              <div className="text-sm text-gray-400">Amount: KES {inv.amount}</div>
            </div>
            <div>
              <button onClick={() => onRecord?.(inv.studentId, 5000, inv.id)} className="px-3 py-1 bg-[var(--color-accent)] text-black rounded text-sm">Receive KES 5,000</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
