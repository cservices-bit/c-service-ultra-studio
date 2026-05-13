import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import StatsSection from "@/components/StatsSection";
import SoftwareSection from "@/components/SoftwareSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import NewsSection from "@/components/NewsSection";
import BusinessSection from "@/components/BusinessSection";
import AcademySection from "@/components/AcademySection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AcademySection />
      <Gallery />
      <StatsSection />
      <SoftwareSection />
      <NewsSection />
      <BusinessSection />
      <Testimonials />
      <FAQSection />
    </>
  );
}
