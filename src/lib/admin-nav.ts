/** Shared CRM top nav for all admin pages */
export function adminCrmNav(active: string) {
  const items = [
    { href: "/admin/overview", label: "Overview" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/partners", label: "Partners" },
    { href: "/admin/quotes", label: "Quotes" },
    { href: "/admin/deals", label: "Deals" },
    { href: "/admin/jobs", label: "Jobs" },
    { href: "/admin/tickets", label: "Tickets" },
    { href: "/admin/subscriptions", label: "Subs" },
    { href: "/admin/warranties", label: "Warranty" },
    { href: "/admin/campaigns", label: "Campaigns" },
    { href: "/admin/commissions", label: "Commissions" },
  ];
  return items.map((item) => ({
    ...item,
    active:
      active === item.href ||
      active === item.label.toLowerCase() ||
      item.href.endsWith(`/${active}`),
  }));
}
