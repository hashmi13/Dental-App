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
        <span className="block sm:inline text-cyan-400">
  Smiles

  <img
    src="/smile.webp"
    alt=""
    className="inline-block w-20 h-10  ml-2 -mt-4 align-middle"
  />
</span>
        <span className="block sm:inline">That Speak</span>
      </>
    ),
    description: (
      <>
        <span className="block sm:inline text-gray-200">
          Transform your smile with{" "}
        </span>
        <span className="block sm:inline text-gray-200">
          our expert dental care.
        </span>
      </>
    ),
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
    description: (
      <>
        <span className="block sm:inline text-gray-200">
          Modern facilities with the{" "}
        </span>
        <span className="block sm:inline text-gray-200">
          latest dental technology.
        </span>
      </>
    ),
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
    description: (
      <>
        <span className="block sm:inline text-gray-200">
          Custom dental solutions{" "}
        </span>
        <span className="block sm:inline text-gray-200">
          crafted with expertise.
        </span>
      </>
    ),
    buttonText: "Meet Our Experts",
    buttonLink: "/services",
  },
];

export default function SmoothScrollSlider() {
  const containerRef = useRef(null);

  // ✅ GSAP Background Scroll Effect
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
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // ✅ Scroll Reveal for Text + Button
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative isolate   overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {slides.map((slide) => (
  <section
    key={slide.id}
    className="hslider relative h-screen flex flex-col justify-center items-start overflow-hidden"
  >
    {/* Background */}
    <div
      className="bg absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${slide.bg})` }}
    ></div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20"></div>

    {/* Width-matched wrapper — mirrors Navbar's max-w-7xl mx-auto container */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="max-w-[1600px] sm:max-w-2xl text-left text-white font-serif space-y-4 sm:space-y-4 mb-24 sm:mb-0">
        <h2 className="reveal opacity-0 font-bold font-sans text-5xl sm:text-4xl md:text-5xl lg:text-7xl leading-snug sm:leading-tight break-words transition-all duration-400 ease-in-out">
          {slide.title}
        </h2>
        <p className="reveal opacity-0 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed transition-all duration-700 ease-in delay-150">
          {slide.description}
        </p>
        <Link
          to={slide.buttonLink}
          className="reveal  opacity-0 inline-block bg-cyan-500 hover:bg-cyan-600 font-sans text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-[22px]  transition-all duration-700 ease-out delay-300 hover:scale-105 shadow-lg"
        >
          {slide.buttonText} →
        </Link>
      </div>
    </div>
  </section>
))}
    </div>
  );
}
