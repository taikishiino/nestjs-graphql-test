import { gql, useMutation } from '@apollo/client';

export const CREATE_POST_QUERY = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
`;

const useCreatePost = () => {
  const [createPost, { data, error, loading }] = useMutation(CREATE_POST_QUERY);

  return {
    createPost,
    post: data?.createPost,
    error,
    loading
  };
};

export default useCreatePost;
