import Image from "next/image";
import {
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import contentful from "@/app/lib/contentful";
import { FC } from "react";

type Params = {
  adventureTravelId: string;
};

const AdventureDestinationsPage: FC<{ params: Params }> = async ({ params }) => {
  const adventureDestination = await contentful.getDestinationById(params.adventureTravelId);
  if (!adventureDestination) {
    return <div>Post not found</div>;
  }

  return (
    <main className="container mx-auto p-4 md:p-8 lg:p-16 bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black bg-opacity-70 text-white z-10 py-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div className="text-xl font-bold">My Blog</div>
          <ul className="hidden md:flex space-x-6">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button>
              {/* Add your mobile menu icon here */}
            </button>
          </div>
        </nav>
      </header>

      <article className="mt-20 md:mt-24 max-w-4xl mx-auto">
        <header className="mb-8 text-center px-4">
          <h1 className="font-roboto-condensed text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-purple-900 my-2 md:my-4">
            {adventureDestination.title}
          </h1>
    
        </header>

        <div className="w-full h-64 md:h-96 mb-8 relative overflow-hidden rounded-md shadow-md">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={adventureDestination.photo.url}
            alt={adventureDestination.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw"
          />
        </div>

        <section className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-brand mx-auto text-gray-800 px-4">
          {documentToReactComponents(adventureDestination.description)}
        </section>

        <footer className="mt-12 border-t pt-8 px-4">
          <div className="flex items-center gap-4"> 
          </div>
        </footer>
      </article>
    </main>
  );
};

export default AdventureDestinationsPage;
