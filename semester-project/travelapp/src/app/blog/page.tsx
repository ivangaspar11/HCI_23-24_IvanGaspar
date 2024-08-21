import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/UI/card";
import Link from "next/link";
import { FC, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
// import { products, categories } from "./productList";
import contentfulService, { TypePostListItem } from "@/app/lib/contentful";
import Header from "./Header";

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

const PostCard: FC<TypePostListItem> = ({
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
      <Link href={`blog/${id}`}>
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
  <div >
    <Header/>
    <div className="container flex flex-col items-center gap-10">
      <ul className="grid grid-cols-2 gap-8">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <PostCard {...post} />
            </li>
          );
        })}
      </ul>
    </div>
    </div>
  );
};

export default Blog;
