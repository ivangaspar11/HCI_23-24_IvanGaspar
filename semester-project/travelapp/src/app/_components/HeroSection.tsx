import React from "react";
const HeroSection = () => {

    
    return (
        <div className='flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover home-img'>
          {/* Overlay */}
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]' />
          <div className='p-5 text-white z-[2] mt-[-10rem]'>
            <h2 className='text-5xl font-bold'>Explore, Dream, and Discover with ITA</h2>
            <p className='py-5 text-xl'>Where Your Ideal Escape Begins!</p>
            <a href="#destinations" className='px-8 py-2 border bg-transparent text-white rounded'>
          Explore
        </a>
          </div>
        </div>
      );
    };

export default HeroSection;
