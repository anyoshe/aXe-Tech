import ITSupportPage from "@/components/ItSupport";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "IT Support & Computer Repair | GetAxe Kenya",
  description:
    "Device repair, setup and IT maintenance for schools and businesses in Kenya. Assessment and quotation from GetAxe.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ITSupportPage />
      </main>
      <Footer />
    </>
  );
}
