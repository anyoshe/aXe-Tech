import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects | GetAxe Kenya",
  description:
    "Selected live projects by GetAxe — NeuroFlex Kenya, business management system, TJ-U Auto, School ERP and more.",
};

export default function PortfoliosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
