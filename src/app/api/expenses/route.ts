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
  const docs = await db.collection('expenses').find({ schoolId }).toArray();
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  // allow admin and bursar to add expenses
  const auth = await requireAuth(req, { allowRoles: ['admin', 'bursar'] });
  if (!auth.ok) return auth.response;
  try {
    const body = await req.json();
    const { schoolId, desc, amount } = body;
    if (!schoolId || !desc || amount == null) return NextResponse.json({ error: 'schoolId, desc and amount required' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const res = await db.collection('expenses').insertOne({ schoolId, desc, amount, date: new Date() });
    const doc = await db.collection('expenses').findOne({ _id: res.insertedId });
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
    await db.collection('expenses').deleteOne({ _id: qid as any });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
