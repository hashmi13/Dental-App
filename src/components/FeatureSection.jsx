import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "🎧",
    title: "Free Consultation",
    description: "Get expert advice for your dental needs at no cost.",
  },
  {
    icon: "🩺",
    title: "Expert Dentist",
    description: "Highly trained professionals providing top-notch care.",
  },
  {
    icon: "⭐",
    title: "High User Rating",
    description: "Trusted by hundreds of satisfied patients.",
  },
  {
    icon: "🦷",
    title: "Best Equipment",
    description: "Modern dental equipment for precise treatments.",
  },
  {
    icon: "💎",
    title: "Premium Services",
    description: "High-quality treatments for all dental procedures.",
  },
];

// Parent animation (stagger children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delay between cards
    },
  },
};

// Each card animation
const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

const FeaturesSection = () => {
  return (
    <section className="w-full py-20 bg-cyan-100 ">
      <motion.div
        className="flex justify-center gap-6 flex-wrap p-2 lg:flex-nowrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // triggers when 30% is in view
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="relative w-full sm:w-56 md:w-60 lg:w-64 
                       bg-white border border-black rounded-xl p-6 flex flex-col items-center text-center shadow-lg overflow-hidden
                       group"
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
          >
            {/* Shutter background from bottom */}
            <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-cyan-500 to-cyan-300 transition-all duration-500 ease-in-out group-hover:h-full z-0"></div>

            {/* Content */}
            <div className="relative z-10 text-black group-hover:text-white flex flex-col items-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
