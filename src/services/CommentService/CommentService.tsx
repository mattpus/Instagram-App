import {useMutation, useQuery} from '@apollo/client';
import {Alert} from 'react-native';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {createComment, getPost, updatePost} from './queries';

const useCommentService = (postId: string) => {
  const {userId} = useAuthContext();
  const {data: postData} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {variables: {id: postId}},
  );
  const [doCreateComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(createComment);

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const post = postData?.getPost;

  const updateNofComments = (amount: 1 | -1) => {
    if (post) {
      doUpdatePost({
        variables: {
          input: {
            id: post.id,
            _version: post._version,
            nofComments: post.nofComments + amount,
          },
        },
      });
    }
  };

  const onCreateComment = async (newComment: string) => {
    if (post) {
      try {
        await doCreateComment({
          variables: {
            input: {
              postID: post.id,
              userID: userId,
              comment: newComment,
            },
          },
        });
        updateNofComments(1);
      } catch (e) {
        Alert.alert('error submitting the comment', (e as Error).message);
      }
    }
  };

  return {
    updateNofComments,
    onCreateComment,
  };
};

export default useCommentService;
