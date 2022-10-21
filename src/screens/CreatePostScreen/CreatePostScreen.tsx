import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CreateNavigationProp, CreateRouteProp} from '../../types/navigation';
import colors from '../../theme/colors';
import {useMutation} from '@apollo/client';
import {createPost} from './queries';
import {CreatePostMutation, CreatePostMutationVariables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer.tsx';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  const route = useRoute<CreateRouteProp>();
  const {image, images, video} = route.params;
  const {userId} = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();
  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const onSubmit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            description,
            image,
            images,
            video,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });
      console.log(response);

      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (e) {
      Alert.alert('Error uploading the post', (e as Error).message);
    }
  };

  let content;
  if (image) {
    content = <Image source={{uri: image}} style={styles.image} />;
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>{content}</View>
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

export default CreatePostScreen;

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
