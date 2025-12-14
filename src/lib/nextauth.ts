import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import clientPromise from "./mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('users').findOne({ email: credentials?.email });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials?.password ?? '', user.passwordHash || '');
        if (!ok) return null;
        return { id: user._id, email: user.email, role: user.role, schoolId: user.schoolId } as any;
      }
    })
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
  jwt: {
    // next-auth uses NEXTAUTH_SECRET for encrypting
    maxAge: 60 * 60 * 24
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.schoolId = (user as any).schoolId;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user.role = (token as any).role;
      (session as any).user.schoolId = (token as any).schoolId;
      return session;
    }
  }
};

export default authOptions;
