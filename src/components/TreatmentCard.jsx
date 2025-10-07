import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TreatmentCard({ title, description, image, index }) {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const cardRef = useRef(null);

  const treatmentDetails = {
    "Teeth Whitening": {
      duration: "1 hour",
      price: "$200",
      benefits: [
        "Brighter smile",
        "Improved confidence",
        "Professional results",
      ],
    },
    "Dental Implant": {
      duration: "2-3 hours",
      price: "$1000-$3000",
      benefits: [
        "Natural look and feel",
        "Permanent solution",
        "Improved oral health",
      ],
    },
    "Teeth Fillings": {
      duration: "30-60 minutes",
      price: "$100-$300",
      benefits: ["Stop tooth decay", "Relieve pain", "Preserve natural tooth"],
    },
    "Oral Surgery": {
      duration: "1-2 hours",
      price: "Varies",
      benefits: ["Expert care", "Modern techniques", "Comprehensive treatment"],
    },
    "Crown and Bridges": {
      duration: "2 visits",
      price: "$800-$1500",
      benefits: ["Restore smile", "Improve function", "Long-lasting results"],
    },
    "Periodontal Care": {
      duration: "1 hour",
      price: "$200-$800",
      benefits: ["Healthy gums", "Fresh breath", "Prevent tooth loss"],
    },
  };

  const details = treatmentDetails[title] || {
    duration: "Varies",
    price: "Contact us",
    benefits: ["Professional care", "Expert team", "Modern facilities"],
  };

  // Animate Read More / Close
  useEffect(() => {
    if (showDetails && detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else if (!showDetails && detailsRef.current) {
      gsap.to(detailsRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [showDetails]);

  // Animate staggered cards on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%", // when card enters view
          },
          delay: index * 0.2, // stagger effect
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-gradient-to-b from-white to-cyan-100 shadow-md rounded-lg overflow-hidden transition-all duration-500"
    >
      <img src={image} alt={title} className="w-full h-52 object-cover" />
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>

        {/* Animated Details */}
        <div
          ref={detailsRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="mt-3 text-left space-y-2">
            <p className="text-sm">
              <strong>Duration:</strong> {details.duration}
            </p>
            <p className="text-sm">
              <strong>Price:</strong> {details.price}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {details.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pt-4">
              <Link
                to="/booking"
                className="bg-cyan-600 text-white px-4 py-2 rounded-md text-sm hover:bg-cyan-700 transition-all"
              >
                Book Now
              </Link>
              <button
                onClick={() => setShowDetails(false)}
                className="text-sm text-cyan-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {!showDetails && (
          <button
            onClick={() => setShowDetails(true)}
            className="text-cyan-600 font-medium hover:underline"
          >
            Read More&#xBB;
          </button>
        )}
      </div>
    </div>
  );
}

export default TreatmentCard;
