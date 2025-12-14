export type Student = {
  id: string;
  name: string;
  klass: string;
  roll: number;
  feesDue: number;
  payments: { id: string; amount: number; date: string }[];
};

export type Teacher = { id: string; name: string; subject: string };
export type Subject = { id: string; name: string };
export type ExamResult = { studentId: string; subjectId: string; score: number };

export type Book = { id: string; title: string; author: string; qty: number };
export type Issue = { id: string; bookId: string; studentId: string; issuedAt: string; returnedAt?: string };
export type Invoice = { id: string; studentId: string; amount: number; issuedAt: string; paidAmount: number };
export type Expense = { id: string; desc: string; amount: number; date: string };
export type Assignment = { id: string; title: string; klass: string; subject: string; dueDate?: string };

export default {};
