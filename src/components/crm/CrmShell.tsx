"use client";

import Link from "next/link";
import { ReactNode } from "react";

type NavItem = { href: string; label: string; active?: boolean };

export function CrmShell({
  title,
  subtitle,
  nav,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  nav?: NavItem[];
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070b12] text-white">
      <div className="border-b border-white/10 bg-[#0c1220]/80 backdrop-blur sticky top-16 z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-white/50 mt-1 max-w-2xl">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {nav && nav.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto pb-0">
            {nav.map((n) => (
              <Link
                key={n.href + n.label}
                href={n.href}
                className={`shrink-0 px-4 py-2.5 text-sm border-b-2 transition ${
                  n.active
                    ? "border-[var(--color-accent)] text-white font-medium"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">{children}</div>
    </div>
  );
}

export function CrmStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0f1624] px-5 py-4 min-w-[140px]">
      <p className="text-[11px] uppercase tracking-wider text-white/40 font-medium">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

export function StageBadge({ stage }: { stage: string }) {
  const colors: Record<string, string> = {
    NEW: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
    CONTACTED: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    QUALIFIED: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/30",
    DISCOVERY: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
    DEMO: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
    QUOTE_REQUEST: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    QUOTE_SENT: "bg-orange-500/15 text-orange-300 ring-orange-500/30",
    NEGOTIATION: "bg-yellow-500/15 text-yellow-200 ring-yellow-500/30",
    WON: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    PAYMENT: "bg-emerald-500/20 text-emerald-200 ring-emerald-500/40",
    DELIVERY: "bg-teal-500/15 text-teal-300 ring-teal-500/30",
    LOST: "bg-red-500/15 text-red-300 ring-red-500/30",
    PENDING: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    APPROVED: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    REJECTED: "bg-red-500/15 text-red-300 ring-red-500/30",
    PAID: "bg-emerald-500/20 text-emerald-200 ring-emerald-500/40",
    UNPAID: "bg-white/10 text-white/60 ring-white/20",
    ELIGIBLE: "bg-lime-500/15 text-lime-300 ring-lime-500/30",
    ACTIVE: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    APPLIED: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
    CERTIFIED: "bg-lime-500/15 text-lime-300 ring-lime-500/30",
  };
  const c = colors[stage] || "bg-white/10 text-white/70 ring-white/15";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${c}`}
    >
      {stage.replace(/_/g, " ")}
    </span>
  );
}

export function CrmTable({
  columns,
  children,
  empty,
}: {
  columns: string[];
  children: ReactNode;
  empty?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f1624] overflow-hidden shadow-xl shadow-black/20">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10 bg-[#121a2b]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/45 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function CrmRow({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-white/[0.03] transition ${onClick ? "cursor-pointer" : ""}`}
    >
      {children}
    </tr>
  );
}

export function CrmCell({
  children,
  className = "",
  muted,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <td
      className={`px-5 py-4 align-top text-sm ${muted ? "text-white/50" : "text-white/90"} ${className}`}
    >
      {children}
    </td>
  );
}
