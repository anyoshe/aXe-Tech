import SchoolERPPage from "@/components/SchoolERP";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SchoolErpPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <SchoolERPPage />
      </main>
      <Footer />
    </>
  );
}
