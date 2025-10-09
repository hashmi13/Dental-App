import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import TestimonialCarousel from './testimonials';
import Visits from '../pages/addressVisite';

// Services Data
const services = [
  {
    image: "/teeth-filling.webp",
    title: "General Dentistry",
    description: "Comprehensive exams, teeth cleaning, and cavity care for long-term oral health.",
    details:
      "Our general dentistry covers routine checkups, plaque removal, fillings, and preventive guidance to help you maintain optimal oral hygiene."
  },
  {
    image: "/cosmetic_surgery-min.png",
    title: "Cosmetic Dentistry",
    description: "Smile-enhancing procedures like veneers, bonding, and reshaping.",
    details:
      "We offer a wide range of cosmetic treatments to improve teeth appearance—whitening, contouring, and bonding for a confident, natural smile."
  },
  {
    image: "/X_ray-min.png",
    title: "Digital X-Rays",
    description: "Quick, detailed imaging with reduced radiation exposure.",
    details:
      "Our low-radiation digital x-rays ensure precision diagnostics for early detection of issues like decay, infections, or bone loss."
  },
  {
    image: "/oral-surgery.webp",
    title: "Oral Surgery",
    description: "Minor surgical procedures like extractions and gum care.",
    details:
      "Safe and painless surgical solutions including wisdom tooth extractions, minor bone grafts, and gum surgeries—performed with care."
  },
  {
    image: "/teeth-whiting.webp",
    title: "Teeth Whitening",
    description: "Brighter smiles in one visit using modern whitening techniques.",
    details:
      "Our advanced in-clinic whitening removes stains from coffee, smoking, or aging—safe, effective, and noticeable within an hour."
  },
  {
    image: "/brace_01-min.png",
    title: "Braces & Aligners",
    description: "Discreet solutions for crooked or misaligned teeth.",
    details:
      "We provide both traditional braces and clear aligners (like Invisalign) to align teeth, improve bite, and enhance facial structure."
  }
];

// Service Treatment Section Data (8 items)
const treatments = [
  { image: "/RCT.gif", name: "Root Canal" },
  { image: "/Crowns.gif", name: "Dental Crown" },
  { image: "/Braces.gif", name: "Braces" },
  { image: "/Laser-Treatment.gif", name: "Laser Dentistry" },
  { image: "/Wisdom-Tooth.gif", name: "Wisdom Teeth Removal" },
  { image: "/clear_aligner.gif", name: "Clear Aligners" },
  { image: "/Dental-Fillings.gif", name: "Dental Brace" },
  { image: "/Gum-Treatment.gif", name: "Gum Treatment" },
];

const stats = [
  { label: "Happy Patients", end: 10000, suffix: "+", description: "Thousands trust us with their smiles." },
  { label: "Satisfaction Rate", end: 98, suffix: "%", description: "Rated excellent by our patients." },
  { label: "Referral Rate", end: 85, suffix: "%", description: "High patient-to-patient recommendation." },
  { label: "Years of Experience", end: 15, suffix: "+", description: "Decades of combined team experience." }
];

const faqs = [
  {
    question: "What should I expect during my first visit?",
    answer: "You'll receive a full dental exam, x-rays if needed, and a consultation about your oral health goals."
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept most dental insurances and offer payment plans for uncovered treatments."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can use our online booking system or call our clinic directly to schedule a visit."
  },
  {
    question: "Is teeth whitening safe?",
    answer: "Absolutely. We use ADA-approved whitening solutions that are safe for enamel and gum tissues."
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// Custom component for count-up with intersection observer
const CountUpOnScroll = ({ end, suffix, duration = 2.5 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <CountUp end={end} suffix={suffix} duration={duration} />
      ) : (
        <span>0{suffix}</span>
      )}
    </div>
  );
};

const ServicesWithStatsAndFAQ = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const statsRef = useRef(null);

  return (
    <>
      {/* Services Section */}
      <motion.section
        className="w-full px-4 py-16 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mt-5 mb-12 text-gray-800"
            variants={fadeIn}
          >
            Our Dental Services
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-b from-cyan-50 to-cyan-500 text-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                {/* Image with new style */}
                <div className="mb-4 w-full flex justify-center">
                  {service.image && (
                    <div className="overflow-hidden rounded-2xl shadow-lg w-full h-0 pb-[66.66%] relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transform transition duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm mb-2">{service.description}</p>
                <p className="text-xs text-gray-200">{service.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="w-full px-4 py-16 bg-gradient-to-b from-cyan-100 to-cyan-100"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Treatment at Bright Smile
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-6">
            {treatments.map((treatment, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                variants={fadeIn}
                style={{ width: "182px", height: "170px" }}
              >
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="rounded-full object-cover mb-2"
                  style={{ width: "90px", height: "90px" }}
                />
                <p className="text-center text-lg font-medium text-gray-700">{treatment.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section 
        className="bg-cyan-100 py-16 px-4"
        ref={statsRef}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center border-r last:border-none px-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, threshold: 0.3 }}
                variants={fadeIn}
              >
                <h3 className="text-3xl font-extrabold text-cyan-700 mb-1">
                  <CountUpOnScroll 
                    end={stat.end} 
                    suffix={stat.suffix} 
                    duration={2.5} 
                  />
                </h3>
                <p className="font-semibold text-gray-800">{stat.label}</p>
                <p className="text-gray-500 text-sm mt-2">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div>
        <TestimonialCarousel />
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border-b pb-4 cursor-pointer"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeIn}
                onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium text-gray-800">{faq.question}</h4>
                  <span className="text-2xl">{activeFAQ === i ? "−" : "+"}</span>
                </div>
                {activeFAQ === i && (
                  <p className="text-gray-600 mt-2 text-sm">{faq.answer}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-5">
            <Visits />
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesWithStatsAndFAQ;