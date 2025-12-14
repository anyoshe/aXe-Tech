"use client";
import React from 'react';

export default function AccountingTab({ accounting = {} as any }: { accounting?: any }){
  return (
    <div>
      <h3 className="font-bold mb-3">Accounting</h3>
      <div className="space-y-2">
        <div>Total Assigned: KES {Number(accounting?.totalAssigned ?? 0).toLocaleString()}</div>
        <div>Total Collected: KES {Number(accounting?.totalCollected ?? 0).toLocaleString()}</div>
        <div>Total Expenses: KES {Number(accounting?.totalExpenses ?? 0).toLocaleString()}</div>
        <div>Profit: KES {Number(accounting?.profit ?? 0).toLocaleString()}</div>
      </div>
    </div>
  );
}
