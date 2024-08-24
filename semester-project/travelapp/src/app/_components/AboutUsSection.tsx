import Link from 'next/link';
import React from 'react';

const AboutUsSection: React.FC = () => {
  return (
    <section className="py-16 bg-grey-50 text-black">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
          Discover Your Journey With Us
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-10">
          At ITA, we&apos;re on a mission to redefine your travel experience. With a dedication to excellence and personalized service, every journey we craft is designed to exceed expectations. Whether you&apos;re dreaming of a tranquil beach escape, a thrilling mountain adventure, or a deep cultural exploration, our experienced team is here to turn your travel dreams into unforgettable realities. Let&apos;s create lasting memories together.
        </p>
        <Link href="/blog" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 text-lg">
  Learn More
</Link>

      </div>
    </section>
  );
};

export default AboutUsSection;
