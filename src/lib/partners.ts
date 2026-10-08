import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "./supabase";

export * from "./partner-constants";
export type { PartnerStatus, LeadStage } from "./partner-constants";

export function canPartnerLogin(status: string): boolean {
  return status === "ACTIVE" || status === "CERTIFIED" || status === "TRAINING" || status === "APPROVED";
}

export function canPartnerOwnLeads(status: string): boolean {
  return status === "ACTIVE" || status === "CERTIFIED";
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function findPartnerByEmail(email: string) {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from("partners")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  if (error) {
    console.error("[partners]", error.message);
    return null;
  }
  return data;
}

export async function findPartnerById(id: string) {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb.from("partners").select("*").eq("id", id).maybeSingle();
  if (error) return null;
  return data;
}

export function defaultProtectedUntil(days = 45): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}
