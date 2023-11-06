// import React from "react"
// import Navbar from "@/app/components/navbar"

// export default function AdventureTravel(){
//     return (
//         <main className="flex min-h-screen flex-col items-center justify-between p-10">
//         <h1 className="text-3xl font-bold">Adventure Travel Page</h1>
//       </main>
//     )
// }



import Link from "next/link";

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
<main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
  <h1 className="text-3xl font-bold p-10">Adventure Destinations Page</h1>
  <div className="grid grid-cols-3 gap-20">
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
</main>

);
}

