import { gql, useQuery } from '@apollo/client';

export const POSTS_QUERY = gql`
  query {
    posts {
      id
      title
    }
  }
`;

const usePosts = () => {
  const { data, error, loading } = useQuery(POSTS_QUERY);

  return {
    posts: data?.posts,
    error,
    loading
  };
};

export default usePosts;
