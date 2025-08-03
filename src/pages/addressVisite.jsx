import React from 'react';
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const images = [
  "/teeth-filling.webp",
  "/oral-sur-2.webp",
  "/crousel-img-2.webp",
  "/crousel-img-1.webp",
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const VisitUsSection = () => {
  return (
    <motion.section
      className="bg-[#f8f9f7] px-4 py-10 md:px-12 lg:px-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Image Grid */}
        <motion.div className="grid grid-cols-2 gap-3">
          {images.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`office ${i + 1}`}
              className="rounded-lg object-cover shadow-md"
              variants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="border-cyan-500 rounded-2xl border-2 p-6"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-semibold text-cyan-600 mb-4">Visit Us</h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            We’re conveniently located in the Denver Tech Center area.
            Find us on the 4th floor of the Triad Office Park building.
            Plenty of free parking available.
          </p>

          <div className="flex items-start gap-3 mb-4">
            <FaMapMarkerAlt className="text-cyan-600 mt-1" size={22} />
            <p className="text-slate-800 text-base">
              123 Dental Avenue, Cityville, State 12345, USA
            </p>
          </div>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-700 underline font-semibold block mb-6"
          >
            Get Directions
          </a>

          <div className="flex items-center gap-3">
            <FaRegClock className="text-cyan-600" size={22} />
            <p className="text-slate-800 text-base">Monday–Saturday: 7AM–9PM</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VisitUsSection;
