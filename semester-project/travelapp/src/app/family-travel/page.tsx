"use client"; // Required for client-side rendering

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "@mui/material/Slider";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/UI/card";
import contentfulService, { DestinationListItem } from "@/app/lib/contentful";
import Header from "./Header";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
}

const FamilyDestinationCard: FC<DestinationListItem> = ({
  title,
  id,
  photo,
  departureDate,
  returnDate,
  price,
}) => (
  <Card className="relative w-full md:w-96 bg-white rounded-lg shadow-lg overflow-hidden">
    <Link href={`family-travel/${id}`} passHref>
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

const FamilyDestinationsPage: FC = () => {
  const [familyDestinations, setFamilyDestinations] = useState<DestinationListItem[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<DestinationListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Filter state variables
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minDuration, setMinDuration] = useState<number>(0);
  const [maxDuration, setMaxDuration] = useState<number>(30);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinations = await contentfulService.getDestinationsByCategory("Family");
        setFamilyDestinations(destinations);
        setFilteredDestinations(destinations); // Initialize filtered destinations
      } catch (err) {
        console.error("Failed to fetch family destinations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    // Filter destinations whenever filter values change
    const filterDestinations = () => {
      const filtered = familyDestinations.filter(destination => {
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
  }, [minPrice, maxPrice, minDuration, maxDuration, familyDestinations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Filter Destinations</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start w-full md:w-auto">
            {/* Filters */}
            <div className="flex flex-col gap-6">
              {/* Duration Slider */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Trip Duration (Days)</label>
                <Slider
                  value={[minDuration, maxDuration]}
                  onChange={(_, newValue) => {
                    const valueArray = newValue as number[];
                    setMinDuration(valueArray[0]);
                    setMaxDuration(valueArray[1]);
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                  step={1}
                  marks
                  sx={{
                    width: 300,
                    color: '#3f51b5',
                    height: 6,
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: '#3f51b5',
                      border: '2px solid #fff',
                      '&:hover': {
                        boxShadow: '0px 0px 0px 8px rgba(63, 81, 181, 0.16)',
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.28,
                    },
                    '& .MuiSlider-track': {
                      border: 'none',
                    },
                  }}
                />
              </div>
              {/* Price Slider */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Price Range (Euros)</label>
                <Slider
                  value={[minPrice, maxPrice]}
                  onChange={(_, newValue) => {
                    const valueArray = newValue as number[];
                    setMinPrice(valueArray[0]);
                    setMaxPrice(valueArray[1]);
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={10}
                  marks
                  sx={{
                    width: 300,
                    color: '#3f51b5',
                    height: 6,
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: '#3f51b5',
                      border: '2px solid #fff',
                      '&:hover': {
                        boxShadow: '0px 0px 0px 8px rgba(63, 81, 181, 0.16)',
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.28,
                    },
                    '& .MuiSlider-track': {
                      border: 'none',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          {filteredDestinations.length === 0 ? (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
              <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <NoTravelIcon />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Planned Tours</h2>
                <p className="text-gray-600">It looks like there are no family destinations matching your filters. Please adjust your filters or check back later.</p>
              </div>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDestinations.map((familyDestination) => (
                <li key={familyDestination.id}>
                  <FamilyDestinationCard {...familyDestination} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyDestinationsPage;
