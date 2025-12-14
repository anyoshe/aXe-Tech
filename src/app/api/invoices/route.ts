import { NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb';
import { requireAuth } from '../../../../src/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;
  const url = new URL(req.url);
  const schoolId = url.searchParams.get('schoolId');
  if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
  if (auth.token?.schoolId !== schoolId && auth.token?.role !== 'admin') return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const client = await clientPromise;
  const db = client.db();
  const docs = await db.collection('invoices').find({ schoolId }).toArray();
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  // allow admin and bursar to create invoices
  const auth = await requireAuth(req, { allowRoles: ['admin', 'bursar'] });
  if (!auth.ok) return auth.response;
  try {
    const body = await req.json();
    const { schoolId, studentId, amount } = body;
    if (!schoolId || !studentId || !amount) return NextResponse.json({ error: 'schoolId, studentId and amount required' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const res = await db.collection('invoices').insertOne({ schoolId, studentId, amount, issuedAt: new Date(), paidAmount: 0 });
    const doc = await db.collection('invoices').findOne({ _id: res.insertedId });
    return NextResponse.json(doc);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  // allow admin and bursar to update (e.g., record payments)
  const auth = await requireAuth(req, { allowRoles: ['admin', 'bursar'] });
  if (!auth.ok) return auth.response;
  try {
    const body = await req.json();
    const { id, updates } = body;
    if (!id || !updates) return NextResponse.json({ error: 'id and updates required' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const qid = ObjectId.isValid(id) ? new ObjectId(id) : id;
    await db.collection('invoices').updateOne({ _id: qid as any }, { $set: updates });
    const doc = await db.collection('invoices').findOne({ _id: qid as any });
    return NextResponse.json(doc);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAuth(req, { allowRoles: ['admin'] });
  if (!auth.ok) return auth.response;
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const qid = ObjectId.isValid(id) ? new ObjectId(id) : id;
    await db.collection('invoices').deleteOne({ _id: qid as any });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
