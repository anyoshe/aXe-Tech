import { NextResponse } from "next/server";
import clientPromise from '../../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

function id(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function randName() {
  const first = ["James", "Mary", "Joseph", "Faith", "Peter", "Esther", "Daniel", "Grace", "Paul", "Ruth", "Tom", "Alice"];
  const last = ["Mwangi", "Kamau", "Wambui", "Omondi", "Achieng", "Mutua", "Njoroge", "Chebet"];
  return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
}

export async function POST(req: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const resolvedParams = await Promise.resolve(params as any);
    const schoolId = resolvedParams.id;
    const client = await clientPromise;
    const db = client.db();

    // Ensure school exists
    await db.collection('schools').updateOne({ _id: schoolId }, { $setOnInsert: { _id: schoolId, name: `Demo School ${schoolId}`, createdAt: new Date(), demo: true } }, { upsert: true });

    // Seed classes, subjects, teachers, students, books, invoices
    const demoClasses = ["Form 1", "Form 2", "Form 3", "Form 4"];
    const demoSubjects = ["Mathematics", "English", "Physics", "Biology", "Computer Studies"];

    const teachers = demoSubjects.map((s) => ({ schoolId, name: randName(), subject: s, createdAt: new Date() }));
    if (teachers.length) await db.collection('teachers').insertMany(teachers);

    const students = Array.from({ length: 30 }).map((_, i) => ({ schoolId, name: randName(), klass: demoClasses[i % demoClasses.length], roll: i + 1, feesDue: 20000, payments: [], createdAt: new Date() }));
    if (students.length) await db.collection('students').insertMany(students);

    const subjects = demoSubjects.map((s) => ({ schoolId, name: s }));
    if (subjects.length) await db.collection('subjects').insertMany(subjects);

    const books = [{ schoolId, title: 'Intro to Computer Science', author: 'A. Author', qty: 5 }, { schoolId, title: 'Mathematics Essentials', author: 'B. Writer', qty: 4 }];
    if (books.length) await db.collection('books').insertMany(books);

    // invoices need student ids; fetch inserted students' ids
    const insertedStudents = await db.collection('students').find({ schoolId }).toArray();
    const invoices = insertedStudents.slice(0, 8).map((s) => ({ schoolId, studentId: s._id, amount: 20000, issuedAt: new Date(), paidAmount: 0 }));
    if (invoices.length) await db.collection('invoices').insertMany(invoices);

    // Create demo user (email/password) — password 'demo'
    const demoEmail = `demo@${schoolId}.example`;
    const existing = await db.collection('users').findOne({ email: demoEmail });
    if (!existing) {
      const hash = await bcrypt.hash('demo', 10);
      await db.collection('users').insertOne({ email: demoEmail, passwordHash: hash, role: 'admin', schoolId, createdAt: new Date() });
    }

    return NextResponse.json({ ok: true, seeded: { teachers: teachers.length, students: students.length, subjects: subjects.length, books: books.length, invoices: invoices.length } });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
