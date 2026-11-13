"use client";

import { useMemo, useState, useEffect } from "react";
import {
  type ProductVariant,
  formatKes,
  availabilityLabel,
  CONDITION_GRADES,
  startingPriceFromVariants,
  priceRangeFromVariants,
} from "@/lib/product-variants";

type Props = {
  variants: ProductVariant[];
  basePrice?: number;
  onVariantChange?: (v: ProductVariant | null) => void;
};

export default function ProductConfigSelector({ variants, basePrice, onVariantChange }: Props) {
  const active = useMemo(
    () => (variants || []).filter((v) => v.published !== false && v.availability !== "unavailable"),
    [variants]
  );

  const [selectedId, setSelectedId] = useState<string | null>(active[0]?.id ?? null);

  useEffect(() => {
    if (!selectedId && active[0]) setSelectedId(active[0].id);
    const v = active.find((x) => x.id === selectedId) || active[0] || null;
    onVariantChange?.(v);
  }, [active, selectedId, onVariantChange]);

  const selected = active.find((v) => v.id === selectedId) || active[0];
  const start = startingPriceFromVariants(active);
  const range = priceRangeFromVariants(active);

  const processors = Array.from(new Set(active.map((v) => v.processor).filter(Boolean))) as string[];
  const rams = Array.from(new Set(active.map((v) => v.ram).filter(Boolean))) as string[];
  const storages = Array.from(new Set(active.map((v) => v.storage).filter(Boolean))) as string[];
  const grades = Array.from(new Set(active.map((v) => v.condition_grade).filter(Boolean))) as string[];

  const [proc, setProc] = useState<string>("");
  const [ram, setRam] = useState<string>("");
  const [ssd, setSsd] = useState<string>("");
  const [grade, setGrade] = useState<string>("");

  useEffect(() => {
    let list = active;
    if (proc) list = list.filter((v) => v.processor === proc);
    if (ram) list = list.filter((v) => v.ram === ram);
    if (ssd) list = list.filter((v) => v.storage === ssd);
    if (grade) list = list.filter((v) => v.condition_grade === grade);
    if (list.length && !list.find((v) => v.id === selectedId)) {
      setSelectedId(list[0].id);
    }
  }, [proc, ram, ssd, grade, active, selectedId]);

  if (!active.length) return null;

  function Chip({
    label,
    active: isOn,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
          isOn
            ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-100"
            : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-white/50">Pricing</p>
        <p className="mt-1 text-2xl font-bold text-white">
          {start != null
            ? range.max != null && range.max !== range.min
              ? `From ${formatKes(start)} – ${formatKes(range.max)}`
              : `From ${formatKes(start)}`
            : basePrice
              ? `From ${formatKes(basePrice)}`
              : "Request a quote"}
        </p>
        <p className="mt-1 text-xs text-white/45">
          Indicative pricing. Final price confirmed on written quotation for the selected configuration.
        </p>
      </div>

      {processors.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-2">Processor</p>
          <div className="flex flex-wrap gap-2">
            <Chip label="Any" active={!proc} onClick={() => setProc("")} />
            {processors.map((p) => (
              <Chip key={p} label={p} active={proc === p} onClick={() => setProc(p)} />
            ))}
          </div>
        </div>
      )}
      {rams.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-2">RAM</p>
          <div className="flex flex-wrap gap-2">
            <Chip label="Any" active={!ram} onClick={() => setRam("")} />
            {rams.map((p) => (
              <Chip key={p} label={p} active={ram === p} onClick={() => setRam(p)} />
            ))}
          </div>
        </div>
      )}
      {storages.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-2">Storage</p>
          <div className="flex flex-wrap gap-2">
            <Chip label="Any" active={!ssd} onClick={() => setSsd("")} />
            {storages.map((p) => (
              <Chip key={p} label={p} active={ssd === p} onClick={() => setSsd(p)} />
            ))}
          </div>
        </div>
      )}
      {grades.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-2">Condition grade</p>
          <div className="flex flex-wrap gap-2">
            <Chip label="Any" active={!grade} onClick={() => setGrade("")} />
            {grades.map((g) => (
              <Chip key={g} label={`Grade ${g}`} active={grade === g} onClick={() => setGrade(g)} />
            ))}
          </div>
          {grade && CONDITION_GRADES[grade as keyof typeof CONDITION_GRADES] && (
            <p className="mt-2 text-xs text-white/50">{CONDITION_GRADES[grade as keyof typeof CONDITION_GRADES]}</p>
          )}
        </div>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/45 mb-2">Configuration</p>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {active
            .filter((v) => {
              if (proc && v.processor !== proc) return false;
              if (ram && v.ram !== ram) return false;
              if (ssd && v.storage !== ssd) return false;
              if (grade && v.condition_grade !== grade) return false;
              return true;
            })
            .map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedId(v.id)}
                className={`w-full text-left rounded-xl border px-3 py-2.5 transition ${
                  selected?.id === v.id
                    ? "border-emerald-400/50 bg-emerald-400/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-white">{v.label}</span>
                  <span className="text-sm font-semibold text-emerald-200/90 shrink-0">
                    {v.price != null && v.price > 0 ? formatKes(v.price) : "Quote"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/45">
                  {[v.processor, v.ram, v.storage, v.condition_grade ? `Grade ${v.condition_grade}` : null]
                    .filter(Boolean)
                    .join(" · ")}
                  {" · "}
                  {availabilityLabel(v.availability)}
                </p>
              </button>
            ))}
        </div>
      </div>

      {selected && (
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm">
          <p className="font-semibold text-white">Selected</p>
          <p className="mt-1 text-white/70">{selected.label}</p>
          <p className="mt-2 text-white/90 font-semibold">
            {selected.price != null && selected.price > 0 ? formatKes(selected.price) : "Request a quote"}
          </p>
          <p className="mt-1 text-xs text-white/45">{availabilityLabel(selected.availability)}</p>
          {selected.warranty && <p className="mt-1 text-xs text-white/50">Warranty: {selected.warranty}</p>}
          {selected.battery_notes && (
            <p className="mt-1 text-xs text-white/50">Battery: {selected.battery_notes}</p>
          )}
          {selected.os_license_status && <p className="mt-1 text-xs text-white/50">OS licensing: {selected.os_license_status}</p>}
          {selected.functional_inspection && <p className="mt-1 text-xs text-white/50">Functional inspection: {selected.functional_inspection}</p>}
          {selected.battery_assessment && <p className="mt-1 text-xs text-white/50">Battery assessment: {selected.battery_assessment}</p>}
          {selected.display_condition && <p className="mt-1 text-xs text-white/50">Display: {selected.display_condition}</p>}
          {selected.keyboard_touchpad_condition && <p className="mt-1 text-xs text-white/50">Keyboard/touchpad: {selected.keyboard_touchpad_condition}</p>}
          {selected.ports_connectivity_checks && <p className="mt-1 text-xs text-white/50">Ports/connectivity: {selected.ports_connectivity_checks}</p>}
          {selected.accessories && <p className="mt-1 text-xs text-white/50">Included accessories: {selected.accessories}</p>}
          {selected.warranty_coverage && <p className="mt-1 text-xs text-white/50">Warranty coverage: {selected.warranty_coverage}</p>}
          {selected.warranty_exclusions && <p className="mt-1 text-xs text-white/50">Warranty exclusions: {selected.warranty_exclusions}</p>}
          {selected.after_sales_support && <p className="mt-1 text-xs text-white/50">After-sales support: {selected.after_sales_support}</p>}
        </div>
      )}
    </div>
  );
}
