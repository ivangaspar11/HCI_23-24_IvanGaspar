// Section.tsx

import React from 'react';

type Destination = {
  id: number;
  name: string;
  imageUrl: string;
};

type SectionProps = {
  destinations: Destination[];
};

const DestinastionsSection: React.FC<SectionProps> = ({ destinations }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="mb-8 flex flex-col items-center">
              <img src={destination.imageUrl} alt={destination.name} className="w-full h-64 object-cover mb-4" />
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{destination.name}</h3>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700"> Book Now</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinastionsSection;
