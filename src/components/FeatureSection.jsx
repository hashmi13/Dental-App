import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    image: "/fee_consultant.webp",
    title: "Free Consultation",
    description: "Get expert advice for your dental needs at no cost.",
  },
  {
    image: "/expert_dentist.webp",
    title: "Expert Dentist",
    description: "Highly trained professionals providing top-notch care.",
  },
  {
    image: "/high_rating_1.png",
    title: "High User Rating",
    description: "Trusted by hundreds of satisfied patients .",
  },
  {
    image: "/best_equipment.webp",
    title: "Best Equipment",
    description: "Modern dental equipment for precise treatments.",
  },
  {
    image: "/premium_service.webp",
    title: "Premium Services",
    description: "High-quality treatments for all dental procedures.",
  },
];

// Parent animation (stagger children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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
    <section className="w-full py-20 bg-cyan-100">
      <motion.div
        className="flex justify-center gap-6 flex-wrap p-2 lg:flex-nowrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="relative w-full sm:w-56 md:w-60 lg:w-64 
                       bg-transparent border-2 border-black/40 rounded-xl p-5 flex flex-col items-center text-center shadow-lg overflow-hidden
                       group"
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
          >
            {/* Shutter background from bottom */}
            <div className="absolute bottom-0 left-0 w-full  h-0 bg-gradient-to-t from-cyan-300 to-cyan-100 transition-all  duration-600 ease-out group-hover:h-full z-0"></div>

            {/* Content */}
            <div className="relative z-10  text-cyan-800 group-hover:text-black flex flex-col items-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-60   object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-md">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
