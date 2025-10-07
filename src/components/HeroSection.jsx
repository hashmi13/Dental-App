import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const clinicRef = useRef(null);
  const clinicContentRef = useRef(null);
  const labRef = useRef(null);
  const labContentRef = useRef(null);

  useEffect(() => {
    // Hero content animation
    gsap.fromTo(
      contentRef.current.children,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.3, 
        ease: "power3.out" 
      }
    );

    // Hero parallax with background image
    gsap.to(heroRef.current, {
      backgroundPositionY: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Clinic content animation
    gsap.fromTo(
      clinicContentRef.current.children,
      { 
        x: -100, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: clinicRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Clinic parallax
    gsap.to(clinicRef.current, {
      backgroundPositionY: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: clinicRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Lab content animation
    gsap.fromTo(
      labContentRef.current.children,
      { 
        x: 100, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: labRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Lab parallax
    gsap.to(labRef.current, {
      backgroundPositionY: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: labRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen sm:h-screen md:h-screen w-full flex items-center justify-centrt bg-cover bg-center bg-fixed px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
        style={{
          backgroundImage: "url('hero_image.jpg')",
         
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div
          ref={contentRef}
          className="relative z-10 text-left text-white max-w-full sm:max-w-2xl"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Crafting <span className="text-cyan-400">Smiles</span> That Speak
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200">
            Transform your smile with our expert dental care
          </p>
          <Link
            to="/booking"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-100 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Book Appointment →
          </Link>
        </div>
      </section>
      
      <section
        ref={clinicRef}
        className="relative h-screen sm:h-[80vh] md:h-screen w-full flex items-center justify-center lg:justify-end bg-cover bg-center bg-fixed px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
        style={{
          backgroundImage: "url('/clinic_img.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          ref={clinicContentRef}
          className="relative z-10 text-center lg:text-right text-white max-w-full sm:max-w-2xl"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            State-of-the-Art <span className="text-cyan-400">Clinic</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200">
            Modern facilities with the latest dental technology
          </p>
          <Link
            to="/services"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-100 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Our Services →
          </Link>
        </div>
      </section>

      {/* Lab Section */}
      <section
        ref={labRef}
        className="relative h-screen sm:h-[80vh] md:h-screen w-full flex items-center justify-center lg:justify-start bg-cover bg-center bg-fixed px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
        style={{
          backgroundImage: "url('/lab_img.avif')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          ref={labContentRef}
          className="relative z-10 text-center lg:text-left text-white max-w-full sm:max-w-2xl"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Precision <span className="text-cyan-400">Laboratory</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200">
            Custom dental solutions crafted with expertise
          </p>
          <Link
            to="/services"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-100 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Our Doctors →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;