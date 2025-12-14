// import { NextResponse } from "next/server";
// import clientPromise from '../../../lib/mongodb';
// import { requireAuth } from '../../../../src/lib/auth';

// export async function GET(req: Request) {
//   const auth = await requireAuth(req);
//   if (!auth.ok) return auth.response;
//   const url = new URL(req.url);
//   const schoolId = url.searchParams.get('schoolId');
//   if (!schoolId) return NextResponse.json({ error: 'schoolId required' }, { status: 400 });
//   if (auth.token?.schoolId !== schoolId && auth.token?.role !== 'admin') return NextResponse.json({ error: 'forbidden' }, { status: 403 });
//   const client = await clientPromise;
//   const db = client.db();
//   const docs = await db.collection('subjects').find({ schoolId }).toArray();
//   return NextResponse.json(docs);
// }

// export async function POST(req: Request) {
//   const auth = await requireAuth(req, { allowRoles: ['admin','teacher'] });
//   if (!auth.ok) return auth.response;
//   try {
//     const body = await req.json();
//     const { schoolId, name } = body;
//     if (!schoolId || !name) return NextResponse.json({ error: 'schoolId and name required' }, { status: 400 });
//     const client = await clientPromise;
//     const db = client.db();
//     const res = await db.collection('subjects').insertOne({ _id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`, schoolId, name });
//     const doc = await db.collection('subjects').findOne({ _id: res.insertedId });
//     return NextResponse.json(doc);
//   } catch (err) {
//     return NextResponse.json({ error: String(err) }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   const auth = await requireAuth(req, { allowRoles: ['admin'] });
//   if (!auth.ok) return auth.response;
//   try {
//     const url = new URL(req.url);
//     const id = url.searchParams.get('id');
//     if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
//     const client = await clientPromise;
//     const db = client.db();
//     await db.collection('subjects').deleteOne({ _id: id });
//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     return NextResponse.json({ error: String(err) }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { requireAuth } from "../../../lib/auth";
import { ObjectId } from "mongodb";

/* ===================== GET ===================== */

export async function GET(req: Request) {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth.response;

  const url = new URL(req.url);
  const schoolId = url.searchParams.get("schoolId");

  if (!schoolId) {
    return NextResponse.json(
      { error: "schoolId required" },
      { status: 400 }
    );
  }

  if (
    auth.token?.schoolId !== schoolId &&
    auth.token?.role !== "admin"
  ) {
    return NextResponse.json(
      { error: "forbidden" },
      { status: 403 }
    );
  }

  const client = await clientPromise;
  const db = client.db();

  const docs = await db
    .collection("subjects")
    .find({ schoolId })
    .toArray();

  return NextResponse.json(docs);
}

/* ===================== POST ===================== */

export async function POST(req: Request) {
  const auth = await requireAuth(req, {
    allowRoles: ["admin", "teacher"],
  });
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const { schoolId, name } = body;

    if (!schoolId || !name) {
      return NextResponse.json(
        { error: "schoolId and name required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Let MongoDB generate ObjectId
    const res = await db.collection("subjects").insertOne({
      schoolId,
      name,
      createdAt: new Date(),
    });

    const doc = await db
      .collection("subjects")
      .findOne({ _id: res.insertedId });

    return NextResponse.json(doc);
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}

/* ===================== DELETE ===================== */

export async function DELETE(req: Request) {
  const auth = await requireAuth(req, { allowRoles: ["admin"] });
  if (!auth.ok) return auth.response;

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    await db
      .collection("subjects")
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
