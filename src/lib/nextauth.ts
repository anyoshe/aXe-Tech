import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

/**
 * Auth without MongoDB.
 * Set in .env.local / Vercel:
 *   ADMIN_EMAIL=you@example.com
 *   ADMIN_PASSWORD=a-strong-password
 *   NEXTAUTH_SECRET=...
 *   NEXTAUTH_URL=https://your-domain.com
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
        const password = process.env.ADMIN_PASSWORD || "";

        if (!email || !password) {
          console.error(
            "[auth] ADMIN_EMAIL and ADMIN_PASSWORD must be set (MongoDB user store removed)."
          );
          return null;
        }

        const inputEmail = (credentials?.email || "").trim().toLowerCase();
        const inputPassword = credentials?.password || "";

        if (inputEmail === email && inputPassword === password) {
          return {
            id: "admin",
            email,
            role: "admin",
            schoolId: null,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  jwt: { maxAge: 60 * 60 * 24 },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.schoolId = (user as { schoolId?: string | null }).schoolId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string | undefined;
        (session.user as { schoolId?: string | null }).schoolId =
          token.schoolId as string | null | undefined;
      }
      return session;
    },
  },
};

export default authOptions;
