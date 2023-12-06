import AdventureTravel, { AdventureDestination } from "../page";

interface Params {
  albumId: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPhoto = async (id: string): Promise<AdventureDestination> => {
  const data = await fetch(`${BASE_API_URL}/photos/${id}`);
  return data.json();
};

export default async function BlogPost({ params }: { params: Params }) {
  const photo = await getPhoto(params.albumId);

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
    <div className="flex items-center justify-center mt-8">
      <div className="w-1/2 pr-4">
        <img
          src={photo.thumbnailUrl}
          alt={`Destination: ${photo.title}`}
          className="w-full max-h-96 object-cover"
        />
      </div>
      <div className="w-1/2 ml-20">
        <h1 className="text-3xl font-bold capitalize mt-4">
          <span className="text-neutral-400">Destination: </span>
          {photo.title}
        </h1>
        <button className="mt-8 p-2 bg-blue-500 text-white rounded">
          Book Now
        </button>
      </div>
    </div>
  </main>
);
}