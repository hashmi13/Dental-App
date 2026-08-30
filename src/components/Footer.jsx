import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaLinkedinIn,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-cyan-900 text-white px-6 py-12 md:py-16 space-y-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        
        <div className="flex flex-col items-start space-y-4">
          <img src="white_logo.png" alt="Logo" className="h-20 "  />
          <p className="text-sm text-gray-300">
            Your trusted dental care partner. Expert dental services for a healthy smile.
          </p>
        </div>

        

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 text-sm">
            24, Green Avenue, Sector 15, New Delhi, Delhi – 110015
          </p>
          <a
            href="#"
            className="text-green-400 text-sm underline mt-2 inline-block"
          >
            View on Maps
          </a>

          <h3 className="text-xl font-semibold mt-6 mb-2">Inquiries</h3>
          <p className="text-gray-300 text-sm">
            <a href="tel:+11234567890" className="hover:text-green-400">
              (123) 456-7890
            </a>
          </p>
          <p className="text-gray-300 text-sm">
            <a href="mailto:inf" className="hover:text-green-400">
              info@brightsmile.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6 gap-4">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Bright Smile. All rights reserved.
        </p>
        <div className="flex gap-3 flex-wrap">
          {[FaFacebookF, FaTwitter, FaYoutube, FaPinterest, FaLinkedinIn, FaTiktok, FaInstagram].map(
            (Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="p-2 bg-gray-800 hover:bg-green-500 rounded-full transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            )
          )}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
