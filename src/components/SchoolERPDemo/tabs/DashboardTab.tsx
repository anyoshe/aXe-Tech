"use client";
import React from 'react';

export default function DashboardTab({ students = [], teachers = [], accounting = {} as any }: { students?: any[]; teachers?: any[]; accounting?: any }){
  return (
    <div>
      <h3 className="font-bold mb-3">Dashboard</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 rounded">Students: {students.length}</div>
        <div className="p-4 bg-white/5 rounded">Teachers: {teachers.length}</div>
        <div className="p-4 bg-white/5 rounded">Outstanding: KES {Number(accounting?.outstanding ?? 0).toLocaleString()}</div>
      </div>
    </div>
  );
}
