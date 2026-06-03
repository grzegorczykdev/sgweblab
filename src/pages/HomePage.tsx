import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

const WhyMeSection = lazy(() => import("@/components/WhyMeSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const LeadMagnetSection = lazy(() => import("@/components/LeadMagnetSection"));

const HomePage = () => {
  return (
    <main id="main">
      <HeroSection />
      <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
        <WhyMeSection />
        <ServicesSection />
        <LeadMagnetSection />
      </Suspense>
    </main>
  );
};

export default HomePage;
