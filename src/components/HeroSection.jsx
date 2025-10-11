import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    bg: "/hero_image.jpg",
    title: ( <>
        Crafting <span className="text-cyan-400">Smiles</span> That Speak
      </>),
    description: "Transform your smile with our expert dental care.",
    buttonText: "Book Appointment",
    buttonLink: "/booking",
  },
  {
    id: 2,
    bg: "/clinic.webp",
    title: (<>
    State-of-the-Art <span className="text-cyan-400">Clinic</span>
    </>),
    description: "Modern facilities with the latest dental technology.",
    buttonText: "Explore Services",
    buttonLink: "/services",
  },
  {
    id: 3,
    bg: "/lab_img.avif",
    title: (<>
      Precision <span className="text-cyan-400">Laboratory</span>
    </>),
    description: "Custom dental solutions crafted with expertise.",
    buttonText: "Meet Our Experts",
    buttonLink: "/doctors",
  },
];

export default function SmoothScrollSlider() {
  const containerRef = useRef(null);

  useEffect(() => {
    const getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    const sections = gsap.utils.toArray(".hslider", containerRef.current);

    sections.forEach((section, i) => {
      const bg = section.querySelector(".bg");

      gsap.fromTo(
        bg,
        { y: () => (i ? -window.innerHeight * getRatio(section) : 0) },
        {
          y: () => window.innerHeight * (1 - getRatio(section)),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            toggleClass: { targets: section, className: "enable" },
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative isolate overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {slides.map((slide) => (
        <section
          key={slide.id}
          className="hslider relative h-screen flex items-center justify-start overflow-hidden px-6 sm:px-10 lg:px-20"
        >
          {/* Background */}
          <div
            className="bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text Content */}
          <div className="relative z-10 max-w-xl  text-left text-white font-serif space-y-6">
            <h2 className="font-bold text-3xl sm:text-5xl  md:text-6xl ">
              {slide.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed ">
              {slide.description}
            </p>
            <Link
              to={slide.buttonLink}
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-transform duration-200 transform hover:scale-105 shadow-lg"
            >
              {slide.buttonText} →
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
