import { getSupabaseAdmin } from "@/lib/supabase";

export async function writeAuditLog(opts: {
  actor_id?: string | null;
  actor_role?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  meta?: Record<string, unknown>;
}) {
  try {
    const sb = getSupabaseAdmin();
    await sb.from("audit_logs").insert({
      actor_id: opts.actor_id || null,
      actor_role: opts.actor_role || null,
      action: opts.action,
      entity_type: opts.entity_type,
      entity_id: opts.entity_id || null,
      meta: opts.meta || {},
    });
  } catch (e) {
    console.error("[audit]", e);
  }
}
