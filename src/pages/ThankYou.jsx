import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCalendarAlt, FaClock, FaUser, FaTooth, FaHome, FaConciergeBell } from "react-icons/fa";
import Footer from "../components/Footer";

function ThankYou() {
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState({
    name: "Valued Patient",
    service: "Dental Care",
    date: "Confirmed Date",
    time: "Confirmed Time",
    paymentStatus: "Paid",
  });

  useEffect(() => {
    // Extract query parameters from URL if redirected from booking or Stripe
    const name = searchParams.get("name");
    const service = searchParams.get("service");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const status = searchParams.get("status");

    setBookingDetails({
      name: name || "Valued Patient",
      service: service || "Dental Care",
      date: date || new Date().toLocaleDateString(),
      time: time || "Scheduled Time Slot",
      paymentStatus: status === "success" ? "Paid via Stripe" : "Booked (Pay at Clinic)",
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-cyan-50 via-white to-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-lg border border-cyan-100 rounded-3xl shadow-2xl p-6 sm:p-10 text-center space-y-8 relative overflow-hidden"
        >
          {/* Decorative Top Banner Accent */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500"></div>

          {/* Animated Success Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner"
          >
            <FaCheckCircle className="text-5xl sm:text-6xl" />
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Thank You for Booking!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
              Your appointment has been successfully scheduled. We’ve sent a detailed confirmation on your email.
            </p>
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-cyan-50/70 to-blue-50/50 border border-cyan-100 rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-cyan-900 border-b border-cyan-200/60 pb-3 flex items-center gap-2">
              <FaTooth className="text-cyan-600" /> Appointment Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="flex items-center space-x-3 text-gray-700">
                <FaUser className="text-cyan-600 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase">Patient</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <FaTooth className="text-cyan-600 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase">Service</span>
                  <span className="font-semibold text-cyan-700">{bookingDetails.service}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <FaCalendarAlt className="text-cyan-600 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase">Date</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.date}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <FaClock className="text-cyan-600 shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase">Time Slot</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.time}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-cyan-200/60 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-500">Payment Status:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 font-semibold rounded-full border border-green-200">
                {bookingDetails.paymentStatus}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/services"
              className="flex-1 inline-flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-sm hover:shadow"
            >
              <FaConciergeBell className="text-cyan-600" />
              <span>Explore Services</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default ThankYou;
