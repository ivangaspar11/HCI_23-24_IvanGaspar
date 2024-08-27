"use client"; // Required for client-side rendering

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/UI/card";
import contentfulService, { DestinationListItem } from "@/app/lib/contentful";
import Header from "./Header";
import FilterSidebar from "../_components/FilterSidebar";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
}

const AdventureDestinationCard: FC<DestinationListItem> = ({
  title,
  id,
  photo,
  departureDate,
  returnDate,
  price,
}) => (
  <Card className="relative w-full md:w-96 bg-white rounded-lg shadow-lg overflow-hidden">
    <Link href={`adventure-travel/${id}`} passHref>
      <div className="block">
        <CardHeader className="p-4 text-center bg-gray-100">
          <p className="text-xl font-large text-black-600">
            {`${formatDate(departureDate)} - ${formatDate(returnDate)}`}
          </p>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative w-full h-60 mb-4">
            <Image
              src={photo.url}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md hover:opacity-90 transition-opacity"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              alt={title}
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-xl font-bold text-brand-purple-800">{price}€</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-brand-blue-900 transition duration-300">
            SEE DETAILS
          </button>
        </CardFooter>
      </div>
    </Link>
  </Card>
);

const NoTravelIcon = () => (
  <svg
    className="w-16 h-16 mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FF6F61', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#DCE35B', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8h16M4 8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8zM4 8l16 8"
      stroke="url(#gradient1)"
    />
  </svg>
);

const AdventureDestinationsPage: FC = () => {
  const [adventureDestinations, setAdventureDestinations] = useState<DestinationListItem[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<DestinationListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const destinationsPerPage = 4;

  // Filter state variables
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minDuration, setMinDuration] = useState<number>(0);
  const [maxDuration, setMaxDuration] = useState<number>(30);

  useEffect(() => {
    // Fetch adventure destinations when component mounts
    const fetchDestinations = async (page: number) => {
      const skip = (page - 1) * destinationsPerPage;
      try {
        const destinations = await contentfulService.getDestinationsByCategory("Adventure", destinationsPerPage, skip);
        setAdventureDestinations(destinations);
        setFilteredDestinations(destinations); // Initialize filtered destinations

        const totalDestinationsCount = await contentfulService.getTotalDestinationsCount("Adventure");
        setTotalPages(Math.ceil(totalDestinationsCount / destinationsPerPage));
      } catch (error) {
        console.error("Failed to fetch destinations", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchDestinations(page);
  }, [page]);

  useEffect(() => {
    // Filter destinations whenever filter values change
    const filterDestinations = () => {
      const filtered = adventureDestinations.filter(destination => {
        const departure = new Date(destination.departureDate);
        const returnDate = new Date(destination.returnDate);
        const duration = (returnDate.getTime() - departure.getTime()) / (1000 * 3600 * 24);
        const isInPriceRange = destination.price >= minPrice && destination.price <= maxPrice;
        const isInDurationRange = duration >= minDuration && duration <= maxDuration;

        return isInPriceRange && isInDurationRange;
      });
      setFilteredDestinations(filtered);
    };

    filterDestinations();
  }, [minPrice, maxPrice, minDuration, maxDuration, adventureDestinations]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 order-1 md:order-2">
            <FilterSidebar
              tripDuration={[minDuration, maxDuration]}
              priceRange={[minPrice, maxPrice]}
              handleTripDurationChange={(_, newValue) => {
                const valueArray = newValue as number[];
                setMinDuration(valueArray[0]);
                setMaxDuration(valueArray[1]);
              }}
              handlePriceRangeChange={(_, newValue) => {
                const valueArray = newValue as number[];
                setMinPrice(valueArray[0]);
                setMaxPrice(valueArray[1]);
              }}
            />
          </div>

          <div className="md:col-span-3 order-2 md:order-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Adventure Destinations</h2>
            </div>
            <div>
              {filteredDestinations.length === 0 ? (
                <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
                  <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                    <NoTravelIcon />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Planned Tours</h2>
                    <p className="text-gray-600">It looks like there are no adventure destinations matching your filters. Please adjust your filters or check back later.</p>
                  </div>
                </div>
              ) : (
                <>
                  <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredDestinations.map((adventureDestination) => (
                      <li key={adventureDestination.id}>
                        <AdventureDestinationCard {...adventureDestination} />
                      </li>
                    ))}
                  </ul>

                  {/* Pagination Controls */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      Previous
                    </button>
                    <span className="text-lg text-gray-700">{`Page ${page} of ${totalPages}`}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureDestinationsPage;
