import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CreateNavigationProp,
  CreateRouteProp,
  UpdatePostRouteProp,
} from '../../types/navigation';
import colors from '../../theme/colors';
import {useQuery, useMutation} from '@apollo/client';
import {getPost, updatePost} from './queries';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer.tsx';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UpdatePostScreen = () => {
  const [description, setDescription] = useState('');
  const route = useRoute<UpdatePostRouteProp>();
  const navigation = useNavigation();
  const {id} = route.params;

  const {data, loading, error} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {variables: {id: id}},
  );

  const [doUpdatePost, {error: updateError, data: updateData}] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const post = data?.getPost;
  useEffect(() => {
    if (post) {
      setDescription(post?.description || '');
    }
  }, [post]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [navigation, updateData]);
  const onSubmit = async () => {
    if (!post) {
      return;
    }
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          description,
        },
      },
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="Failed to fetch the post"
        message={error?.message || updateError?.message}
      />
    );
  }

  return (
    <View style={styles.root}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="grey"
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

export default UpdatePostScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',

    padding: 10,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: 200,
    aspectRatio: 1,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    color: 'black',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});
