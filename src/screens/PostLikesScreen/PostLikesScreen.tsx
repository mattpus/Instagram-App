import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {likesForPostByUser} from './queries';
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import {useRoute} from '@react-navigation/native';
import {PostLikesRouteProp} from '../../types/navigation';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import UserListItem from '../../components/UserListItem';

const PostLikesScreen = () => {
  const route = useRoute<PostLikesRouteProp>();
  const {id} = route.params;

  const {data, loading, error, refetch} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: id}});

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage
        title="error fetching likes for post"
        message={error.message}
      />
    );
  }

  const likes =
    data?.LikesForPostByUser?.items?.filter(like => !like?._deleted) || [];

  return (
    <FlatList
      data={likes}
      renderItem={({item}) => <UserListItem user={item?.User} />}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default PostLikesScreen;

const styles = StyleSheet.create({});
