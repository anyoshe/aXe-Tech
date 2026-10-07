import NetworkingPage from "@/components/NetworkingPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Networking & Wi-Fi for Schools and Businesses | GetAxe Kenya",
  description:
    "LAN and Wi-Fi design and installation for schools, offices and ICT labs. Site survey, structured cabling and quotation from GetAxe Kenya.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <NetworkingPage />
      </main>
      <Footer />
    </>
  );
}
