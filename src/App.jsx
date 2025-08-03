import { Routes, Route } from 'react-router-dom';
import {
  SignIn,
  SignUp,
  UserButton,
  SignedIn
} from '@clerk/clerk-react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Services from './pages/services';

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      

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
