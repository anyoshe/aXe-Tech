import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import clientPromise from '../../../../lib/mongodb';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });

  // token contains role and schoolId as set in callbacks
  const client = await clientPromise;
  const db = client.db();
  const schoolId = (token as any).schoolId;
  const count = await db.collection('students').countDocuments({ schoolId });
  return NextResponse.json({ ok: true, schoolId, students: count });
}
