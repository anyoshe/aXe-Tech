import { normalizeImageList } from "@/utils/image-utils";

/** Local catalogue photos ship with the app, so seeded products still have a
 * working image when an older Supabase row contains a stale /samples path. */
export const catalogueImageFallbacks: Record<string, string[]> = {
  "refurb-business-laptop": ["/products/hp-elitebook-840-g6.jpg"],
  "new-corporate-laptop": ["/products/hp-probook-440-g10.png"],
  "office-lab-desktop-set": ["/products/desktop-workstation.jpg"],
  "school-lab-10pc": ["/products/desktop-workstation.jpg", "/products/tp-link-tl-sg108.jpg", "/products/apc-back-ups-600.jpg", "/products/cat6-305m-copper-box.png"],
  "institution-ict-lab-20pc": ["/products/desktop-workstation.jpg", "/products/epson-eb-e01.png", "/products/smart-board-mx-65.png", "/products/tp-link-tl-sg108.jpg"],
  "mono-laser-printer": ["/products/hp-laser-107w.png"],
  "ecotank-aio": ["/products/epson-ecotank-l3250.jpg"],
  "office-photocopier-mfp": ["/products/canon-imagerunner-1643i.jpg"],
  "enterprise-wifi-ap": ["/products/unifi-u6-plus.jpg"],
  "gigabit-switch": ["/products/tp-link-tl-sg108.jpg"],
  "line-interactive-ups": ["/products/apc-back-ups-600.jpg"],
  "multimedia-projector": ["/products/epson-eb-e01.png"],
  "interactive-board-65": ["/products/smart-board-mx-65.png"],
  "keyboard-mouse-combo": ["/products/logitech-mk120.png"],
  "printer-ink-toner": ["/products/epson-103-ink-bottles.jpg", "/products/hp-151a-toner.png"],
  "cat6-cable-connectors": ["/products/cat6-305m-copper-box.png"],
};

export function productImageList(product: { id: string; images?: string[]; image?: string }) {
  const images = normalizeImageList(product.images?.length ? product.images : product.image ? [product.image] : []);
  const fallbacks = catalogueImageFallbacks[product.id] ?? [];
  const useFallbacks = images.length === 0 || images.every((image) => image.startsWith("/samples/"));
  const selected = useFallbacks ? fallbacks : images;
  return selected.length ? selected : fallbacks;
}
