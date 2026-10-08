import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      partnerStatus?: string;
      specialty?: string;
    };
  }

  interface User {
    role?: string;
    partnerStatus?: string;
    specialty?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    partnerStatus?: string;
    specialty?: string;
    uid?: string;
  }
}
