
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/UI/card";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
// import { products, categories } from "./productList";
import contentfulService, { TypePostListItem } from "@/app/lib/contentful";

// export interface HeroImageProps {
//   productName: string;
//   image?: string;
//   className?: string;
// }

// export const HeroImage = ({
//   image,
//   productName,
//   className,
// }: HeroImageProps) => {
//   if (!image) return null;

//   return (
//     <div className={cn("relative w-96 h-60", className)}>
//       <Image
//         src={image}
//         fill
//         style={{ objectFit: "cover" }}
//         className="rounded-md hover:opacity-70"
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
//         alt={productName || "product"}
//       />
//     </div>
//   );
// };

const ProductCard: FC<TypePostListItem> = ({
  title,
  content,
  coverImage,
  id,
  author,
  excerpt,
  slug,

}) => (
  <Card className="w-fit">
    <CardHeader>
      <CardTitle className="text-brand-purple-800">{title}</CardTitle>
      <CardDescription>{excerpt}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link href={`posts/${id}`}>
        <div className="relative w-96 h-60">
          <Image
            src={coverImage}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md hover:opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            alt={title}
          />
        </div>
      </Link>
    </CardContent>
    {/* <CardFooter>
      {categories?.map((category) => (
        <Badge variant={category?.label as BadgeProps["variant"]} key={id}>
          {category?.label}
        </Badge>
      ))}
    </CardFooter> */}
  </Card>
);
export type SearchParams = {
    searchParams: Record<string, string | string[] | undefined>;
  };

const Blog: FC<SearchParams> = async ({ }) => {
  const posts = await contentfulService.getAllPosts();

  return (
    <main className="container flex flex-col items-center gap-10">
      <h1 className="font-roboto-condensed text-6xl font-extrabold text-brand-purple-900 my-4">
        Posts
      </h1>
      <ul className="grid grid-cols-2 gap-8">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <ProductCard {...post} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Blog;
