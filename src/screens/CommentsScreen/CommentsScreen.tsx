import {useQuery, useSubscription} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Comment as CommentType,
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
  OnCreateCommentByPostIdSubscription,
  OnCreateCommentByPostIdSubscriptionVariables,
} from '../../API';

import ApiErrorMessage from '../../components/ApiErrorMessage';
import Comment from '../../components/Comment';
import {CommentsRouteProp} from '../../types/navigation';
import Input from './Input';
import {commentsByPost, onCreateCommentByPostId} from './queries';

const CommentsScreen = () => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route?.params || '';
  const [newComments, setNewComments] = useState<CommentType[]>([]);
  const insets = useSafeAreaInsets();
  const {data: newCommentData} = useSubscription<
    OnCreateCommentByPostIdSubscription,
    OnCreateCommentByPostIdSubscriptionVariables
  >(onCreateCommentByPostId, {variables: {postID: postId}});

  const {data, loading, error, fetchMore} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
    },
  });

  const comments =
    data?.commentsByPost?.items.filter(comment => !comment?._deleted) || [];

  const nextToken = data?.commentsByPost?.nextToken;

  useEffect(() => {
    if (newCommentData?.onCreateCommentByPostId) {
      setNewComments(existingNewComments => [
        newCommentData.onCreateCommentByPostId as CommentType,
        ...existingNewComments,
      ]);
    }
  }, [newCommentData]);

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
  };
  const isNewComment = (comment: CommentType) => {
    return newComments.some(c => c.id === comment.id);
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching comments"
        message={error.message}
      />
    );
  }
  return (
    <View style={[styles.root, {paddingBottom: insets.bottom}]}>
      <FlatList
        data={[...newComments, ...comments]}
        renderItem={({item}) =>
          item && <Comment comment={item} details isNew={isNewComment(item)} />
        }
        inverted
        ListEmptyComponent={() => {
          return (
            <Text> No comments. Be the first one to comment on this post</Text>
          );
        }}
        onEndReached={() => loadMore()}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentsScreen;
const styles = StyleSheet.create({root: {margin: 5, flex: 1}});
