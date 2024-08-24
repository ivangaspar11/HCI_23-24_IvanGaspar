import React from 'react';

type Destination = {
  id: number;
  name: string;
  imageUrl: string;
};

type SectionProps = {
  destinations: Destination[];
};

const DestinationsSection: React.FC<SectionProps> = ({ destinations }) => {
  return (
    <section id="destinations" className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-64 object-cover"
                loading='lazy'
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
                <h3 className="text-2xl font-bold mb-4">{destination.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
