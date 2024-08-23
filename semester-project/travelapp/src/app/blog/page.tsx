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
import contentfulService, { TypePostListItem } from "@/app/lib/contentful";
import Header from "./Header";

const PostCard: FC<TypePostListItem> = ({
  title,
  content,
  coverImage,
  id,
  author,
  excerpt,
  slug,
}) => (
  <Card className="w-full md:w-96">
    <CardHeader>
      <CardTitle className="text-brand-purple-800">{title}</CardTitle>
      <CardDescription>{excerpt}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link href={`blog/${id}`}>
        <div className="relative w-full h-60">
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
    <CardFooter className="flex items-center space-x-4">
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={author.picture.url}
          fill
          style={{ objectFit: "cover" }}
          alt={author.name}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{author.name}</p>
      </div>
    </CardFooter>
  </Card>
);

export type SearchParams = {
  searchParams: Record<string, string | string[] | undefined>;
};

const Blog: FC<SearchParams> = async ({}) => {
  const posts = await contentfulService.getAllPosts();

  
  return (
    <div>
      <Header />
      <div className="container mx-auto gap-10 py-10">
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
    {posts.map((post) => (
      <li key={post.id} className="flex justify-center">
        <PostCard {...post} />
      </li>
    ))}
  </ul>
</div>
    </div>
  );
  
};


export default Blog;
