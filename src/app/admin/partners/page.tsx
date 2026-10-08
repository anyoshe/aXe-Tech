"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CrmShell,
  CrmStat,
  CrmTable,
  CrmRow,
  CrmCell,
  StageBadge,
  CrmMobileCards,
  CrmCard,
  CrmCardField,
} from "@/components/crm/CrmShell";
import { PARTNER_STATUSES } from "@/lib/partner-constants";
import { adminCrmNav } from "@/lib/admin-nav";

type Partner = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  county: string | null;
  specialty: string;
  status: string;
  occupation: string | null;
  mpesa_number?: string | null;
  target_market?: string | null;
  created_at: string;
  admin_notes: string | null;
};

export default function AdminPartnersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/partners/dashboard");
    }
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/partners");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed");
      return;
    }
    setPartners(data.partners || []);
  }

  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function setStatus(id: string, st: string) {
    await fetch("/api/partners", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: st }),
    });
    await load();
  }

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      if (filter !== "ALL" && p.status !== filter) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        p.full_name.toLowerCase().includes(s) ||
        p.email.toLowerCase().includes(s) ||
        p.phone.includes(s) ||
        (p.county || "").toLowerCase().includes(s)
      );
    });
  }, [partners, filter, q]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Partners"
          subtitle="Approve applications and set status through training to ACTIVE."
          nav={adminCrmNav("partners")}
          actions={
            <Link
              href="/admin/products"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70"
            >
              Products
            </Link>
          }
        >
          {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Total" value={partners.length} />
            <CrmStat
              label="Applied"
              value={partners.filter((p) => p.status === "APPLIED").length}
            />
            <CrmStat
              label="Active / certified"
              value={partners.filter((p) => ["ACTIVE", "CERTIFIED"].includes(p.status)).length}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, phone, county…"
              className="flex-1 min-w-[180px] rounded-lg bg-[#0f1624] border border-white/10 px-4 py-2.5 text-sm"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg bg-[#0f1624] border border-white/10 px-3 py-2.5 text-sm"
            >
              <option value="ALL">All statuses</option>
              {PARTNER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <CrmMobileCards>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-white/40 py-10">No partners match.</p>
            )}
            {filtered.map((p) => (
              <CrmCard
                key={p.id}
                title={p.full_name}
                badge={<StageBadge stage={p.status} />}
                footer={
                  <select
                    value={p.status}
                    onChange={(e) => setStatus(p.id, e.target.value)}
                    className="w-full bg-[#0a101c] border border-white/10 rounded-lg px-3 py-2 text-sm"
                  >
                    {PARTNER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                }
              >
                <CrmCardField label="Email" value={p.email} />
                <CrmCardField label="Phone" value={p.phone} />
                <CrmCardField label="M-Pesa" value={p.mpesa_number || "—"} />
                <CrmCardField label="County" value={p.county || "—"} />
                <CrmCardField label="Specialty" value={<span className="capitalize">{p.specialty}</span>} />
                <CrmCardField label="Applied" value={new Date(p.created_at).toLocaleDateString()} />
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable
            columns={[
              "Name",
              "Contact",
              "County",
              "Specialty",
              "M-Pesa",
              "Status",
              "Applied",
            ]}
          >
            {filtered.map((p) => (
              <CrmRow key={p.id}>
                <CrmCell>
                  <div className="font-semibold">{p.full_name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{p.occupation || "—"}</div>
                </CrmCell>
                <CrmCell>
                  <div>{p.email}</div>
                  <div className="text-xs text-white/50 mt-0.5">{p.phone}</div>
                </CrmCell>
                <CrmCell muted>{p.county || "—"}</CrmCell>
                <CrmCell className="capitalize">{p.specialty}</CrmCell>
                <CrmCell muted>{p.mpesa_number || "—"}</CrmCell>
                <CrmCell>
                  <div className="flex flex-col gap-2">
                    <StageBadge stage={p.status} />
                    <select
                      value={p.status}
                      onChange={(e) => setStatus(p.id, e.target.value)}
                      className="bg-[#0a101c] border border-white/10 rounded-md px-2 py-1 text-xs max-w-[140px]"
                    >
                      {PARTNER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </CrmCell>
                <CrmCell muted>{new Date(p.created_at).toLocaleDateString()}</CrmCell>
              </CrmRow>
            ))}
          </CrmTable>

          <p className="mt-4 text-xs text-white/40">
            Partners can log in from APPROVED upward. Lead registration requires CERTIFIED or ACTIVE.
          </p>
        </CrmShell>
      </main>
    </>
  );
}
