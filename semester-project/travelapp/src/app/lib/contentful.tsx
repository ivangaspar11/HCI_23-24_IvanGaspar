
const gqlAllPostsQuery = `query PostList {
    postCollection{
        items{
          sys {
            id
          }
             title
          slug
          excerpt
          coverImage
          {
            url
              width
                 height
              description
          }
          content{json}
          author
          {
            name
            picture
            {
              url
                height
                width
            }
          }     
        }
    }
  }`;

  const gqlPostByIdQuery = `query GetPostById($postId: String!) {
    post(id: $postId) {
      sys {
        id
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


  interface PostCollectionResponse{
    postCollection:{
        items: PostItem[];
    };
  }

  interface PostItem{
    sys:{
        id:string;
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

  export interface TypePostListItem{
    title: string;
    slug: string;
    excerpt:string;
    id: string;
    content: string;
    coverImage: string;
    author: string;
  }
  const baseUrl = `https://graphql.contentful.com/content/v1/spaces/zqhs6d43ltbb/environments/master`;

  const getAllPosts = async (): Promise<TypePostListItem[]> => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer VpZOSCUF9PH7lt8WkqhzarXmMxpDeo4ofISiZL-_1Kw`,
        },
        body: JSON.stringify({ query: gqlAllPostsQuery }),
      });
  
      // Get the response as JSON, cast as PostCollectionResponse
      const body = (await response.json()) as {
        data: PostCollectionResponse;
      };

  
      // Map the response to the format we want
      const posts: TypePostListItem[] =
        body.data.postCollection.items.map((item) => ({
          id: item.sys.id,
          title: item.title,
          content: item.content,
          coverImage:item.coverImage.url,
          slug: item.slug,
          author:item.author.name,
          excerpt:item.excerpt,
        }));
      
      console.log({
        posts
      })

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
        },
        body: JSON.stringify({
          query: gqlPostByIdQuery,  // Use the post query here
          variables: { postId: id }, // Variable key should match the query variable
        }),
      });
  
      const body = (await response.json()) as {
        data: DetailPostResponse; // Adjust type for post
      };
  console.log(body.data)
      const responsePost = body.data.post;
  
      const post: PostDetailItem = {
        id: id,
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
      
      return post;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

  const contentfulService = {
    getAllPosts,
    getPostById
  };
  
  export default contentfulService;
  
  