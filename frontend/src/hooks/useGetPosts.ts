import { gql, useQuery } from '@apollo/client';

export const POSTS_QUERY = gql`
  query {
    posts {
      id
      title
    }
  }
`;

const useGetPosts = () => {
  const { data, error, loading, refetch } = useQuery(POSTS_QUERY);

  return {
    posts: data?.posts ?? [],
    error,
    loading,
    refetch
  };
};

export default useGetPosts;
