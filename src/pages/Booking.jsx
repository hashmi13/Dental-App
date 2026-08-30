import { useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaShieldAlt, FaClock } from 'react-icons/fa';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

function Booking() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8 text-center bg-gradient-to-b from-cyan-50 via-white to-gray-50 pt-20">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/3] mb-4 shadow-2xl rounded-2xl overflow-hidden border border-cyan-100">
          <img 
            src="/signin_img.jpeg" 
            alt="Sign in illustration" 
            className="w-full h-full object-cover"
          />
        </div>
       
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">Sign In to Book Your Visit</h2>
          <p className="text-gray-600 text-sm">Create an account or sign in to manage your appointments seamlessly.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm justify-center">
          <SignInButton mode="modal">
            <button className="bg-cyan-600 text-white px-8 py-3 rounded-xl hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-sm sm:text-base">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-white text-cyan-700 border border-cyan-600 px-8 py-3 rounded-xl hover:bg-cyan-50 transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-cyan-50/70 via-white to-gray-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10"
        >
          {/* <span className="px-4 py-1.5 bg-cyan-100 text-cyan-800 text-xs font-extrabold uppercase tracking-widest rounded-full">
            Online Appointment System
          </span> */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Schedule Your Visit
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Book top-rated dental care with instant Email confirmation and secure Stripe payment options.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-1.5 text-cyan-800 font-medium">
              <FaUserCheck className="text-cyan-600 text-base" />
              <span>Certified Dentists</span>
            </div>
            <div className="flex items-center space-x-1.5 text-cyan-800 font-medium">
              <FaShieldAlt className="text-cyan-600 text-base" />
              <span>256-Bit Encrypted</span>
            </div>
            <div className="flex items-center space-x-1.5 text-cyan-800 font-medium">
              <FaClock className="text-cyan-600 text-base" />
              <span>Instant Confirmation</span>
            </div>
          </div>
        </motion.div>

        {/* Main Glassmorphism Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl border border-cyan-100 rounded-3xl shadow-2xl p-6 sm:p-10 relative overflow-hidden"
        >
          {/* <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600"></div> */}
          <BookingForm />
        </motion.div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default Booking;
