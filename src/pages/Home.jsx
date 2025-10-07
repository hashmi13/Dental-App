import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeatureSection";
import TreatmentSection from "../components/TreatmentSection";
import DoctorSection from "../components/DoctorSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import lenis from "../lenisScroll";

function Home() {
  lenis();
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TreatmentSection />
      <DoctorSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}

export default React.memo(Home);
