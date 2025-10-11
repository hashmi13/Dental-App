import React from 'react';

export default function SmileMakers() {
  const teamMembers = [
    "/fahad.png",
    "/male-dr-4.webp",
    "/male-dr-3.webp",
    "/verma.png",
    "/female-dr-1.webp",
    "/saba_banu.png",
  ];

  return (
    <div className="min-h-auto bg-gradient-to-b from-cyan-50 to-cyan-900 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10 md:gap-20">

        {/* Left Column - Text */}
        <div className="text-black/50 max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Meet the Smile<br />Makers
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            Our team of highly trained cosmetic & restorative dentists have been delivering new smiles for over 20 years.
          </p>
          {/* <button className="bg-green-400 hover:bg-green-600 text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg">
            FIND OUT MORE
          </button> */}
        </div>

        {/* Right Column - Team Images */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start items-center w-full md:w-auto">
          {teamMembers.map((img, i) => (
            <div
              key={i}
              className={`
                rounded-full overflow-hidden border-4 border-black/30 shadow-2xl transition-transformduration-300 transform hover:scale-105
                w-[22%] sm:w-[18%]  md:w-[120px] lg:w-[140px]
                aspect-[4/5]
                flex-shrink-0
                ${i % 2 === 0 ? '-translate-y-2 sm:-translate-y-3 md:-translate-y-12 lg:translate-y-5' : 'translate-y-2 sm:translate-y-3 md:translate-y-6 lg:translate-y-8'}
              `}
            >
              <img src={img} alt={`Team member ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
