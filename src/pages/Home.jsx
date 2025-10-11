import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeatureSection";
import TreatmentSection from "../components/TreatmentSection";
import DoctorSection from "../components/DoctorSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";


function Home() {
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
