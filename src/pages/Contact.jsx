import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    e.target.reset();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex items-center mt-16justify-center bg-white px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 border border-white/40">

        {/* Contact Info */}
        <div className="space-y-6  text-gray-800">
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-700">Contact Us</h2>
          <p className="text-base sm:text-lg">
            We’d love to hear from you. Reach out with any questions or concerns.
          </p>

          <div>
            <h4 className="font-semibold text-lg">📍 Address</h4>
            <p className="text-gray-700 text-sm sm:text-base">
              123 Dental Street, Healthcare City, NY 10001
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">📞 Phone</h4>
            <p className="text-gray-700 text-sm sm:text-base">+1 (555) 123-4567</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">✉️ Email</h4>
            <p className="text-gray-700 text-sm sm:text-base">info@smilenest.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block font-medium mb-1 text-sm sm:text-base">Name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1 text-sm sm:text-base">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block font-medium mb-1 text-sm sm:text-base">Subject</label>
              <input
                type="text"
                id="subject"
                required
                className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-medium mb-1 text-sm sm:text-base">Message</label>
              <textarea
                id="message"
                rows="4"
                required
                className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Success Popup */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center shadow-sm text-sm sm:text-base"
              >
                ✅ Message sent successfully! We’ll get back to you soon.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Contact;
