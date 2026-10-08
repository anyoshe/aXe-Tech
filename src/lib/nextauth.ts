import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import {
  canPartnerLogin,
  findPartnerByEmail,
  verifyPassword,
} from "./partners";

/**
 * Auth: env admin OR approved partners (Supabase partners table).
 *
 * Env:
 *   ADMIN_EMAIL / ADMIN_PASSWORD
 *   NEXTAUTH_SECRET / NEXTAUTH_URL
 *   Supabase keys for partner lookup
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
        const inputEmail = (credentials?.email || "").trim().toLowerCase();
        const inputPassword = credentials?.password || "";
        if (!inputEmail || !inputPassword) return null;

        // 1) Platform admin
        const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD || "";
        if (adminEmail && adminPassword && inputEmail === adminEmail && inputPassword === adminPassword) {
          return {
            id: "admin",
            email: adminEmail,
            role: "admin",
            name: "GetAxe Admin",
          };
        }

        // 2) Sales partner
        try {
          const partner = await findPartnerByEmail(inputEmail);
          if (!partner || !partner.password_hash) return null;
          if (!canPartnerLogin(partner.status)) return null;
          const ok = await verifyPassword(inputPassword, partner.password_hash);
          if (!ok) return null;
          return {
            id: partner.id,
            email: partner.email,
            role: "partner",
            name: partner.full_name,
            partnerStatus: partner.status,
            specialty: partner.specialty,
          };
        } catch (e) {
          console.error("[auth] partner login", e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  jwt: { maxAge: 60 * 60 * 24 * 7 },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/partners/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.partnerStatus = (user as { partnerStatus?: string }).partnerStatus;
        token.specialty = (user as { specialty?: string }).specialty;
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = (token.uid as string) || token.sub;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { partnerStatus?: string }).partnerStatus =
          token.partnerStatus as string;
        (session.user as { specialty?: string }).specialty = token.specialty as string;
      }
      return session;
    },
  },
};
