
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

  interface PostCollectionResponse{
    postsCollection:{
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
          Authorization: `Bearer mAHKin2EX0PS6cvJImgNDc-WyJY7uxhDuJNwI3HtdJM`,
        },
        body: JSON.stringify({ query: gqlAllPostsQuery }),
      });
  
      // Get the response as JSON, cast as ProductCollectionResponse
      const body = (await response.json()) as {
        data: PostCollectionResponse;
      };

  
      // Map the response to the format we want
      const posts: TypePostListItem[] =
        body.data.postsCollection.items.map((item) => ({
          id: item.sys.id,
          title: item.title,
          content: item.content,
          coverImage:item.coverImage.url,
          slug: item.slug,
          author:item.author.name,
          excerpt:item.excerpt,
        }));
      return posts;
    } catch (error) {
      console.log(error);
  
      return [];
    }
  };

  const contentfulService = {
    getAllPosts,
  };
  
  export default contentfulService;
  
  