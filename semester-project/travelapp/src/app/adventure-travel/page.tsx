import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/UI/card";
import contentfulService, { DestinationListItem } from "@/app/lib/contentful";
import Header from "./Header";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
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

export type SearchParams = {
  searchParams: Record<string, string | string[] | undefined>;
};

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

const AdventureDestinationsPage: FC<SearchParams> = async ({}) => {
const adventureDestinations = await contentfulService.getDestinationsByCategory("Adventure");

if(adventureDestinations.length === 0 )
{
  return (
    <div>
       <Header/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <NoTravelIcon />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Planned Tours</h2>
        <p className="text-gray-600">It looks like there are no adventure destinations planned at the moment. Please check back later or explore other options.</p>
      </div>
    </div>
    </div>
  );
}

  return (
    <div>
      <Header/>
      <div className="container mx-auto items-center gap-10 py-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {adventureDestinations.map((adventureDestination) => (
            <li key={adventureDestination.id}>
              <AdventureDestinationCard {...adventureDestination} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdventureDestinationsPage;
