"use client"; // Required for client-side rendering

import { FC, useState } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import contentful from "@/app/lib/contentful";
import Header from "../Header";
import { FaRegHeart, FaStar, FaStarHalfAlt, FaTrashAlt, FaUserAlt } from "react-icons/fa";

type Params = {
  blogId: string;
};

const PostPage: FC<{ params: Params }> = async ({ params }) => {
  const post = await contentful.getPostById(params.blogId);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4 md:p-8 lg:p-16 bg-gray-50">
        <article className="mt-20 md:mt-24 max-w-4xl mx-auto">
          <header className="mb-8 text-center px-4">
            <h1 className="font-roboto-condensed text-3xl md:text-4xl lg:text-5xl font-extrabold my-2 md:my-4">
              {post.title}
            </h1>
            <p className="text-gray-500 text-base md:text-lg">{post.excerpt}</p>
          </header>

          <div className="w-full h-64 md:h-96 mb-8 relative overflow-hidden rounded-md shadow-md">
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={post.coverImage.url}
              alt={post.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw"
            />
          </div>

          <section className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl prose-brand mx-auto text-gray-800 px-4">
            {documentToReactComponents(post.content)}
          </section>

          <InteractiveFeatures />
          <footer className="mt-12 border-t pt-8 px-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 relative rounded-full overflow-hidden">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={post.author.picture.url}
                  alt={post.author.name}
                />
              </div>
              <div>
                <p className="text-sm md:text-lg font-bold text-brand-purple-900">
                  {post.author.name}
                </p>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

// Client-side component for interactive features
const InteractiveFeatures = () => {
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ id: number, text: string }[]>([]);
  const [nextId, setNextId] = useState(1);


  const handleLike = () => setLiked(!liked);

  const handleRatingClick = (star: number) => {
    setRating(star);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { id: nextId, text: comment }]);
      setNextId(nextId + 1); // Increment ID for new comments
      setComment(""); // Clear the comment field after submission
    }
  };

   // Handle Comment Delete
   const handleCommentDelete = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="mt-12">
      {/* Like Button */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 px-3 py-1 border rounded-md transition-colors duration-300 ${
            liked ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <FaRegHeart
            className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-600'}`}
            aria-hidden="true"
          />
          <span>{liked ? 'Liked' : 'Like'}</span>
        </button>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative"  onClick={() => handleRatingClick(star)}>
            {star <= rating ? (
              <FaStar className="w-6 h-6 text-yellow-500" aria-hidden="true" />
            ) : rating >= star - 0.5 ? (
              <FaStarHalfAlt className="w-6 h-6 text-yellow-500" aria-hidden="true" />
            ) : (
              <FaStar className="w-6 h-6 text-gray-300" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          rows={4}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Leave a comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>

      {/* Display Comments */}
      <div className="mt-8 space-y-4">
        {comments.map(({ id, text }) => (
          <div key={id} className="flex items-start bg-white p-4 rounded-lg shadow-md">
            <FaUserAlt className="w-8 h-8 text-gray-500 mr-3" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-gray-700">{text}</p>
            </div>
            <button
              onClick={() => handleCommentDelete(id)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <FaTrashAlt className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      </div>
  );
};

export default PostPage;
