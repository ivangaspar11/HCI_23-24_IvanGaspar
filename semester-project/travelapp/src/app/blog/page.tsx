"use client"
import { useState, useEffect, FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/UI/card";
import Link from "next/link";
import Image from "next/image";
import contentfulService, { TypePostListItem } from "@/app/lib/contentful";
import Header from "./Header";

// Arrow icon SVG
const ArrowIcon = () => (
  <svg
    className="w-6 h-6 text-brand-purple-800 transition-transform duration-300 hover:translate-x-1"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const PostCard: FC<TypePostListItem> = ({
  title,
  content,
  coverImage,
  id,
  author,
  excerpt,
  slug,
}) => (
  <Card className="relative w-full md:w-96">
    <Link href={`/blog/${id}`}>
      <div className="block">
        <CardHeader>
          <CardTitle className="text-brand-purple-800">{title}</CardTitle>
          <CardDescription>{excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
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
        {/* Arrow Button */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-brand-purple-800 hover:text-brand-purple-900">
          <span className="text-sm font-medium">Read More</span>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  </Card>
);

const Blog: FC = () => {
  const [posts, setPosts] = useState<TypePostListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch posts on component mount
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await contentfulService.getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

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
