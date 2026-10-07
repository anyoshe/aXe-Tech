import SchoolERPPage from "@/components/SchoolERP";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "School ERP for Kenyan Schools | GetAxe Kenya",
  description:
    "School ERP for students, fees and operations. Try the demo and request a quotation from GetAxe Kenya.",
};

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
