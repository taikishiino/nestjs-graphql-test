import { gql, useSubscription } from '@apollo/client';

export const CREATE_POST_QUERY = gql`
  subscription {
    subscribePostCreated {
      id,
      title,
      createdAt,
      updatedAt
    }
  }
`;

const useSubscribePost = () => {
  const { data, error, loading } = useSubscription(CREATE_POST_QUERY);

  return {
    data: data?.subscribePostCreated ?? null,
    error,
    loading
  };
};

export default useSubscribePost;
