// Represents an image with optional dimensions and a description
interface Image {
    url: string;
    width: number;
    height: number;
    description: string;
  }
  
  // Represents the author of a post with a name and a profile picture
  interface Author {
    name: string;
    picture: Image;
  }
  
  // Represents the detailed structure of a single post item
  interface PostDetailItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: any; // Assuming Contentful's rich text JSON format, or adjust if needed
    coverImage: Image;
    author: Author;
  }
  

  
  // Represents the response structure returned by the GraphQL query
  interface DetailPostResponse {
    post: {
      title: string;
      slug: string;
      excerpt: string;
      content: {
        json: any; // This should match the Contentful rich text format
      };
      coverImage: Image;
      author: Author;
    };
  }