"use client";

import HeroSection from "./_components/HeroSection"
import { useState } from 'react';
import DestinationsSection from './_components/DestinationsSection';
import AboutUsSection from './_components/AboutUsSection';
import NumberSection from './_components/NumberSection';

const popularDestinations = [
  {
    id: 1,
    name: 'Paris',
    imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Santorini',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Dubai',
    imageUrl: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  // Add more destinations as needed
];

const companyNumbersData = {
  locations: 2000,
  kilometers: 50000,
  countries: 20,
};


export default function Home() {
  const [showSections, setShowSections] = useState(false);

  return (
    <div>
      <HeroSection/> 
      <DestinationsSection destinations={popularDestinations}/>
      <NumberSection companyNumbers={companyNumbersData} />
      <AboutUsSection/>

    </div>
  );
}