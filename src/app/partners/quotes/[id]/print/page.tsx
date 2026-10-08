"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Quote = {
  id: string;
  pillar: string;
  solution_summary: string;
  status: string;
  approved_setup_fee: number | null;
  approved_monthly_fee: number | null;
  approved_one_off: number | null;
  approved_notes: string | null;
  qualification: Record<string, string>;
  created_at: string;
  decided_at: string | null;
};

export default function PrintQuotePage() {
  const params = useParams();
  const id = String(params.id || "");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/quotes/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.quote) setQuote(d.quote);
        else setError(d.error || "Not found");
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black p-8">
        <p>{error}</p>
        <Link href="/partners/quotes">Back</Link>
      </div>
    );
  }
  if (!quote) {
    return <div className="min-h-screen bg-white text-black p-8">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">
      <div className="max-w-2xl mx-auto p-8 print:p-0">
        <div className="flex justify-between items-start gap-4 no-print mb-6">
          <Link href="/partners/quotes" className="text-sm text-blue-600">
            ← Quotes
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-semibold"
          >
            Print / Save PDF
          </button>
        </div>

        <header className="border-b border-gray-200 pb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500">GetAxe Technologies</p>
          <h1 className="text-2xl font-bold mt-1">Quotation</h1>
          <p className="text-sm text-gray-500 mt-2">
            Ref: {quote.id.slice(0, 8).toUpperCase()} · {new Date(quote.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm mt-1">
            Status: <strong>{quote.status}</strong>
          </p>
        </header>

        <section className="mt-6 space-y-4 text-sm">
          <div>
            <p className="text-xs uppercase text-gray-500">Solution</p>
            <p className="mt-1 whitespace-pre-wrap">{quote.solution_summary}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-gray-500">Pillar</p>
            <p className="mt-1 capitalize">{quote.pillar}</p>
          </div>
          {quote.qualification && Object.keys(quote.qualification).length > 0 && (
            <div>
              <p className="text-xs uppercase text-gray-500">Qualification</p>
              <ul className="mt-1 list-disc pl-5">
                {Object.entries(quote.qualification).map(([k, v]) =>
                  v ? (
                    <li key={k}>
                      {k}: {v}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}
        </section>

        <section className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Item</th>
                <th className="text-right p-3">Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Setup / implementation</td>
                <td className="p-3 text-right tabular-nums">
                  {quote.approved_setup_fee != null
                    ? Number(quote.approved_setup_fee).toLocaleString()
                    : "—"}
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Monthly subscription</td>
                <td className="p-3 text-right tabular-nums">
                  {quote.approved_monthly_fee != null
                    ? Number(quote.approved_monthly_fee).toLocaleString()
                    : "—"}
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">One-off / other</td>
                <td className="p-3 text-right tabular-nums">
                  {quote.approved_one_off != null
                    ? Number(quote.approved_one_off).toLocaleString()
                    : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {quote.approved_notes && (
          <p className="mt-4 text-sm text-gray-600">Notes: {quote.approved_notes}</p>
        )}

        <footer className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-2">
          <p>Payment is payable to GetAxe Technologies only (official Paybill / bank).</p>
          <p>This quotation is valid subject to scope confirmation. Prices may change if requirements change.</p>
          <p>getaxekenya.com · +254 736 889 880</p>
        </footer>
      </div>
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
