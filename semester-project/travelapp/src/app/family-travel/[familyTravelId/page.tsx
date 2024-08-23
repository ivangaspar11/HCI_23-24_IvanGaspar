import Image from "next/image";
import {
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import contentful from "@/app/lib/contentful";
import { FC, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";
import Header from "../Header";
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

type Params = {
  familyTravelId: string;
};


const RichTextRenderer = ({ }) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: { data: { target: { fields: { file: any; title: any; description: any; }; }; }; }) => {
        const { file, title, description } = node.data.target.fields;
        const imageUrl = file.url;
        return (
          <img
            src={imageUrl}
            alt={description || title}
            className="my-4 rounded-lg shadow-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        );
      },
      [INLINES.HYPERLINK]: (node: { data: { uri: any; }; }, children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) => {
        const { uri } = node.data;
        return (
          <a
            href={uri}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
      // Handle other blocks or inlines as needed...
    },
  };
}

const FamilyDestinationsPage: FC<{ params: Params }> = async ({ params }) => {
  const familyDestination = await contentful.getDestinationById(params.familyTravelId);
  if (!familyDestination) {
    return <div>Post not found</div>;
  }

  return (
    <main className="container mx-auto p-4 md:p-8 lg:p-16 bg-gray-50">
      <article className="mt-20 md:mt-24 max-w-4xl mx-auto">
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
          </div>
        </footer>
      </article>
    </main>
  );
};

export default FamilyDestinationsPage;
