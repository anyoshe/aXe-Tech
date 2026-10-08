/** Pilot commission rates — adjust after 60-day pilot */

export type Pillar = "equip" | "connect" | "run" | "support" | "mixed";

/** Hardware: % of gross profit */
export const HARDWARE_GP_PCT = 0.25;

/** Labs/network: % of labour/project margin (we use gross_profit field) */
export const CONNECT_MARGIN_PCT = 0.08;

/** Software setup: % of setup fee collected */
export const SETUP_FEE_PCT = 0.15;

/** Subscription months 1–12 */
export const SUB_YEAR1_PCT = 0.15;

/** Subscription year 2+ */
export const SUB_YEAR2_PCT = 0.08;

/** Support/maintenance contracts */
export const SUPPORT_RECURRING_PCT = 0.08;

export function computeDealCommission(opts: {
  pillar: string;
  invoice_amount: number;
  cost_amount: number;
  is_setup?: boolean;
}): { pct: number; basis: number; amount: number } {
  const gp = Math.max(0, opts.invoice_amount - opts.cost_amount);
  const pillar = opts.pillar || "equip";

  if (pillar === "equip") {
    return { pct: HARDWARE_GP_PCT, basis: gp, amount: round2(gp * HARDWARE_GP_PCT) };
  }
  if (pillar === "connect") {
    return { pct: CONNECT_MARGIN_PCT, basis: gp, amount: round2(gp * CONNECT_MARGIN_PCT) };
  }
  if (pillar === "run" || opts.is_setup) {
    // treat invoice as setup fee when run
    return {
      pct: SETUP_FEE_PCT,
      basis: opts.invoice_amount,
      amount: round2(opts.invoice_amount * SETUP_FEE_PCT),
    };
  }
  if (pillar === "support") {
    return {
      pct: SUPPORT_RECURRING_PCT,
      basis: opts.invoice_amount,
      amount: round2(opts.invoice_amount * SUPPORT_RECURRING_PCT),
    };
  }
  // mixed: use GP mid rate
  return { pct: 0.15, basis: gp, amount: round2(gp * 0.15) };
}

export function computeSubCommission(monthly: number, monthsActive: number) {
  const pct = monthsActive <= 12 ? SUB_YEAR1_PCT : SUB_YEAR2_PCT;
  return { pct, basis: monthly, amount: round2(monthly * pct) };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export const SOFTWARE_TIERS = [
  {
    id: "starter",
    name: "Starter",
    setup: 15000,
    monthlyMin: 1500,
    monthlyMax: 2500,
    persona: "Micro-SME / single POS",
  },
  {
    id: "business",
    name: "Business",
    setup: 35000,
    monthlyMin: 4500,
    monthlyMax: 6000,
    persona: "Growing SME / multi-user",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    setup: 75000,
    monthlyMin: 10000,
    monthlyMax: 50000,
    persona: "Schools / multi-branch",
  },
] as const;
