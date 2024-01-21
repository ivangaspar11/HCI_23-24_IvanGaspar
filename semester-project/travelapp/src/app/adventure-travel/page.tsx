
import Link from "next/link";
import Header from "./Header";

export interface AdventureDestination {
  albumId: number;
  id:      number;
  title: string;
  url:   string;
  thumbnailUrl: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPhotos = async (): Promise<AdventureDestination[]> => {
  const data = await fetch(`${BASE_API_URL}/photos`);
  return data.json();
};

export default async function AdventureTravel() {
  const photos = await getPhotos();
  const first10Photos = photos.slice(0, 6);
  return (
  <div>
    <Header/>
  <div className="grid grid-cols-3 gap-20 mt-10">
    {first10Photos.map((photo) => (
      <Link key={photo.id} href={`/pages/adventure-travel/${photo.id}`}>
        <div className="p-2">
          <img src={photo.url} alt={`photo ${photo.title}`} />
          <button className="mt-2 bg-blue-500 text-white p-2 rounded">
            More Information
          </button>
        </div>
      </Link>
    ))}
  </div>
  </div>
);
}