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

const PostList: FC<{ page: number; setPage: (page: number) => void }> = ({ page, setPage }) => {
  const [posts, setPosts] = useState<TypePostListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      const skip = (page - 1) * postsPerPage;
      try {
        const fetchedPosts = await contentfulService.getAllPosts(postsPerPage, skip);
        setPosts(fetchedPosts);

        // Fetch total post count and calculate total pages
        const totalPostCount = await contentfulService.getTotalPostCount();
        setTotalPages(Math.ceil(totalPostCount / postsPerPage));
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchPosts(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
        {posts.map((post) => (
          <li key={post.id} className="flex justify-center">
            <PostCard {...post} />
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-8">
        <button 
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Previous
        </button>
        <span className="self-center">Page {page} of {totalPages}</span>
        <button 
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </button>
      </div>
    </>
  );
};

const Blog: FC = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <div>
      <Header />
      <div className="container mx-auto gap-10 py-10">
        <PostList page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Blog;
