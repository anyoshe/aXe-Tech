import { getSupabaseAdmin } from "@/lib/supabase";

/** Upsert a customer by phone (preferred) or name */
export async function upsertCustomer(opts: {
  name: string;
  phone?: string | null;
  email?: string | null;
  county?: string | null;
  customer_type?: string | null;
  partner_id?: string | null;
}): Promise<string | null> {
  const sb = getSupabaseAdmin();
  const name = opts.name.trim();
  if (!name) return null;

  const phone = opts.phone?.trim() || null;

  if (phone) {
    const { data: existing } = await sb
      .from("customers")
      .select("id")
      .eq("phone", phone)
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      await sb
        .from("customers")
        .update({
          name,
          email: opts.email || null,
          county: opts.county || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      return existing.id as string;
    }
  }

  const { data, error } = await sb
    .from("customers")
    .insert({
      name,
      phone,
      email: opts.email || null,
      county: opts.county || null,
      customer_type: opts.customer_type || "other",
      partner_id: opts.partner_id || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[customers] upsert", error);
    return null;
  }
  return data?.id as string;
}
