export type PartnerStatus =
  | "APPLIED"
  | "SCREENING"
  | "APPROVED"
  | "TRAINING"
  | "CERTIFIED"
  | "ACTIVE"
  | "SUSPENDED"
  | "INACTIVE";

export type LeadStage =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "DISCOVERY"
  | "DEMO"
  | "QUOTE_REQUEST"
  | "QUOTE_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST"
  | "PAYMENT"
  | "DELIVERY";

export const PARTNER_STATUSES: PartnerStatus[] = [
  "APPLIED",
  "SCREENING",
  "APPROVED",
  "TRAINING",
  "CERTIFIED",
  "ACTIVE",
  "SUSPENDED",
  "INACTIVE",
];

export const LEAD_STAGES: LeadStage[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "DISCOVERY",
  "DEMO",
  "QUOTE_REQUEST",
  "QUOTE_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
  "PAYMENT",
  "DELIVERY",
];
