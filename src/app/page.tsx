export const dynamic = 'force-dynamic';
import '../../styles/globals.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import LatestPosts from '../components/LatestPosts';
import Testimonials from '../components/Testmonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';


export default async function Home() {

  return (
    <main className="bg-white text-black">
      <Hero />
      <Navbar />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
