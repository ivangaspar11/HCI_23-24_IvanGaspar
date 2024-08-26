
const gqlAllPostsQuery = `query GetPosts($limit: Int!, $skip: Int!) {
          postCollection(limit: $limit, skip: $skip) {
            items {
              sys {
                id
                publishedAt
              }
              title
              content{json}
              coverImage {
                url
              }
              slug
              author {
                name
                picture {
                  url
                }
              }
              excerpt
            }
          }
        }
      `;

  const gqlPostByIdQuery = `query GetPostById($postId: String!) {
    post(id: $postId) {
      sys {
        id
        publishedAt
      }
      title
      slug
      excerpt
      coverImage {
        url
        width
        height
        description
      }
      content {
        json
      }
      author {
        name
        picture {
          url
          height
          width
        }
      }
    }
  }`;

 const GetTotalNumberOfPostquery =` query TotalNumberOfPosts{
          postCollection {
            total
          }
        }
      `;


const gqlDestinationsByCategoryQuery = `query GetDestinationsByCategory($category: String!) {
  travelDestinationCollection(where: { category: $category }) {
    items {
      sys {
        id
      }
      title
      description {
        json
      }
      photo {
        url
        title
        description
        width
        height
      }
      departureDate
      returnDate
      price
      category
    }
  }
}`;

  
const gqlTravelDestinationByIdQuery = `query GetTravelDestionationById($destinationId: String!) {
  travelDestination(id: $destinationId) {
    sys {
      id
    }
    title
    description {
      json
    }
    photo {
      url
      title
      description
      width
      height
    }
    departureDate
    returnDate
    price
  }
}`;

interface travelDestinationCollectionResponse{
  travelDestinationCollection:{
    items : DestinationItem[];
  }
}

  interface PostCollectionResponse{
    postCollection:{
        items: PostItem[];
    };
  }

interface DestinationItem {
    sys: {
      id: string;  
    };
    title: string; 
    description: any;
    photo: {
      url: string; 
      title: string;  
      description: string;  
      width: number;  
      height: number; 
    };
    departureDate: string;
    returnDate: string; 
    price: number; 
    category: string;  
  }

  export interface DestinationListItem {      
    id: string;  
    title: string;  
    description: any;
     photo: {
        url: string;       
      };
      departureDate: string;  
      returnDate: string;  
      price: number; 
      category: string; 
    }
  

  interface PostItem{
    sys:{
        id:string;
        publishedAt:Date;
    };
    title: string;
    slug: string;
    excerpt:string;
    coverImage:{
        url : string;
        width: number;
        height: number;
        description: string;
    };
    content: string;
    author: {
        name: string;
        picture:{
            url: string;
            height: number;
            width: number;
        }
    }
  }

  export interface TypePostListItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: any;  // Same as above, update according to the content structure
    coverImage: string;
    author: {
        name: string;
        picture: {
            url: string;
        };
    };
}

interface DetailDestinationResponse {
  travelDestination: DestinationItem;
}
  const baseUrl = `https://graphql.contentful.com/content/v1/spaces/zqhs6d43ltbb/environments/master`;

  const getAllPosts = async (limit: number, skip: number): Promise<TypePostListItem[]> => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer VpZOSCUF9PH7lt8WkqhzarXmMxpDeo4ofISiZL-_1Kw`,
          "Cache-Control": "no-cache", // Prevent caching
          "Pragma": "no-cache", // For HTTP/1.0 compatibility
        },
        body: JSON.stringify({
          query:gqlAllPostsQuery,
          variables: {
            limit,
            skip,
          },
        }),
      });
  
      // Get the response as JSON
      const body = (await response.json()) as {
        data: {
          postCollection: {
            items: Array<{
              sys: {
                id: string;
                publishedAt: string;
              };
              title: string;
              content: string;
              coverImage: {
                url: string;
              };
              slug: string;
              author: {
                name: string;
                picture: {
                  url: string;
                };
              };
              excerpt: string;
            }>;
          };
        };
      };
  
      // Map the response to the format we want
      const posts: TypePostListItem[] = body.data.postCollection.items.map((item) => ({
        id: item.sys.id,
        publishedAt: item.sys.publishedAt,
        title: item.title,
        content: item.content,
        coverImage: item.coverImage.url,
        slug: item.slug,
        author: item.author,
        excerpt: item.excerpt,
      }));
  
      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  

  const getPostById = async (
    id: string
  ): Promise<PostDetailItem | null> => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer VpZOSCUF9PH7lt8WkqhzarXmMxpDeo4ofISiZL-_1Kw`,
          "Cache-Control": "no-cache", // Prevent caching
        "Pragma": "no-cache", // For HTTP/1.0 compatibility
        },
        body: JSON.stringify({
          query: gqlPostByIdQuery,  // Use the post query here
          variables: { postId: id }, // Variable key should match the query variable
        }),
      });
  
      const body = (await response.json()) as {
        data: DetailPostResponse; // Adjust type for post
      };
      const responsePost = body.data.post;
      const post: PostDetailItem = {
        id: responsePost.sys.id,
        publishedAt:responsePost.sys.publishedAt,
        title: responsePost.title,
        slug: responsePost.slug,
        excerpt: responsePost.excerpt,
        content: responsePost.content.json,
        coverImage: {
          url: responsePost.coverImage.url,
          width: responsePost.coverImage.width,
          height: responsePost.coverImage.height,
          description: responsePost.coverImage.description,
        },
        author: {
          name: responsePost.author.name,
          picture: {
            url: responsePost.author.picture.url,
            height: responsePost.author.picture.height,
            width: responsePost.author.picture.width,
            description:responsePost.author.picture.description,
          },
        },
      };
      console.log(post)
      return post;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

 // contentfulService.ts

export const getTotalPostCount = async (): Promise<number> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer VpZOSCUF9PH7lt8WkqhzarXmMxpDeo4ofISiZL-_1Kw`,
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
      body: JSON.stringify({ query: GetTotalNumberOfPostquery }),
    });

    const body = (await response.json()) as {
      data: {
        postCollection: {
          total: number;
        };
      };
    };

    return body.data.postCollection.total;
  } catch (error) {
    console.error(error);
    return 0; // Handle errors appropriately
  }
};

  const getDestinationById = async (
    id: string
  ): Promise<DestinationListItem | null> => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer VpZOSCUF9PH7lt8WkqhzarXmMxpDeo4ofISiZL-_1Kw`,
          "Cache-Control": "no-cache", // Prevent caching
          "Pragma": "no-cache", // For HTTP/1.0 compatibility
        },
        body: JSON.stringify({
          query: gqlTravelDestinationByIdQuery,
          variables: { destinationId: id },
        }),
      });
  
      const body = (await response.json()) as { data: DetailDestinationResponse };
      const responseDestination = body.data.travelDestination;
  
      const destination: DestinationListItem = {
       id:responseDestination.sys.id,
       title: responseDestination.title,
       description: responseDestination.description.json,
       photo:responseDestination.photo,   
       departureDate: responseDestination.departureDate,
       returnDate: responseDestination.returnDate,
        price: responseDestination.price,
        category: responseDestination.category,
      };
  
      return destination;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  const getDestinationsByCategory = async (
    category: string
  ): Promise<DestinationListItem[]> => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer VpZOSCUF9PH7lt8WkqhzarXmMxpDeo4ofISiZL-_1Kw`,
          "Cache-Control": "no-cache", // Prevent caching
          "Pragma": "no-cache", // For HTTP/1.0 compatibility
        },
        body: JSON.stringify({
          query: gqlDestinationsByCategoryQuery,
          variables: { category },
        }),
      });
  
      const body = (await response.json()) as {
        data: travelDestinationCollectionResponse;
      };

  
      const destinations: DestinationListItem[] = body.data.travelDestinationCollection.items.map(
        (item) => ({
          id: item.sys.id,
          title: item.title,
          description: item.description.json,
          photo: {
            url: item.photo.url,
          },
          departureDate: item.departureDate,
          returnDate: item.returnDate,
          price: item.price,
          category: item.category,
        })
      );
  
      return destinations;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const contentfulService = {
    getAllPosts,
    getPostById,
    getDestinationById,
    getDestinationsByCategory,
    getTotalPostCount
  };
  
  export default contentfulService;
  
  