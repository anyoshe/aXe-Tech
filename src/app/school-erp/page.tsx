import SchoolERPPage from "@/components/SchoolERP";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "School ERP for Kenyan Schools | GetAxe Kenya",
  description:
    "GetAxe School ERP for students, fees and operations. Sign up and try the live system, or request a quotation.",
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
