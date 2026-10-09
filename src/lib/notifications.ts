import { getSupabaseAdmin } from "@/lib/supabase";

/** In-app notification. Optional email if RESEND_API_KEY + NOTIFY_FROM_EMAIL set. */
export async function notifyUser(opts: {
  user_key: string;
  title: string;
  body?: string;
  link?: string;
  email?: string | null;
}) {
  try {
    const sb = getSupabaseAdmin();
    await sb.from("notifications").insert({
      user_key: opts.user_key,
      title: opts.title,
      body: opts.body || null,
      link: opts.link || null,
    });
  } catch (e) {
    console.error("[notify] db", e);
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM_EMAIL || "GetAxe <noreply@getaxekenya.com>";
  if (key && opts.email) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [opts.email],
          subject: opts.title,
          text: `${opts.body || ""}${opts.link ? `\n\n${opts.link}` : ""}\n\n— GetAxe Technologies`,
        }),
      });
    } catch (e) {
      console.error("[notify] email", e);
    }
  }
}

/** Pilot default: KES per campaign-attributed lead for marketing partner */
export const MARKETER_LEAD_FEE_KES = Number(process.env.MARKETER_LEAD_FEE_KES || 500);
