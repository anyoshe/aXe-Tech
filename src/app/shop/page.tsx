import type { Metadata } from "next";
import ICTProductsPage from "@/components/ProductPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ICT Products Shop | GetAxe Kenya",
  description:
    "Browse laptops, lab equipment, networking and ICT hardware from GetAxe Kenya. Request a quote on WhatsApp.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)]">
        <ICTProductsPage />
      </main>
      <Footer />
    </>
  );
}
