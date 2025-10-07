import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TreatmentCard from "../components/TreatmentCard";

gsap.registerPlugin(ScrollTrigger);

const treatments = [
  { title: "Teeth Whitening", description: "Enhance whiteness", image: "/teeth-whiting.webp" },
  { title: "Dental Implant", description: "Artificial tooth roots", image: "/dental-implant.webp" },
  { title: "Teeth Fillings", description: "Repair cavities", image: "/teeth-filling.webp" },
  { title: "Oral Surgery", description: "Extractions & implants", image: "/oral-surgery.webp" },
  { title: "Crown & Bridges", description: "Restore missing teeth", image: "/Crown & Bridges.webp" },
  { title: "Periodontal Care", description: "Gum health", image: "/Periodontal-Care.webp" },
];

const TreatmentSection = () => {
  const [activeTreatment, setActiveTreatment] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const toggleTreatment = (i) =>
    setActiveTreatment(activeTreatment === i ? null : i);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🌟 Staggered animation for each card when it comes into view
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2, // Staggered delay for each card
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto text-center mb-12 px-4">
        <span className="text-black font-medium uppercase tracking-widest text-sm">
          Satisfy Solution
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-cyan-600 mt-6">
          The Best Dental Treatment
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {treatments.map((t, idx) => (
          <div
            key={idx}
            ref={addToRefs}
            className="w-full sm:w-auto transform-gpu"
          >
            <TreatmentCard
              {...t}
              isActive={activeTreatment === idx}
              onToggle={() => toggleTreatment(idx)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TreatmentSection;
