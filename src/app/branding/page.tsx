// app/branding/page.tsx

import Navbar from "@/components/Navbar";
import BrandingHero from "@/components/Branding";

export default function BrandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <BrandingHero />
      </main>
    </>
  );
}
