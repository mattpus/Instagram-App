import {useMutation, useQuery} from '@apollo/client';
import {
  UpdatePostMutation,
  UpdatePostMutationVariables,
  Post,
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {
  updatePost,
  deleteLike,
  createLike,
  likesForPostByUser,
} from './queries';

const useLikeService = (post: Post) => {
  const {userId} = useAuthContext();
  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const [doCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {userID: userId, postID: post.id}},
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doDeleteLike] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike);

  const {data: usersLikeData} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {
    variables: {postID: post.id, userID: {eq: userId}},
  });

  const userLike = (usersLikeData?.LikesForPostByUser?.items || []).filter(
    like => !like?._deleted,
  )?.[0];

  const updateNofLikes = (amount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofLikes: post.nofLikes + amount,
        },
      },
    });
  };

  const addLike = () => {
    doCreateLike();
    updateNofLikes(1);
  };
  const removeLike = () => {
    if (!userLike) {
      return;
    }
    doDeleteLike({
      variables: {input: {id: userLike.id, _version: userLike._version}},
    });
    updateNofLikes(-1);
  };

  const toggleLike = () => {
    if (userLike) {
      addLike();
    } else {
      removeLike();
    }
  };

  return {
    isLiked: !!userLike,
    toggleLike,
  };
};

export default useLikeService;
