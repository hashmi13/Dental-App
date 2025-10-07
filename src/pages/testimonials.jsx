import React, { useEffect, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Emily Watson",
    title: "Patient",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback:
      "The staff was incredibly kind and the AI-assisted diagnosis made everything faster and more accurate. Highly recommended!",
  },
  {
    name: "John Miller",
    title: "Patient",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    feedback:
      "Excellent service and a very clean, modern clinic. The online appointment booking was super convenient.",
  },
  {
    name: "Sara Lopez",
    title: "Patient",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    feedback:
      "From start to finish, my experience was seamless. The team is professional and friendly. Great technology too!",
  },
  {
    name: "David Wilson",
    title: "Patient",
    image: "https://randomuser.me/api/portraits/men/82.jpg",
    feedback:
      "Truly the best dental experience I’ve ever had. The doctors are knowledgeable and very patient-friendly.",
  },
  {
    name: "Sophia Patel",
    title: "Patient",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    feedback:
      "Love the ambiance and professionalism. Booking online was effortless and treatment was smooth.",
  },
];

export default function TestimonialCarousel() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".testimonial-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 px-4 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-600">
          What Our Patients Say
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll gap-6">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="testimonial-card bg-gradient-to-b from-cyan-50 to-cyan-200 border border-black rounded-2xl shadow-md p-6 w-80 flex-shrink-0"
            >
              <FaQuoteLeft className="text-cyan-400 text-2xl mb-3" />
              <p className="text-black italic mb-4">"{item.feedback}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Infinite Scroll Animation */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
