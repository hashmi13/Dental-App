import { Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import lenis from './hooks/lenis';
import '@fontsource/roboto'; // Defaults to weight 400

import {
  SignIn,
  SignUp,
  UserButton,
  SignedIn
} from '@clerk/clerk-react';
import './index.css'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Services from './pages/services';

function App() {
  lenis()
  return (
    <div>
      <Navbar />
      
      <ScrollToTop />
      <Routes>
        {/* Clerk Auth Routes */}
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Booking - auth handled inside Booking.jsx */}
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;
