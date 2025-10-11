import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    bg: "/hero_image.jpg",
    title: (
      <>
        <span className="block sm:inline">Crafting</span>{" "}
        <span className="block sm:inline text-cyan-400">Smiles</span>{" "}
        <span className="block sm:inline">That Speak</span>
      </>
    ),
    description:(<>
       <span className="block sm:inline text-gray-200">Transform your smile with  </span>{" "}
       <span className="block sm:inline text-gray-200">our expert dental care.</span>{" "}
       
    </>),
    buttonText: "Book Appointment",
    buttonLink: "/booking",
  },
  {
    id: 2,
    bg: "/clinic.webp",
    title: (
      <>
        <span className="block sm:inline">Next-Level</span>{" "}
        <span className="block sm:inline text-cyan-400"> Technology</span>
      </>
    ),
    description:(<>
       <span className="block sm:inline text-gray-200">Modern facilities with the </span>{" "}
       <span className="block sm:inline text-gray-200">latest dental technology.</span>{" "}
    </>),
    buttonText: "Explore Services",
    buttonLink: "/services",
  },
  {
    id: 3,
    bg: "/lab_img.avif",
    title: (
      <>
        <span className="block sm:inline">Precision</span>{" "}
        <span className="block sm:inline text-cyan-400">Laboratory</span>
      </>
    ),
    description:(
      <>
         <span className="block sm:inline text-gray-200">Custom dental solutions </span>{" "}
         <span className="block sm:inline text-gray-200"> crafted with expertise.</span>{" "}
      </>
    ),
    buttonText: "Meet Our Experts",
    buttonLink: "/services",
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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
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
          className="hslider relative h-screen flex flex-col justify-center items-start overflow-hidden px-6 sm:px-10 lg:px-20"
        >
          {/* Background */}
          <div
            className="bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Text Content */}
         <div className="relative   z-10 max-w-md sm:max-w-xl text-left text-white font-serif space-y-4 sm:space-y-6 mb-24 sm:mb-0">
  <h2 className="font-bold font-sans  text-5xl sm:text-4xl md:text-5xl lg:text-7xl leading-snug sm:leading-tight break-words">
    {slide.title}
  </h2>
  <p className="text-base  sm:text-lg md:text-xl text-gray-200 leading-relaxed">
    {slide.description}
  </p>
  <Link
    to={slide.buttonLink}
    className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-transform duration-200 transform hover:scale-105 shadow-lg"
  >
    {slide.buttonText} →
  </Link>
</div>
        </section>
      ))}
    </div>
  );
}
