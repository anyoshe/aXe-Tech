import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export type TokenPayload = { sub?: string; email?: string; role?: string; schoolId?: string } & Record<string, any>;

export async function getAuthToken(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token as TokenPayload | null;
}

export async function requireAuth(req: any, { allowRoles }: { allowRoles?: string[] } = {}) {
  const token = await getAuthToken(req);
  if (!token) return { ok: false, response: NextResponse.json({ error: 'not_authenticated' }, { status: 401 }) };
  if (allowRoles && allowRoles.length) {
    if (!token.role || !allowRoles.includes(token.role)) {
      return { ok: false, response: NextResponse.json({ error: 'forbidden' }, { status: 403 }) };
    }
  }
  return { ok: true, token };
}
