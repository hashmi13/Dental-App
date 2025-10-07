import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const addToRefs = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        menuItemsRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );

    return () => tl.kill();
  }, []);

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile toggle
  const toggleMobileMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      gsap.to(hamburgerRef.current, { rotation: 180, duration: 0.3 });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => setIsOpen(false),
      });
      gsap.to(hamburgerRef.current, { rotation: 0, duration: 0.3 });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`w-full fixed top-0 left-0 z-50 px-4 md:px-8 py-3 transition-all duration-100 
        ${scrolled
          ? "backdrop-blur-lg bg-white/20  border-b border-white/20 shadow-md"
          : "bg-transparent border-b border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
  
        <Link
          to="/"
          ref={logoRef}
          className={`text-2xl font-bold transition-colors ${
            scrolled ? "text-black hover:text-cyan-700" : "text-white hover:text-cyan-400"
          }`}
        >
          <img src="/logo-1.png" alt="Logo" className="h-16" />
        </Link>

        {/* Mobile Hamburger */}
        <button
          ref={hamburgerRef}
          className={`text-3xl md:hidden focus:outline-none transition-colors ${
            scrolled ? "text-black" : "text-white"
          }`}
          onClick={toggleMobileMenu}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* <Link
            to="/"
            ref={addToRefs}
            className={`pb-1 border-b-2b  border-transparent transition-all ${
              scrolled
                ? "text-black hover:text-cyan-700 hover:border-cyan-700"
                : "text-cyan-300 hover:text-cyan-400 hover:border-cyan-400"
            }`}
          >
            Home
          </Link> */}
          <Link
            to="/services"
            ref={addToRefs}
            className={`pb-1 border-b-2 font-serif border-transparent transition-all ${
              scrolled
                ? "text-black hover:text-cyan-300 hover:border-cyan-400"
                : "text-cyan-300 hover:text-cyan-700 hover:border-cyan-400"
            }`}
          >
            Services
          </Link>
          <Link
            to="/about"
            ref={addToRefs}
            className={`pb-1 border-b-2 font-serif border-transparent transition-all ${
              scrolled
                ? "text-black hover:text-cyan-300 hover:border-cyan-400"
                : "text-cyan-300 hover:text-cyan-700 hover:border-cyan-400"
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`pb-1 border-b-2 font-serif border-transparent bg-transparent transition-all ${
              scrolled
               ? "text-black hover:text-cyan-300 hover:border-cyan-400"
                : "text-cyan-300 hover:text-cyan-700 hover:border-cyan-400"
            }`}
          >
            Contact Us 
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button
                ref={addToRefs}
                className={`flex items-center gap-1 py-1.5  mb-2 px-3 rounded-md backdrop-blur-sm border transition ${
                  scrolled
                    ? "text-black border-black/40 hover:bg-cyan-700 hover:text-white hover:border-cyan-700"
                    : "text-cyan-300 border-cyan-200 hover:bg-cyan-700 hover:text-white hover:border-cyan-700"
                }`}
              >
                Sign in <FaCircleUser />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="ml-2" ref={addToRefs}>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className={`absolute top-full left-0 w-full backdrop-blur-lg md:hidden shadow-md z-40 
              ${scrolled ? "bg-white/80" : "bg-white/20"}`}
          >
            <div className="flex flex-col items-center gap-4 p-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={scrolled ? "text-black hover:text-cyan-700" : "text-white hover:text-cyan-400"}
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className={scrolled ? "text-black hover:text-cyan-700" : "text-white hover:text-cyan-400"}
              >
                Services
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={scrolled ? "text-black hover:text-cyan-700" : "text-white hover:text-cyan-400"}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`inline-block px-4 py-2 rounded-lg border transition ${
                  scrolled
                    ? "bg-black/10 text-black border-black/20 hover:bg-cyan-700 hover:text-white"
                    : "bg-white/20 text-white border-white/30 hover:bg-cyan-700 hover:text-white"
                }`}
              >
                Contact Us →
              </Link>

              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className={`flex items-center gap-1 py-1.5 px-3 rounded-md backdrop-blur-sm border transition ${
                      scrolled
                        ? "text-black border-black/40 hover:bg-cyan-700 hover:text-white hover:border-cyan-700"
                        : "text-white border-white/40 hover:bg-cyan-700 hover:text-white hover:border-cyan-700"
                    }`}
                  >
                    Sign in <FaCircleUser />
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
