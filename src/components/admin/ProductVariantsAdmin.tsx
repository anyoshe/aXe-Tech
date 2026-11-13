"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProductVariant } from "@/lib/product-variants";

type Props = { productId: string };

const empty = {
  label: "",
  processor: "",
  ram: "",
  storage: "",
  display: "",
  os: "",
  condition_grade: "",
  price: "",
  availability: "request_quote",
  warranty: "",
  battery_notes: "",
  accessories: "",
  functional_inspection: "",
  battery_assessment: "",
  display_condition: "",
  keyboard_touchpad_condition: "",
  ports_connectivity_checks: "",
  os_license_status: "",
  warranty_coverage: "",
  warranty_exclusions: "",
  after_sales_support: "",
  published: true,
};

export default function ProductVariantsAdmin({ productId }: Props) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const r = await fetch(`/api/products/${productId}/variants`);
    const d = await r.json();
    setVariants(d.variants || []);
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  async function addVariant(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const price = form.price === "" ? null : Number(form.price);
    if (price != null && (!Number.isFinite(price) || price < 0)) {
      setLoading(false);
      setMsg("Price must be a valid non-negative number");
      return;
    }
    const r = await fetch(editingId ? `/api/products/variants/${editingId}` : `/api/products/${productId}/variants`, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price,
        condition_grade: form.condition_grade || null,
      }),
    });
    const d = await r.json();
    setLoading(false);
    if (!r.ok) {
      setMsg(d.error || "Failed");
      return;
    }
    setForm(empty);
    setEditingId(null);
    setMsg("Configuration added");
    load();
  }

  function edit(v: ProductVariant) {
    setEditingId(v.id);
    setForm({ ...empty, label: v.label || "", processor: v.processor || "", ram: v.ram || "", storage: v.storage || "", display: v.display || "", os: v.os || "", condition_grade: v.condition_grade || "", price: v.price == null ? "" : String(v.price), availability: v.availability, warranty: v.warranty || "", battery_notes: v.battery_notes || "", accessories: v.accessories || "", functional_inspection: v.functional_inspection || "", battery_assessment: v.battery_assessment || "", display_condition: v.display_condition || "", keyboard_touchpad_condition: v.keyboard_touchpad_condition || "", ports_connectivity_checks: v.ports_connectivity_checks || "", os_license_status: v.os_license_status || "", warranty_coverage: v.warranty_coverage || "", warranty_exclusions: v.warranty_exclusions || "", after_sales_support: v.after_sales_support || "", published: v.published !== false });
  }

  async function remove(id: string) {
    if (!confirm("Delete this configuration?")) return;
    await fetch(`/api/products/variants/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-4 space-y-4">
      <h3 className="text-sm font-semibold text-white">Configurations (variants)</h3>
      <p className="text-xs text-white/50">
        Add only real supplier configurations. Leave price empty to show Request a quote. Requires SQL:{" "}
        <code className="text-white/70">supabase/product-variants-media.sql</code>
      </p>

      {variants.length > 0 && (
        <ul className="space-y-2 text-sm">
          {variants.map((v) => (
            <li
              key={v.id}
              className="flex items-start justify-between gap-2 rounded-lg border border-white/10 px-3 py-2"
            >
              <div>
                <p className="font-medium text-white">{v.label}</p>
                <p className="text-xs text-white/50">
                  {[v.processor, v.ram, v.storage, v.condition_grade && `Grade ${v.condition_grade}`]
                    .filter(Boolean)
                    .join(" · ")}
                  {" · "}
                  {v.price != null ? `KES ${Number(v.price).toLocaleString()}` : "Quote"}
                  {" · "}
                  {v.availability}
                </p>
              </div>
              <button type="button" onClick={() => remove(v.id)} className="text-xs text-red-300">
                Delete
              </button>
              <button type="button" onClick={() => edit(v)} className="text-xs text-emerald-200">Edit</button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={addVariant} className="grid sm:grid-cols-2 gap-2 text-sm">
        <input
          required
          placeholder="Label e.g. i5 / 8GB / 256GB · Grade A"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 sm:col-span-2"
        />
        <input
          placeholder="Processor"
          value={form.processor}
          onChange={(e) => setForm({ ...form, processor: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        />
        <input
          placeholder="RAM"
          value={form.ram}
          onChange={(e) => setForm({ ...form, ram: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        />
        <input
          placeholder="Storage"
          value={form.storage}
          onChange={(e) => setForm({ ...form, storage: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        />
        <input
          placeholder="Display"
          value={form.display}
          onChange={(e) => setForm({ ...form, display: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        />
        <input placeholder="Operating system / licence status" value={form.os} onChange={(e) => setForm({ ...form, os: e.target.value })} className="rounded-lg bg-black/40 border border-white/10 px-3 py-2" />
        <select
          value={form.condition_grade}
          onChange={(e) => setForm({ ...form, condition_grade: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        >
          <option value="">Grade (optional)</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <input
          placeholder="Price KES (empty = quote only)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        />
        <select
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        >
          <option value="request_quote">Request a quote</option>
          <option value="in_stock">In stock</option>
          <option value="on_order">Available on order</option>
          <option value="request_config">Request configuration</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <input
          placeholder="Warranty"
          value={form.warranty}
          onChange={(e) => setForm({ ...form, warranty: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2"
        />
        <input
          placeholder="Battery notes"
          value={form.battery_notes}
          onChange={(e) => setForm({ ...form, battery_notes: e.target.value })}
          className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 sm:col-span-2"
        />
        <input placeholder="Included accessories" value={form.accessories} onChange={(e) => setForm({ ...form, accessories: e.target.value })} className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 sm:col-span-2" />
        <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Active and visible to customers</label>
        {(["functional_inspection", "battery_assessment", "display_condition", "keyboard_touchpad_condition", "ports_connectivity_checks", "os_license_status", "warranty_coverage", "warranty_exclusions", "after_sales_support"] as const).map((field) => <label key={field} className="text-xs text-white/60">{field.replaceAll("_", " ")}<textarea value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2" /></label>)}
        <button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 rounded-lg bg-[var(--color-accent)] text-black font-semibold py-2 disabled:opacity-50"
        >
          {loading ? "Saving…" : editingId ? "Save configuration" : "Add configuration"}
        </button>
      </form>
      {msg && <p className="text-xs text-emerald-300">{msg}</p>}
    </div>
  );
}
