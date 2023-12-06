// /src/app/_components/AboutUsSection.tsx

import React from 'react';

const AboutUsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Discover Your Journey With Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          At ITA, we embark on a mission to redefine your travel experience. Our dedication to excellence and personalized service ensures that each journey is meticulously crafted to exceed expectations. As passionate travelers ourselves, we specialize in curating unforgettable adventures tailored to your unique preferences. Our experienced team is committed to turning your travel dreams into seamless and enriching realities. Whether you crave a serene beach escape, an exhilarating mountain expedition, or a culturally immersive exploration, we&apos;re here to guide you through extraordinary journeys. Join us and let&apos;s create travel memories that last a lifetime.
        </p>
        <button className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-700 text-lg">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default AboutUsSection;


