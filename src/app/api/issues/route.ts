import { NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb';
import { requireAuth } from '../../../lib/auth';
import { validateIssuePayload } from '../../../lib/validators';
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
  const docs = await db.collection('issues').find({ schoolId }).toArray();
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const auth = await requireAuth(req, { allowRoles: ['admin','teacher'] });
  if (!auth.ok) return auth.response;
  try {
    const body = await req.json();
    const v = validateIssuePayload(body);
    if (!v.ok) return NextResponse.json({ error: 'validation failed', details: v.errors }, { status: 400 });
    const { schoolId, bookId, studentId } = body;
    const client = await clientPromise;
    const db = client.db();
    const res = await db.collection('issues').insertOne({ schoolId, bookId, studentId, issuedAt: new Date(), returnedAt: null });
    // decrement book qty (coerce id)
    const bookQid = ObjectId.isValid(bookId) ? new ObjectId(bookId) : bookId;
    await db.collection('books').updateOne({ _id: bookQid as any }, { $inc: { qty: -1 } });
    const doc = await db.collection('issues').findOne({ _id: res.insertedId });
    return NextResponse.json(doc);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireAuth(req, { allowRoles: ['admin','teacher'] });
  if (!auth.ok) return auth.response;
  try {
    const body = await req.json();
    const { id, updates } = body;
    if (!id || !updates) return NextResponse.json({ error: 'id and updates required' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const qid = ObjectId.isValid(id) ? new ObjectId(id) : id;
    await db.collection('issues').updateOne({ _id: qid as any }, { $set: updates });
    if (updates.returnedAt) {
      const issue = await db.collection('issues').findOne({ _id: qid as any });
      if (issue) {
        const bookQid = ObjectId.isValid(issue.bookId) ? new ObjectId(issue.bookId) : issue.bookId;
        await db.collection('books').updateOne({ _id: bookQid as any }, { $inc: { qty: 1 } });
      }
    }
    const doc = await db.collection('issues').findOne({ _id: qid as any });
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
    await db.collection('issues').deleteOne({ _id: qid as any });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
