import ComputerLabSetupPage from "@/components/ComputerLabSetup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Computer Lab Setup for Schools | GetAxe Kenya",
  description:
    "Design, supply and install permanent computer labs for Kenyan schools — networking, workstations, training and support. Request a quotation from GetAxe.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ComputerLabSetupPage />
      </main>
      <Footer />
    </>
  );
}
