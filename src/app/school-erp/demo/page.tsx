import React from "react";
import SchoolERPDemo from "../../../components/SchoolERPDemo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "School ERP Demo | GetAxe Kenya",
  description:
    "Interactive demo of GetAxe School ERP — see students, fees, library and operations. Request a quotation for your school.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <SchoolERPDemo />
      </main>
      <Footer />
    </>
  );
}
