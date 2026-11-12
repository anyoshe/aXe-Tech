import { normalizeImageList } from "@/utils/image-utils";

/** Local catalogue photos ship with the app, so seeded products still have a
 * working image when an older Supabase row contains a stale /samples path. */
export const catalogueImageFallbacks: Record<string, string[]> = {
  "lab-desktop-setup": ["/products/desktop-workstation.jpg"],
  "repair-service": ["/samples/close-up-man-repairing-computer-chips.jpg"],
  "erp-school": ["/samples/ERp.jpg"],
  "web-business": ["/samples/landing1.jpg"],
  "ecommerce-starter": ["/samples/ecommerce.jpg"],
  "brand-pack": ["/samples/branding.jpg"],
  "lap-hp-840": ["/products/hp-elitebook-840-g6.jpg"],
  "print-hp-laser": ["/products/hp-laser-107w.png"],
  "net-router-office": ["/products/tp-link-tl-sg108.jpg"],
  "lap-dell-7400": ["/samples/dell7400.jpeg"],
  "refurb-business-laptop": ["/products/hp-elitebook-840-g6.jpg"],
  "new-corporate-laptop": ["/products/hp-probook-440-g10.png"],
  "office-lab-desktop-set": ["/products/desktop-workstation.jpg"],
  "school-lab-10pc": ["/products/desktop-workstation.jpg", "/products/tp-link-tl-sg108.jpg", "/products/apc-back-ups-es525-cc0.jpg", "/products/cat6-305m-copper-box.png"],
  "institution-ict-lab-20pc": ["/products/desktop-workstation.jpg", "/products/epson-eb-e01.png", "/products/smart-board-mx-65.png", "/products/tp-link-tl-sg108.jpg"],
  "mono-laser-printer": ["/products/hp-laser-107w.png"],
  "ecotank-aio": ["/products/epson-ecotank-l3250.jpg"],
  "office-photocopier-mfp": ["/products/canon-imagerunner-1643i.jpg"],
  "enterprise-wifi-ap": ["/products/unifi-u6-plus.jpg"],
  "gigabit-switch": ["/products/tp-link-tl-sg108.jpg"],
  "line-interactive-ups": ["/products/apc-back-ups-es525-cc0.jpg"],
  "multimedia-projector": ["/products/epson-eb-e01.png"],
  "interactive-board-65": ["/products/smart-board-mx-65.png"],
  "keyboard-mouse-combo": ["/products/logitech-mk120.png"],
  "business-webcam": ["/products/logitech-webcam-commons.png"],
  "printer-ink-toner": ["/products/epson-103-ink-bottles.jpg", "/products/hp-151a-toner.png"],
  "cat6-cable-connectors": ["/products/cat6-305m-copper-box.png"],
};

const localCatalogueImages = new Set(Object.values(catalogueImageFallbacks).flat());
const replacedCatalogueImages: Record<string, string> = {
  "apc-back-ups-600.jpg": "/products/apc-back-ups-es525-cc0.jpg",
};

function resolveLocalCatalogueImage(image: string): string {
  const filename = image.split(/[/?#]/).filter(Boolean).pop();
  if (!filename) return image;
  if (replacedCatalogueImages[filename]) return replacedCatalogueImages[filename];

  const localPath = `/products/${filename}`;
  if (localCatalogueImages.has(localPath)) return localPath;
  return image;
}

export function productImageList(product: { id: string; images?: string[]; image?: string }) {
  const images = normalizeImageList(product.images?.length ? product.images : product.image ? [product.image] : [])
    .map(resolveLocalCatalogueImage);
  const fallbacks = catalogueImageFallbacks[product.id] ?? [];
  const usableImages = images.filter((image) => !image.startsWith("/samples/"));

  if (usableImages.length) return usableImages;
  if (fallbacks.length) return fallbacks;
  return images;
}
