import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommentsByPostQuery, CommentsByPostQueryVariables} from '../../API';

import ApiErrorMessage from '../../components/ApiErrorMessage';
import Comment from '../../components/Comment';
import {CommentsRouteProp} from '../../types/navigation';
import Input from './Input';
import {commentsByPost} from './queries';

const CommentsScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route?.params || '';

  const insets = useSafeAreaInsets();

  const {data, loading, error} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {variables: {postID: postId}});

  const comments = data?.commentsByPost?.items.filter(
    comment => !comment?._deleted,
  );

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
        data={comments}
        renderItem={({item}) => <Comment comment={item} details />}
        ListEmptyComponent={() => {
          return (
            <Text> No comments. Be the first one to comment on this post</Text>
          );
        }}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentsScreen;
const styles = StyleSheet.create({root: {margin: 5, flex: 1}});
