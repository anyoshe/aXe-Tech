export const dynamic = "force-dynamic";
import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import {
  TrustBar,
  HomePillars,
  FeaturedProducts,
  ErpHighlight,
  ProcessSection,
} from "../components/HomeSections";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testmonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default async function Home() {
  return (
    <main className="bg-[var(--color-bg-dark)] text-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <HomePillars />
      <FeaturedProducts />
      <ErpHighlight />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
