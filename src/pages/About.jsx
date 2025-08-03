import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import Visit from '../pages/addressVisite'

const DentalCareLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative bg-pink-100 rounded-full aspect-square max-w-md mt-2.5 overflow-hidden">
              <img 
                src="/crousel-img-1.webp" 
                alt="Dental professional with patient" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative dots */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 lg:left-8 lg:translate-x-0">
              <div className="grid grid-cols-8 gap-2">
                {Array.from({length: 32}).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
          
            
            <h1 className="text-3xl mt-11 sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Patient-Centered Care
            </h1>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              We are dedicated to providing exceptional dental care in a warm and welcoming environment...
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                At 57Dentcare, our mission is to promote optimal oral health and create lasting, confident smiles.
              </p>
            </div>
            
            <Link
              to="/contact"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 inline-flex items-center gap-2 shadow-md"
              aria-label="Learn more about the service"
            >
              Learn More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

          </motion.div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="mb-4">
              <span className="text-green-500 font-medium text-xl   uppercase tracking-wide">Why Choose Us</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Comprehensive<br />Dental Services
            </h2>
            
            <div className="space-y-6">
              {/* Repeated features */}
              {[
                {
                  title: 'Experienced Professionals:',
                  desc: 'Our team consists of highly skilled and knowledgeable dental experts.'
                },
                {
                  title: 'State-of-the-Art Technology:',
                  desc: 'We invest in the latest dental technology to provide the best care.'
                },
                {
                  title: 'Compassionate Care:',
                  desc: 'We treat every patient with empathy and understanding.'
                },
                {
                  title: 'Patient Education:',
                  desc: 'We believe in educating our patients about their oral health to make informed decisions.'
                },
                {
                  title: 'Convenient Hours:',
                  desc: 'We offer flexible scheduling to accommodate your busy life.'
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative bg-yellow-200 rounded-3xl aspect-square max-w-md mx-auto  overflow-hidden">
              <img 
                src="/Periodontal-Care.webp" 
                alt="Happy patient after dental treatment" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

   
      
    </div>
  );
};

export default DentalCareLanding;
