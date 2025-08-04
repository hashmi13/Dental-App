import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 z-50 px-4 md:px-8 py-3 shadow-md bg-transparent backdrop-blur-2xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
     
        <Link to="/" className="text-2xl font-bold text-cyan-600 hover:text-cyan-700 transition-colors">
          <img src="/logo-1.png" alt="Logo" className="h-10" />
        </Link>

   
        <button
          className="text-3xl md:hidden focus:outline-none transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? "✕" : "☰"}
          </motion.span>
        </button>

   
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-cyan-800 pb-1 border-b-2 border-transparent hover:border-gray-600 transition-all">
            Home
          </Link>
          <Link to="/services" className="text-cyan-800 pb-1 border-b-2 border-transparent hover:border-gray-600 transition-all">
            Services
          </Link>
          <Link to="/about" className="text-cyan-800 pb-1 border-b-2 border-transparent hover:border-gray-600 transition-all">
            About Us
          </Link>
          <Link to="/contact" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all">
            Contact Us →
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
             <button className="flex items-center gap-1 text-cyan-700  border border-cyan-500  py-1.5 px-3 py-1 rounded-md hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition">
              Sign in <FaCircleUser />
             </button>
            </SignInButton>
            
          </SignedOut>

          <SignedIn>
            <div className="ml-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-white md:hidden shadow-md z-40"
            >
              <div className="flex flex-col items-center gap-4 p-4">
                <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-cyan-600">
                  Home
                </Link>
                <Link to="/services" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-cyan-600">
                  Services
                </Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-cyan-600">
                  About Us
                </Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="inline-block bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all">
                  Contact Us →
                </Link>

                <SignedOut>
                  <SignInButton mode="modal">
                     <button className="flex items-center gap-1 text-cyan-700  border border-cyan-500  py-1.5 px-3 py-1 rounded-md hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition">
              Sign in <FaCircleUser />
             </button>
                  </SignInButton>
                 
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
