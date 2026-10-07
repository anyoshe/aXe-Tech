import SoftwareERPPage from "@/components/SoftwareERP";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SoftwareErpPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <SoftwareERPPage />
      </main>
      <Footer />
    </>
  );
}
