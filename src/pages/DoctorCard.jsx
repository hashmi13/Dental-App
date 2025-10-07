import React, { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Alice Johnson",
    specialty: "Orthodontist",
    image: "/female-dr-1.webp",
    experience: "10+ Years",
    description:
      "Dr Alice is highly skilled Orthodontist and Aligners specialist with over 10 years of dedicated experience. Her patient centric approach has built a trust among clientele. In addition, being Zonal operational Manager, she oversees dental operations.",
  },
  {
    id: 2,
    name: "Dr. Mark Robinson",
    specialty: "Endodontist",
    image: "/male-dr-8.webp",
    experience: "8+ Years",
    description:
      "Expert in root canal treatments and dental surgeries, ensuring painless procedures.",
  },
  {
    id: 3,
    name: "Dr. Emma Watson",
    specialty: "Pediatric Dentist",
    image: "/female-dr-6.webp",
    experience: "6+ Years",
    description:
      "Loves working with children and making their dental visits comfortable and fun.",
  },
  {
    id: 4,
    name: "Dr. Sachin Varma",
    specialty: "General Dentistry",
    image: "/verma.png",
    experience: "18+ Years",
    description:
      " skilled dentist with rich clinical experience of over 18 years. He holds a prior experience of working as a Dental officer in the Indian army for 14 years.",
  },
  {
    id: 5,
    name: "Dr. Mark Parker",
    specialty: "Pediatric Dentist",
    image: "/male-dr-7.webp",
    experience: "6+ Years",
    description:
      "Loves working with children and making their dental visits comfortable and fun.",
  },
  {
    id: 6,
    name: "Dr. Martin Jameson",
    specialty: "Prosthodontist",
    image: "/male-dr-4.webp",
    experience: "9+ Years",
    description:
      "Dr Martin zonal clinical head having a wide experience over 9 years.",
  },
  {
    id: 7,
    name: "Dr. Fahad Hussain",
    specialty: "General Dentistry, Oral Pathology",
    image: "/fahad.png",
    experience: "6+ Years",
    description:
      "Dr.Fahad is a seasoned practitioner with high level skills and abundant experience. Deeply knowledgeable in all dental treatments including implants and aligners. Zonal head for the past 6+ years.",
  },
  {
    id: 8,
    name: "Dr. John Smith",
    specialty: "Implant Prosthodontist, Prosthodontist",
    image: "/male-dr-3.webp",
    experience: "12+ Years",
    description:
      "Dr. John with more than 12 years of expertise in Prosthofontics and passionately persuing maxillofacial prosthodontics and implantology.",
  },
  {
    id: 9,
    name: "Dr. Saba Banu",
    specialty: "General Dentistry, Oral Pathology",
    image: "/saba_banu.png",
    experience: "12+ Years",
    description:
      "Dr Saba a talented dentist boasting 12+ years of expertise in general dentistry. With a passion for restoring smiles , she combines precision and care to enhance her patient’s oral health.",
  },
];

const DoctorList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="w-full bg-cyan-100 mb-5 py-16 space-y-12">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-cyan-700">
        Meet Our Doctors
      </h2>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl p-6 flex border-2 border-cyan-400 flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              loading="lazy"
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-100 mb-4 shadow-md"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {doctor.name}
            </h3>
            <p className="text-sm text-cyan-600 font-semibold mb-3">
              {doctor.specialty}
            </p>
            <button
              className="mt-2 px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-all transform hover:scale-110 shadow-md"
              onClick={() => setSelectedDoctor(doctor)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-500 transition-colors duration-200 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              onClick={() => setSelectedDoctor(null)}
            >
              ✖
            </button>
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-200 mx-auto mb-6 shadow-lg"
            />
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              {selectedDoctor.name}
            </h3>
            <p className="text-center text-cyan-600 font-semibold text-lg mb-3">
              {selectedDoctor.specialty}
            </p>
            <p className="text-center text-cyan-500 font-medium mb-4">
              {selectedDoctor.experience}
            </p>
            <p className="text-center text-gray-700 leading-relaxed">
              {selectedDoctor.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
