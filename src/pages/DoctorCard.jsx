import React, { useState } from "react";


const doctors = [
  {
    id: 1,
    name: "Dr. Alice Johnson",
    specialty: "Orthodontist",
    image: "/female-dr-1.webp",
    experience: "10+ Years",
    description: "Specialist in braces and aligners with over a decade of experience in smile correction.",
  },
  {
    id: 2,
    name: "Dr. Mark Robinson",
    specialty: "Endodontist",
    image: "/male-dr-8.webp",
    experience: "8+ Years",
    description: "Expert in root canal treatments and dental surgeries, ensuring painless procedures.",
  },
  {
    id: 3,
    name: "Dr. Emma Watson",
    specialty: "Pediatric Dentist",
    image: "/female-dr-6.webp",
    experience: "6+ Years",
    description: "Loves working with children and making their dental visits comfortable and fun.",
  },
  {
    id: 4,
    name: "Dr. Mark Parker",
    specialty: "Pediatric Dentist",
    image: "/male-dr-7.webp",
    experience: "6+ Years",
    description: "Loves working with children and making their dental visits comfortable and fun.",
  },
  {
    id: 5,
    name: "Dr. Martin Jameson",
    specialty: "Pediatric Dentist",
    image: "/male-dr-4.webp",
    experience: "6+ Years",
    description: "Loves working with children and making their dental visits comfortable and fun.",
  },
  {
    id: 6,
    name: "Dr. John Smith",
    specialty: "Periodontist",
    image: "/male-dr-3.webp",
    experience: "12+ Years",
    description: "Specialist in gum treatments, implant surgeries, and oral hygiene management.",
  },
];

const DoctorList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="w-full bg-white mb-5">
      <h2 className="text-3xl font-bold text-center mb-10 text-cyan-600">
        Meet Our Doctors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white  rounded-2xl p-6 flex border border-cyan-500 flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              loading="lazy"
              className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
            <button
              className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-all"
              onClick={() => setSelectedDoctor(doctor)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>


      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-xl text-gray-700 hover:text-red-500"
              onClick={() => setSelectedDoctor(null)}
            >
              ✖
            </button>
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center text-gray-900">{selectedDoctor.name}</h3>
            <p className="text-center text-gray-600">{selectedDoctor.specialty}</p>
            <p className="mt-3 text-sm text-center text-gray-500">{selectedDoctor.experience}</p>
            <p className="mt-4 text-center text-gray-700">{selectedDoctor.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
