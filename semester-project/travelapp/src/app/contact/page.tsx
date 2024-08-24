"use client";
import React from 'react';
import Header from './Header';

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';

const ContactPage: React.FC = () => {
  return (
    <div>
      <Header />
      <section className="mb-12 mt-10 flex flex-col items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <div className="hidden md:block ml-40">
  <img src="/contact-us-1jpg.png" alt="Contact Us" className="max-w-full max-h-2/5" />
</div >

          <div className="text-center md:text-left md:ml-auto md:mr-0 mb-5 md:mb-0 bg-white p-8 rounded-lg shadow-lg">
            <h3 className="mb-8 text-4xl font-semibold text-gray-800">
              We’re Here to Help!
            </h3>
            <p className="text-gray-600 mb-6">Feel free to ask us your questions. We will respond to you as soon as possible.</p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full border p-3 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="John"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full border p-3 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Doe"
                />
              </div>

              <div className="mb-4 col-span-2">
                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border p-3 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div className="mb-4 col-span-2">
                <label htmlFor="question" className="block text-gray-700 font-medium">What Can We Help You With?</label>
                <textarea
                  id="question"
                  name="question"
                  className="w-full border p-3 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className='bg-gray-100 py-12 text-center'>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          
          {/* Office Location */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <LocationOnRoundedIcon className='text-blue-500 mb-4' fontSize='large' />
            <h3 className="text-xl font-semibold mb-2">Our Office</h3>
            <p className="text-gray-700">123 Main Street, Cityville, Country</p>
          </div>

          {/* Business Hours */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <ScheduleRoundedIcon className='text-blue-500 mb-4' fontSize='large' />
            <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
            <p className="text-gray-700">Monday to Friday: 9 AM - 5 PM</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <LocalPhoneRoundedIcon className='text-blue-500 mb-4' fontSize='large' />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-700">(+123) 456-7890</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <EmailRoundedIcon className='text-blue-500 mb-4' fontSize='large' />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-700">info@yourtravelapp.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
