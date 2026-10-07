import DigitalServicePage from "@/components/DigitalServices";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Digital Services — Brand & Web | GetAxe Kenya",
  description:
    "Brand identity, websites and digital support from GetAxe — complementary to ICT supply, labs and software. Request a quotation.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <DigitalServicePage />
      </main>
      <Footer />
    </>
  );
}
