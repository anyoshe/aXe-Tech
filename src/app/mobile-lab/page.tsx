import MobileLabPage from "@/components/MobileLab";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mobile Computer Labs for Schools | GetAxe Kenya",
  description:
    "Scheduled mobile ICT lab sessions for Kenyan schools — devices, support and a clear path to permanent labs. Request a quotation from GetAxe.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <MobileLabPage />
      </main>
      <Footer />
    </>
  );
}
