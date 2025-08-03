// TestimonialCarousel.jsx
import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-white py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-10">
          What Our Patients Say
        </h2>

        <div className="relative bg-cyan-50 p-6 rounded-xl shadow-md transition-all duration-300">
          <FaQuoteLeft className="text-cyan-400 text-3xl mb-4 mx-auto" />
          <p className="text-gray-700 text-lg italic mb-6">
            "{testimonials[current].feedback}"
          </p>

          <div className="flex flex-col items-center">
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-cyan-400"
            />
            <h4 className="text-lg font-semibold text-gray-900">
              {testimonials[current].name}
            </h4>
            <span className="text-sm text-gray-500">{testimonials[current].title}</span>
          </div>

          {/* Navigation */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-2">
            <button
              onClick={handlePrev}
              className="bg-cyan-100 hover:bg-cyan-200 p-2 rounded-full"
            >
              <FaArrowLeft className="text-cyan-600" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-2">
            <button
              onClick={handleNext}
              className="bg-cyan-100 hover:bg-cyan-200 p-2 rounded-full"
            >
              <FaArrowRight className="text-cyan-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
