// CompanyNumbersSection.tsx

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
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 md:mb-12">Our Company in Numbers</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center mb-8 md:mb-0">
              <FaMapMarkerAlt className="text-3xl md:text-4xl mr-4" />
              <div>
                <p className="text-gray-600 text-lg mb-2 md:mb-4">Locations</p>
                <p className="text-4xl font-bold">{companyNumbers.locations}</p>
              </div>
            </div>
            <div className="flex items-center mb-8 md:mb-0">
              <FaPlane className="text-3xl md:text-4xl mr-4" />
              <div>
                <p className="text-gray-600 text-lg mb-2 md:mb-4">Kilometers</p>
                <p className="text-4xl font-bold">{companyNumbers.kilometers}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaPassport className="text-3xl md:text-4xl mr-4" />
              <div>
                <p className="text-gray-600 text-lg mb-2 md:mb-4">Countries</p>
                <p className="text-4xl font-bold">{companyNumbers.countries}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  
};

export default CompanyNumbersSection;
