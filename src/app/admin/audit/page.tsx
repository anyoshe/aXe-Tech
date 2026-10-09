"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  CrmShell,
  CrmTable,
  CrmRow,
  CrmCell,
  CrmMobileCards,
  CrmCard,
  CrmCardField,
} from "@/components/crm/CrmShell";
import { adminCrmNav } from "@/lib/admin-nav";

type Log = {
  id: string;
  actor_id: string | null;
  actor_role: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  meta: Record<string, unknown>;
  created_at: string;
};

export default function AdminAuditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role !== "admin") return;
    fetch("/api/audit-logs")
      .then((r) => r.json())
      .then((d) => setLogs(d.logs || []));
  }, [session]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Audit log"
          subtitle="Financial and key actions (deal paid, commissions, leads, applications)."
          nav={adminCrmNav("audit")}
        >
          <CrmMobileCards>
            {logs.map((l) => (
              <CrmCard key={l.id} title={l.action}>
                <CrmCardField label="Entity" value={`${l.entity_type} ${l.entity_id?.slice(0, 8) || ""}`} />
                <CrmCardField label="Actor" value={l.actor_role || "—"} />
                <CrmCardField label="When" value={new Date(l.created_at).toLocaleString()} />
              </CrmCard>
            ))}
          </CrmMobileCards>
          <CrmTable columns={["When", "Action", "Entity", "Actor", "Meta"]}>
            {logs.map((l) => (
              <CrmRow key={l.id}>
                <CrmCell muted>{new Date(l.created_at).toLocaleString()}</CrmCell>
                <CrmCell className="font-mono text-xs">{l.action}</CrmCell>
                <CrmCell muted>
                  {l.entity_type}
                  {l.entity_id ? ` · ${l.entity_id.slice(0, 8)}` : ""}
                </CrmCell>
                <CrmCell muted>{l.actor_role || "—"}</CrmCell>
                <CrmCell muted>
                  <span className="text-xs font-mono line-clamp-2">{JSON.stringify(l.meta || {})}</span>
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
