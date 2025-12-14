"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import SignOutButton from "@/components/SignOutButton";
import AddStudentForm from "./forms/AddStudentForm";
import AddTeacherForm from "./forms/AddTeacherForm";
import CreateInvoiceForm from "./forms/CreateInvoiceForm";
import AddBookForm from "./forms/AddBookForm";
import CreateAssignmentForm from "./forms/CreateAssignmentForm";
import AddExpenseForm from "./forms/AddExpenseForm";
import DashboardTab from './tabs/DashboardTab';
import StudentsTab from './tabs/StudentsTab';
import TeachersTab from './tabs/TeachersTab';
import FeesTab from './tabs/FeesTab';
import LibraryTab from './tabs/LibraryTab';
import AssignmentsTab from './tabs/AssignmentsTab';
import AccountingTab from './tabs/AccountingTab';
import { id as genId, randName } from "./utils";
// Note: README.md removed from imports because Next/Turbopack treats unknown extensions as modules.
// Keep documentation files out of JS imports. See project README for notes.
import type { Student, Teacher, Subject, ExamResult, Book, Issue, Invoice, Expense, Assignment } from "./types";

export default function SchoolERPDemo() {
  const [schoolName, setSchoolName] = useState("GetAxe Demo Academy");
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [role, setRole] = useState<"admin" | "teacher" | "bursar">("admin");
  const [activeTab, setActiveTab] = useState<"dashboard" | "students" | "teachers" | "fees" | "library" | "assignments" | "accounting">("dashboard");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<'success' | 'error' | null>(null);
  const [demoCredentials, setDemoCredentials] = useState<{ email: string; password: string } | null>(null);

  const { data: session } = useSession();
  const [schoolId, setSchoolId] = useState<string>(typeof window !== 'undefined' ? ((session?.user as any)?.schoolId ?? "demo-school") : "demo-school");

  // keep schoolId in sync if session becomes available/changes
  useEffect(() => {
    const sId = (session?.user as any)?.schoolId;
    if (sId && sId !== schoolId) setSchoolId(sId);
  }, [session]);

  async function fetchStudentsForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/students?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("failed to fetch students");
      const data = await res.json();
      const mapped = (data || []).map((s: any, i: number) => ({ id: s._id ?? s.id ?? `s_${i}`, name: s.name, klass: s.klass ?? s.klass, roll: s.roll ?? (i + 1), feesDue: s.feesDue ?? 0, payments: s.payments ?? [] }));
      setStudents(mapped);
      return mapped as Student[];
    } catch (err) {
      console.error("fetch students error", err);
      return [] as Student[];
    }
  }

  // fetch helpers for other resources
  async function fetchTeachersForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/teachers?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('failed to fetch teachers');
      const data = await res.json();
      setTeachers((data || []).map((t: any) => ({ id: t._id ?? t.id, name: t.name, subject: t.subject })));
    } catch (err) {
      console.error('fetch teachers error', err);
    }
  }

  async function fetchBooksForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/books?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('failed to fetch books');
      const data = await res.json();
      setBooks((data || []).map((b: any) => ({ id: b._id ?? b.id, title: b.title, author: b.author, qty: b.qty ?? 0 })));
    } catch (err) {
      console.error('fetch books error', err);
    }
  }

  async function fetchIssuesForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/issues?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('failed to fetch issues');
      const data = await res.json();
      setIssues((data || []).map((it: any) => ({ id: it._id ?? it.id, bookId: it.bookId, studentId: it.studentId, issuedAt: it.issuedAt, returnedAt: it.returnedAt })));
    } catch (err) {
      console.error('fetch issues error', err);
    }
  }

  async function fetchInvoicesForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/invoices?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('failed to fetch invoices');
      const data = await res.json();
      setInvoices((data || []).map((inv: any) => ({ id: inv._id ?? inv.id, studentId: inv.studentId, amount: inv.amount, issuedAt: inv.issuedAt, paidAmount: inv.paidAmount ?? 0 })));
    } catch (err) {
      console.error('fetch invoices error', err);
    }
  }

  async function fetchAssignmentsForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/assignments?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('failed to fetch assignments');
      const data = await res.json();
      setAssignments((data || []).map((a: any) => ({ id: a._id ?? a.id, title: a.title, klass: a.klass, subject: a.subject, dueDate: a.dueDate })));
    } catch (err) {
      console.error('fetch assignments error', err);
    }
  }

  async function fetchExpensesForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/expenses?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('failed to fetch expenses');
      const data = await res.json();
      setExpenses((data || []).map((e: any) => ({ id: e._id ?? e.id, desc: e.desc, amount: e.amount, date: e.date })));
    } catch (err) {
      console.error('fetch expenses error', err);
    }
  }

  async function fetchSubjectsForSchool(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/subjects?schoolId=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('failed to fetch subjects');
      const data = await res.json();
      setSubjects((data || []).map((s: any) => ({ id: s._id ?? s.id, name: s.name })));
    } catch (err) {
      console.error('fetch subjects error', err);
    }
  }

  useEffect(() => {
      if (!session) return;
    const id = (session?.user as any)?.schoolId ?? schoolId;
    if (id) {
      fetchStudentsForSchool(id);
      fetchTeachersForSchool(id);
      fetchBooksForSchool(id);
      fetchIssuesForSchool(id);
      fetchInvoicesForSchool(id);
      fetchAssignmentsForSchool(id);
      fetchExpensesForSchool(id);
      fetchSubjectsForSchool(id);
    }
  }, [session, schoolId]);

  async function seedDemo(count = 40) {
    const id = (session?.user as any)?.schoolId ?? schoolId;
    if (!id) {
      alert('Please set a schoolId');
      return;
    }
    try {
      const res = await fetch(`/api/schools/${encodeURIComponent(id)}/seed`, { method: 'POST' });
      if (!res.ok) throw new Error('seed failed');
      const data = await res.json();
      const newStudents = await fetchStudentsForSchool(id);
      setActiveTab('dashboard');
      setSelectedStudent((prev) => prev ?? (newStudents?.[0]?.id ?? students[0]?.id ?? null));
      console.log('seed result', data);
      const demoEmail = `demo@${id}.example`;
      setDemoCredentials({ email: demoEmail, password: 'demo' });
      setAuthMessage(null);
      setAuthStatus(null);
      if (!session) {
        try {
          const signResult: any = await signIn('credentials', { redirect: false, email: demoEmail, password: 'demo' });
          if (signResult && signResult.error) {
            setAuthMessage(`Auto sign-in failed: ${signResult.error}`);
            setAuthStatus('error');
          } else {
            setAuthMessage('Signed in successfully as demo user');
            setAuthStatus('success');
          }
        } catch (siErr: any) {
          setAuthMessage(`Auto sign-in error: ${siErr?.message ?? String(siErr)}`);
          setAuthStatus('error');
          console.warn('auto sign-in failed', siErr);
        }
      }
    } catch (err) {
      console.error('seed error', err);
      alert('Seed failed — check server logs');
    }
  }

  function resetDemo() {
    setStudents([]);
    setTeachers([]);
    setSubjects([]);
    setClasses([]);
    setExamResults([]);
    setBooks([]);
    setIssues([]);
    setInvoices([]);
    setExpenses([]);
    setAssignments([]);
    setSelectedStudent(null);
  }

  async function addStudent(payload: { name: string; klass: string; roll?: number }) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/students', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ schoolId: idv, ...payload }) });
      if (!res.ok) throw new Error('create failed');
      const doc = await res.json();
      const newStudent: Student = { id: doc._id ?? doc.id ?? genId('s'), name: doc.name, klass: doc.klass ?? payload.klass, roll: doc.roll ?? payload.roll ?? (students.length + 1), feesDue: doc.feesDue ?? 20000, payments: doc.payments ?? [] };
      setStudents((p) => [newStudent, ...p]);
    } catch (err) {
      console.error('add student failed', err);
      const s: Student = { id: genId('s'), name: payload.name, klass: payload.klass, roll: payload.roll ?? (students.length + 1), feesDue: 20000, payments: [] };
      setStudents((p) => [s, ...p]);
    }
  }

  async function deleteStudent(studentId: string) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/students', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: studentId, schoolId: idv }) });
      if (!res.ok) throw new Error('delete failed');
      // update local state after successful delete
      setStudents((p) => p.filter((s) => s.id !== studentId));
      setInvoices((p) => p.filter((i) => i.studentId !== studentId));
      setIssues((p) => p.filter((it) => it.studentId !== studentId));
    } catch (err) {
      console.error('delete student failed', err);
      // fallback to local-only removal
      setStudents((p) => p.filter((s) => s.id !== studentId));
      setInvoices((p) => p.filter((i) => i.studentId !== studentId));
      setIssues((p) => p.filter((it) => it.studentId !== studentId));
    }
  }
  async function addTeacher(name: string, subject: string) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/teachers', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ schoolId: idv, name, subject }) });
      if (!res.ok) throw new Error('create teacher failed');
      const doc = await res.json();
      const t: Teacher = { id: doc._id ?? doc.id ?? genId('t'), name: doc.name, subject: doc.subject };
      setTeachers((p) => [t, ...p]);
    } catch (err) {
      console.error('add teacher failed', err);
      const t: Teacher = { id: genId('t'), name, subject };
      setTeachers((p) => [t, ...p]);
    }
  }

  async function createInvoice(studentId: string, amount: number) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/invoices', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ schoolId: idv, studentId, amount }) });
      if (!res.ok) throw new Error('create invoice failed');
      const doc = await res.json();
      const inv: Invoice = { id: doc._id ?? doc.id ?? genId('inv'), studentId: doc.studentId, amount: doc.amount, issuedAt: doc.issuedAt ?? new Date().toISOString(), paidAmount: doc.paidAmount ?? 0 };
      setInvoices((p) => [inv, ...p]);
      setStudents((p) => p.map((s) => (s.id === studentId ? { ...s, feesDue: s.feesDue + amount } : s)));
    } catch (err) {
      console.error('create invoice failed', err);
      const inv: Invoice = { id: genId('inv'), studentId, amount, issuedAt: new Date().toISOString(), paidAmount: 0 };
      setInvoices((p) => [inv, ...p]);
      setStudents((p) => p.map((s) => (s.id === studentId ? { ...s, feesDue: s.feesDue + amount } : s)));
    }
  }

  async function recordPayment(studentId: string, amount: number, invoiceId?: string) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      if (invoiceId) {
        // update invoice paidAmount on server
        const inv = invoices.find(i => i.id === invoiceId);
        const newPaid = (inv?.paidAmount ?? 0) + amount;
        const res = await fetch('/api/invoices', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: invoiceId, updates: { paidAmount: newPaid } }) });
        if (!res.ok) throw new Error('update invoice failed');
        const updated = await res.json();
        setInvoices((p) => p.map(i => i.id === invoiceId ? { ...i, paidAmount: updated.paidAmount ?? newPaid } : i));
      }
      // record payment locally (for UI)
      setStudents((prev) => prev.map((s) => (s.id === studentId ? { ...s, payments: [...s.payments, { id: genId('p'), amount, date: new Date().toISOString() }], feesDue: Math.max(0, s.feesDue - amount) } : s)));
    } catch (err) {
      console.error('record payment failed', err);
      setStudents((prev) => prev.map((s) => (s.id === studentId ? { ...s, payments: [...s.payments, { id: genId('p'), amount, date: new Date().toISOString() }], feesDue: Math.max(0, s.feesDue - amount) } : s)));
    }
  }

  async function addBook(title: string, author: string, qty = 1) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/books', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ schoolId: idv, title, author, qty }) });
      if (!res.ok) throw new Error('create book failed');
      const doc = await res.json();
      const b: Book = { id: doc._id ?? doc.id ?? genId('b'), title: doc.title, author: doc.author, qty: doc.qty ?? qty };
      setBooks((p) => [b, ...p]);
    } catch (err) {
      console.error('add book failed', err);
      const b: Book = { id: genId('b'), title, author, qty };
      setBooks((p) => [b, ...p]);
    }
  }

  async function issueBook(bookId: string, studentId: string) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/issues', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ schoolId: idv, bookId, studentId }) });
      if (!res.ok) throw new Error('issue failed');
      const doc = await res.json();
      const it: Issue = { id: doc._id ?? doc.id ?? genId('iss'), bookId: doc.bookId, studentId: doc.studentId, issuedAt: doc.issuedAt ?? new Date().toISOString(), returnedAt: doc.returnedAt ?? undefined };
      setIssues((p) => [it, ...p]);
      // decrement local book qty
      setBooks((p) => p.map((b) => (b.id === bookId ? { ...b, qty: Math.max(0, b.qty - 1) } : b)));
    } catch (err) {
      console.error('issue book failed', err);
      const it: Issue = { id: genId('iss'), bookId, studentId, issuedAt: new Date().toISOString(), returnedAt: undefined };
      setIssues((p) => [it, ...p]);
      setBooks((p) => p.map((b) => (b.id === bookId ? { ...b, qty: Math.max(0, b.qty - 1) } : b)));
    }
  }

  async function returnBook(issueId: string) {
    try {
      const res = await fetch('/api/issues', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: issueId, updates: { returnedAt: new Date().toISOString() } }) });
      if (!res.ok) throw new Error('return failed');
      const updated = await res.json();
      setIssues((p) => p.map((it) => (it.id === issueId ? { ...it, returnedAt: updated.returnedAt ?? new Date().toISOString() } : it)));
      const issue = issues.find((it) => it.id === issueId);
      if (issue) setBooks((p) => p.map((b) => (b.id === issue.bookId ? { ...b, qty: b.qty + 1 } : b)));
    } catch (err) {
      console.error('return book failed', err);
      setIssues((p) => p.map((it) => (it.id === issueId ? { ...it, returnedAt: new Date().toISOString() } : it)));
      const issue = issues.find((it) => it.id === issueId);
      if (issue) setBooks((p) => p.map((b) => (b.id === issue.bookId ? { ...b, qty: b.qty + 1 } : b)));
    }
  }

  async function createAssignment(title: string, klass: string, subject: string, dueDate?: string) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/assignments', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ schoolId: idv, title, klass, subject, dueDate }) });
      if (!res.ok) throw new Error('create assignment failed');
      const doc = await res.json();
      const a: Assignment = { id: doc._id ?? doc.id ?? genId('as'), title: doc.title, klass: doc.klass, subject: doc.subject, dueDate: doc.dueDate };
      setAssignments((p) => [a, ...p]);
    } catch (err) {
      console.error('create assignment failed', err);
      const a: Assignment = { id: genId('as'), title, klass, subject, dueDate };
      setAssignments((p) => [a, ...p]);
    }
  }

  async function addExpense(desc: string, amount: number) {
    const idv = (session?.user as any)?.schoolId ?? schoolId;
    try {
      const res = await fetch('/api/expenses', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ schoolId: idv, desc, amount }) });
      if (!res.ok) throw new Error('create expense failed');
      const doc = await res.json();
      const e: Expense = { id: doc._id ?? doc.id ?? genId('exp'), desc: doc.desc, amount: doc.amount, date: doc.date };
      setExpenses((p) => [e, ...p]);
    } catch (err) {
      console.error('add expense failed', err);
      const e: Expense = { id: genId('exp'), desc, amount, date: new Date().toISOString() };
      setExpenses((p) => [e, ...p]);
    }
  }

  const accounting = useMemo(() => {
    const totalAssigned = students.reduce((a, s) => a + (s.feesDue + s.payments.reduce((x, p) => x + p.amount, 0)), 0);
    const totalCollected = students.reduce((a, s) => a + s.payments.reduce((x, p) => x + p.amount, 0), 0);
    const outstanding = totalAssigned - totalCollected;
    const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
    const profit = totalCollected - totalExpenses;
    return { totalAssigned, totalCollected, outstanding, totalExpenses, profit };
  }, [students, expenses]);

  function studentReport(studentId: string) {
    const st = students.find((s) => s.id === studentId);
    if (!st) return null;
    const results = examResults.filter((r) => r.studentId === studentId);
    const bySubject = results.map((r) => ({ subject: subjects.find((s) => s.id === r.subjectId)?.name ?? r.subjectId, score: r.score }));
    const avg = bySubject.reduce((a, b) => a + b.score, 0) / Math.max(1, bySubject.length);
    return { student: st, bySubject, avg };
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{schoolName} — ERP Demo</h2>
            <p className="text-sm text-gray-400">Interactive demo: manage students, fees, library, assignments and finances (local demo only).</p>
          </div>
          <div className="flex items-center gap-3">
            <select value={role} onChange={(e) => setRole(e.target.value as any)} className="bg-white/5 px-3 py-2 rounded">
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="bursar">Bursar</option>
            </select>
            {!session ? (
              <>
                <button onClick={() => signIn()} className="px-4 py-2 bg-white/5 rounded">Sign in</button>
                <button onClick={() => seedDemo(40)} className="px-4 py-2 bg-[var(--color-accent)] text-black rounded font-semibold">Sign up & Setup Demo</button>
              </>
            ) : (
              <>
                <button onClick={() => seedDemo(40)} className="px-4 py-2 bg-[var(--color-accent)] text-black rounded font-semibold">Setup Demo School</button>
                <button onClick={resetDemo} className="px-4 py-2 bg-white/5 rounded">Reset</button>
                <SignOutButton />
              </>
            )}
          </div>
        </div>

        {demoCredentials && (
          <div className="mb-4 p-3 rounded bg-white/5 border border-white/6 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-300">Demo credentials (for testing)</div>
              <div className="text-sm">Email: <span className="font-mono">{demoCredentials.email}</span> • Password: <span className="font-mono">{demoCredentials.password}</span></div>
              {authMessage && <div className={`text-sm mt-1 ${authStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>{authMessage}</div>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { navigator.clipboard?.writeText(`${demoCredentials.email}:${demoCredentials.password}`); }} className="px-3 py-1 bg-white/5 rounded text-sm">Copy creds</button>
              {!session ? <button onClick={() => signIn('credentials', { email: demoCredentials.email })} className="px-3 py-1 bg-[var(--color-accent)] text-black rounded text-sm">Sign in as demo</button> : null}
            </div>
          </div>
        )}

        <nav className="flex gap-2 flex-wrap mb-6">
          {["dashboard", "students", "teachers", "fees", "library", "assignments", "accounting"].map((k) => (
            <button key={k} onClick={() => setActiveTab(k as any)} className={`px-3 py-2 rounded ${activeTab === k ? "bg-[var(--color-accent)] text-black" : "bg-white/5"}`}>{k.charAt(0).toUpperCase() + k.slice(1)}</button>
          ))}
        </nav>

        <section>
          {activeTab === "dashboard" && (
            <div className="mb-6">
              <DashboardTab students={students} teachers={teachers} accounting={accounting} />
            </div>
          )}

          {activeTab === "students" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 p-4 bg-white/5 rounded">
                <StudentsTab students={students} onView={(id) => setSelectedStudent(id)} />
              </div>
              <div className="p-4 bg-white/5 rounded"><h3 className="font-bold mb-3">Add Student</h3><AddStudentForm classes={classes} onAdd={(p) => addStudent(p)} /></div>
            </div>
          )}

          {activeTab === "teachers" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 p-4 bg-white/5 rounded"><TeachersTab teachers={teachers} /></div>
              <div className="p-4 bg-white/5 rounded"><h3 className="font-bold mb-3">Add Teacher</h3><AddTeacherForm onAdd={(n, s) => addTeacher(n, s)} /></div>
            </div>
          )}

          {activeTab === "fees" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 p-4 bg-white/5 rounded">
                <FeesTab invoices={invoices} onRecord={(sid, amt, invId) => recordPayment(sid, amt, invId)} />
              </div>
              <div className="p-4 bg-white/5 rounded"><h3 className="font-bold mb-3">Create Invoice</h3><CreateInvoiceForm students={students} onCreate={(sid, amt) => createInvoice(sid, amt)} /></div>
            </div>
          )}

          {activeTab === "library" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 p-4 bg-white/5 rounded">
                <LibraryTab books={books} issues={issues} students={students} onIssue={(b,s) => issueBook(b,s)} onReturn={(id) => returnBook(id)} />
              </div>
              <div className="p-4 bg-white/5 rounded"><h3 className="font-bold mb-3">Add Book</h3><AddBookForm onAdd={(t,a,q)=> addBook(t,a,q)} /></div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 p-4 bg-white/5 rounded"><AssignmentsTab assignments={assignments} /></div>
              <div className="p-4 bg-white/5 rounded"><h3 className="font-bold mb-3">Create Assignment</h3><CreateAssignmentForm classes={classes} subjects={subjects} onCreate={(t,k,s,d)=> createAssignment(t,k,s,d)} /></div>
            </div>
          )}

          {activeTab === "accounting" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 p-4 bg-white/5 rounded">
                <AccountingTab accounting={accounting} />
                <h4 className="mt-6 font-bold">Expenses</h4>
                <div className="max-h-64 overflow-auto mt-2">{expenses.map(e => (<div key={e.id} className="p-2 border-b border-white/6 flex items-center justify-between"><div><div className="font-semibold">{e.desc}</div><div className="text-sm text-gray-400">KES {e.amount} • {new Date(e.date).toLocaleDateString()}</div></div></div>))}</div>
              </div>
              <div className="p-4 bg-white/5 rounded"><h3 className="font-bold mb-3">Add Expense</h3><AddExpenseForm onAdd={(d,a)=> addExpense(d,a)} /></div>
            </div>
          )}
        </section>

        {selectedStudent && (
          <div className="mt-6 p-4 bg-white/5 rounded">
            <h3 className="font-bold mb-3">Report Card</h3>
            {(() => {
              const r = studentReport(selectedStudent);
              if (!r) return <div>No student selected</div>;
              return (
                <div>
                  <div className="font-semibold mb-1">{r.student.name} — {r.student.klass}</div>
                  <div className="text-sm text-gray-300 mb-2">Average: {Math.round(r.avg)}</div>
                  <div className="grid md:grid-cols-3 gap-2">{r.bySubject.map((b, i) => (<div key={i} className="p-2 bg-black/30 rounded"><div className="font-semibold">{b.subject}</div><div className="text-sm">Score: {b.score}</div></div>))}</div>
                  <div className="mt-4">
                    <button onClick={() => { recordPayment(r.student.id, 5000); }} className="px-3 py-2 bg-[var(--color-accent)] text-black rounded">Record payment KES 5,000</button>
                    <button onClick={() => setSelectedStudent(null)} className="ml-3 px-3 py-2 bg-white/5 rounded">Close</button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
