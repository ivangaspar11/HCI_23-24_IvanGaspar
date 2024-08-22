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
          <p className="text-sm font-large text-gray-600">
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
          <button className="bg-brand-purple-800 text-black py-2 px-4 rounded-md hover:bg-brand-purple-900 transition">
            VIŠE INFORMACIJA
          </button>
        </CardFooter>
      </div>
    </Link>
  </Card>
);

export type SearchParams = {
  searchParams: Record<string, string | string[] | undefined>;
};

const AdventureDestinationsPage: FC<SearchParams> = async ({}) => {
  const adventureDestinations = await contentfulService.getDestinationsByCategory("Adventure");

  return (
    <div>
      <Header />
      <div className="container flex flex-col items-center gap-10 py-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
