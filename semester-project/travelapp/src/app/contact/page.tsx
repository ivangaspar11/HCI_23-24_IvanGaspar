import React from 'react';
import Header from './Header';

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';


const ContactPage: React.FC = () => {

  return (
    <div className="container mx-auto my-5 text-center">
      <Header/>
      <section className="mb-12 mt-10">
  <div className="container flex flex-col md:flex-row justify-between">

  <div className="hidden md:block ml-10">
  <img src="/contact-us-1jpg.png" alt="Contact Us" className="max-w-full max-h-2/5" />
</div>

    <div className="text-center md:text-left md:mr-20 md:ml-5 mb-5 md:mb-0 ">
      <h3 className="mb-8 text-2xl">
        Feel free to ask us your questions. We will respond to you as soon as possible.
      </h3>
      <form
          // onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto"
        >
          <div className="mb-1">
            <label htmlFor="name" className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border p-2 rounded border-black"
            />
          </div>

          <div className="mb-1">
            <label htmlFor="surname" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="w-full border p-2 border-black rounded"
            />
          </div>
      
          <div className="mb-1">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border p-2 rounded border-black"
            />
          </div>

       
          <div className="col-span-2 mb-1">
            <label htmlFor="question" className="block text-gray-700">What Can We Help You With?</label>
            <textarea
              id="question"
              name="question"
              className="w-full border p-2 rounded border-black"
            />
          </div>

          <button
            type="submit"
            className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
    </div>
  </div>
      </section>

      
      <section className='bg-gray-100'>
      <h2 className="text-2xl font-bold mb-6 mt-6 inline-block border-b-4 border-blue-500 pb-2">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4">
          <LocationOnRoundedIcon className='mr-3'/>
            Our Office
          </h3>
          <p className="text-gray-700">123 Main Street, Cityville, Country</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4 ">
          <ScheduleRoundedIcon className='mr-3'/>
            Business Hours
          </h3>
          <p className="text-gray-700">Monday to Friday: 9 AM - 5 PM</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4">
          <LocalPhoneRoundedIcon className='mr-3' />
            Phone
          </h3>
          <p className="text-gray-700">(+123) 456-7890</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4">
          <EmailRoundedIcon className='mr-3'/>
            Email
          </h3>
          <p className="text-gray-700">info@yourtravelapp.com</p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ContactPage;
