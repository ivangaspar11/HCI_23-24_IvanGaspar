"use client"; // Required for client-side rendering

import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import contentful from "@/app/lib/contentful";
import { FC, useState, useEffect } from "react";
import Header from "../Header";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

type Params = {
  familyTravelId: string;
};

const FamilyDestinationsPage: FC<{ params: Params }> = ({ params }) => {
  const [familyDestination, setFamilyDestination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingMessage, setBookingMessage] = useState<string>("");
  const [reservationStatus, setReservationStatus] = useState<string | null>(null);
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const destination = await contentful.getDestinationById(params.familyTravelId);
        setFamilyDestination(destination);
      } catch (err) {
        console.error("Failed to fetch destination", err);
        setError("Failed to load destination.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [params.familyTravelId]);

  const handleBooking = () => {
    setBookingMessage("Booking was successful!");

    setTimeout(() => {
      setBookingMessage("");
    }, 10000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!familyDestination) {
    return <div>Destination not found</div>;
  }

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add actual reservation logic here
    setReservationStatus("Reservation successful! Thank you for booking.");
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4 md:p-8 lg:p-16 bg-gray-50 flex flex-col md:flex-row gap-8">
        <article className="mt-20 md:mt-24 max-w-4xl mx-auto md:w-2/3">
          <header className="mb-8 text-center px-4">
            <h1 className="font-roboto-condensed text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-purple-900 my-2 md:my-4">
              {familyDestination.title}
            </h1>
          </header>

          <div className="w-full h-64 md:h-96 mb-8 relative overflow-hidden rounded-md shadow-md">
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={familyDestination.photo.url}
              alt={familyDestination.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw"
            />
          </div>

          <section className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-brand mx-auto text-gray-800 px-4">
            {documentToReactComponents(familyDestination.description)}
          </section>

          <footer className="mt-12 border-t pt-8 px-4">
            <div className="flex items-center gap-4">
              {/* Additional footer content can go here */}
            </div>
          </footer>
        </article>

        {/* Sidebar for Booking and Information */}
        <aside className="col-span-1 bg-white rounded-lg shadow-lg p-6">
          <div className="sticky top-24">
            {/* Booking Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-brand-purple-900 mb-4">Make a Reservation</h2>
              <form className="flex flex-col gap-4" onSubmit={handleReservation}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="p-3 border rounded-md"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="p-3 border rounded-md"
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="p-3 border rounded-md"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300"
                >
                  Book Now
                </button>
              </form>
              {reservationStatus && (
                <div className="mt-4 text-green-600 font-semibold">
                  {reservationStatus}
                </div>
              )}
            </section>

            {/* General Information Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-brand-purple-900 mb-4">General Information</h2>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong>Insurance:</strong> Travel insurance is included for all participants.
                </li>
                <li>
                  <strong>Payment Options:</strong> We accept credit cards, PayPal, and bank transfers.
                </li>
                <li>
                  <strong>What&apos;s Included:</strong> Accommodation, meals, guided tours, and transport are included.
                </li>
                <li>
                  <strong>Cancellation Policy:</strong> Free cancellation up to 14 days before departure.
                </li>
              </ul>
            </section>

            {/* Additional Resources or FAQ */}
            <section>
              <h2 className="text-xl font-semibold text-brand-purple-900 mb-4">Additional Resources</h2>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#" className="text-blue-600 hover:underline">Frequently Asked Questions</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Travel Guide</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Contact Us</a></li>
              </ul>
            </section>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default FamilyDestinationsPage;
