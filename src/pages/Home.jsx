import React, { Suspense, lazy, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import TestimonialCarousel from './testimonials';
import { FaFacebookF, FaTwitter, FaYoutube, FaPinterest, FaLinkedinIn, FaTiktok, FaInstagram } from "react-icons/fa";
import lenis from '../lenisScroll'



const TreatmentCard = lazy(() => import("../components/TreatmentCard"));
const DoctorCard = lazy(() => import("./DoctorCard"));

const LoadingFallback = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

function Home() {
  lenis()
  const [activeTreatment, setActiveTreatment] = useState(null);
  const toggleTreatment = (index) => {
    setActiveTreatment(activeTreatment === index ? null : index);
  };

  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <motion.section
      className="w-full bg-white min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 px-4 py-7 md:py-20">

        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            <span className="text-cyan-500">Crafting Smiles</span><br />
            <span className="text-black font-extrabold">That Speak for Themselves</span>
          </h1>

          <Link
            to="/booking"
            className="inline-block md:ml-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 mt-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Book Appointment →
          </Link>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            interval={3000}
            className="w-full max-w-xl sm:max-w-md lg:max-w-md xl:max-w-lg 2xl:max-w-xl rounded-2xl"
          >
            <div>
              <img
                src="/wmremove-transformed.webp"
                alt="Smiling woman 1"
                className="rounded-2xl"
                loading="lazy"
              />
            </div>
            <div>
              <img
                src="/crousel-img-1.webp"
                alt="Smiling woman 2"
                className="rounded-2xl"
                loading="lazy"
              />
            </div>
            <div>
              <img
                src="/crousel-img-2.webp"
                alt="Smiling woman 3"
                className="rounded-2xl"
                loading="lazy"
              />
            </div>
          </Carousel>
        </motion.div>

      </div>
    </motion.section>

      {/* FEATURES SECTION */}
      <Suspense fallback={<LoadingFallback />}>
        <motion.section
          className="w-full px-4 py-16 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎧", title: "Free Consultation", description: "We offer flexible appointment scheduling." },
              { icon: "🩺", title: "Expert Dentist", description: "Our team boasts years of expertise." },
              { icon: "⭐", title: "High User Rating", description: "We offer the latest dental techniques." },
              { icon: "🦷", title: "Best Equipment", description: "We provide modern, stress-free care." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-lg p-6 text-center bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ scale: 1.11 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 dark:text-gray-200 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </Suspense>

      {/* TREATMENT SECTION */}
      <Suspense fallback={<LoadingFallback />}>
        <motion.section
          className="w-full px-4 py-16 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto text-center mb-12">
            <span className="text-black font-medium uppercase tracking-widest text-sm">
              Satisfy Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-cyan-600 mt-2">
              The Best Dental Treatment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { title: "Teeth Whitening", description: "Enhance whiteness", image: "/teeth-whiting.webp" },
              { title: "Dental Implant", description: "Artificial tooth roots", image: "/dental-implant.webp" },
              { title: "Teeth Fillings", description: "Repair cavities", image: "/teeth-filling.webp" },
              { title: "Oral Surgery", description: "Extractions & implants", image: "/oral-surgery.webp" },
              { title: "Crown & Bridges", description: "Restore missing teeth", image: "/Crown & Bridges.webp" },
              { title: "Periodontal Care", description: "Gum health", image: "/Periodontal-Care.webp" },
            ].map((treatment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <TreatmentCard
                  {...treatment}
                  isActive={activeTreatment === index}
                  onToggle={() => toggleTreatment(index)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <DoctorCard />
        </motion.div>
      </Suspense>

   
      <div className='-mt-5'>
        
        <TestimonialCarousel />
      </div>


      {/* FOOTER */}
      <motion.footer
        className="bg-cyan-800 text-white px-6 py-10 space-y-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <img src="logo-1.png" alt="" className='h-20' />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["Home", "Services", "About Us", "Why Choose Us", "Testimonials", "Contact Us"].map((item, index) => (
                <li key={index} className={`${item === "Home" ? "text-green-400" : ""} hover:text-green-400 cursor-pointer`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Address</h3>
            <p className="text-sm">123 Dental Avenue, Cityville, State 12345, USA</p>
            <a href="#" className="text-green-400 text-sm underline mt-2 inline-block">View on Maps</a>
            <h3 className="text-xl font-semibold mt-6 mb-2">Inquiries</h3>
            <p className="text-sm"><a href="tel:+11234567890" className="hover:text-green-400">(123) 456-7890</a></p>
            <p className="text-sm"><a href="mailto:info@57dentcare.com" className="hover:text-green-400">info@57dentcare.com</a></p>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center border-t border-gray-600 pt-8">
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm mb-2">Stay Updated with our Latest News</p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row sm:items-center gap-2"
            >
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-md text-black"
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                →
              </button>
            </form>
          </div>
          <div className="flex gap-4 flex-wrap">
            {[FaFacebookF, FaTwitter, FaYoutube, FaPinterest, FaLinkedinIn, FaTiktok, FaInstagram].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="p-2 bg-gray-800 hover:bg-green-500 rounded-full transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </>
  );
}

export default React.memo(Home);
