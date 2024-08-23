import React from 'react';
import { FaMapMarkerAlt, FaPlane, FaPassport } from 'react-icons/fa';

type CompanyNumbers = {
  locations: number;
  kilometers: number;
  countries: number;
};

type CompanyNumbersSectionProps = {
  companyNumbers: CompanyNumbers;
};

const CompanyNumbersSection: React.FC<CompanyNumbersSectionProps> = ({ companyNumbers }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 md:mb-12">Our Company in Numbers</h2>
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          
          {/* Locations */}
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-5xl md:text-6xl text-indigo-600 mb-4 md:mb-6 hover:text-indigo-800 transition-colors duration-300" />
            <p className="text-xl md:text-2xl font-medium text-gray-700">Locations</p>
            <p className="text-5xl md:text-6xl font-extrabold text-indigo-800">{companyNumbers.locations}</p>
          </div>

          {/* Kilometers */}
          <div className="flex flex-col items-center">
            <FaPlane className="text-5xl md:text-6xl text-green-600 mb-4 md:mb-6 hover:text-green-800 transition-colors duration-300" />
            <p className="text-xl md:text-2xl font-medium text-gray-700">Kilometers</p>
            <p className="text-5xl md:text-6xl font-extrabold text-green-800">{companyNumbers.kilometers}</p>
          </div>

          {/* Countries */}
          <div className="flex flex-col items-center">
            <FaPassport className="text-5xl md:text-6xl text-blue-600 mb-4 md:mb-6 hover:text-blue-800 transition-colors duration-300" />
            <p className="text-xl md:text-2xl font-medium text-gray-700">Countries</p>
            <p className="text-5xl md:text-6xl font-extrabold text-blue-800">{companyNumbers.countries}</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CompanyNumbersSection;
