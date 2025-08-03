import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TreatmentCard({ title, description, image }) {
  const [showDetails, setShowDetails] = useState(false);

  const treatmentDetails = {
    'Teeth Whitening': {
      duration: '1 hour',
      price: '$200',
      benefits: ['Brighter smile', 'Improved confidence', 'Professional results'],
    },
    'Dental Implant': {
      duration: '2-3 hours',
      price: '$1000-$3000',
      benefits: ['Natural look and feel', 'Permanent solution', 'Improved oral health'],
    },
    'Teeth Fillings': {
      duration: '30-60 minutes',
      price: '$100-$300',
      benefits: ['Stop tooth decay', 'Relieve pain', 'Preserve natural tooth'],
    },
    'Oral Surgery': {
      duration: '1-2 hours',
      price: 'Varies',
      benefits: ['Expert care', 'Modern techniques', 'Comprehensive treatment'],
    },
    'Crown and Bridges': {
      duration: '2 visits',
      price: '$800-$1500',
      benefits: ['Restore smile', 'Improve function', 'Long-lasting results'],
    },
    'Periodontal Care': {
      duration: '1 hour',
      price: '$200-$800',
      benefits: ['Healthy gums', 'Fresh breath', 'Prevent tooth loss'],
    },
  };

  const details = treatmentDetails[title] || {
    duration: 'Varies',
    price: 'Contact us',
    benefits: ['Professional care', 'Expert team', 'Modern facilities'],
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-500">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>

        {showDetails && (
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
        )}

        {!showDetails && (
          <button
            onClick={() => setShowDetails(true)}
            className="text-cyan-600 font-medium hover:underline"
          >
            Read More
          </button>
        )}
      </div>
    </div>
  );
}

export default TreatmentCard;
