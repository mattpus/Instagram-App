import {View, StyleSheet, Image, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CreateRouteProp, HomeStackNavigationProp} from '../../types/navigation';
import colors from '../../theme/colors';
import {useMutation} from '@apollo/client';
import {createPost} from './queries';
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer.tsx';
import {Storage} from 'aws-amplify';
import {v4 as uuid} from 'uuid';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreatePostScreen = () => {
  const route = useRoute<CreateRouteProp>();
  const {image, images, video} = route.params;
  const navigation = useNavigation<HomeStackNavigationProp>();

  const {userId} = useAuthContext();
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  const onSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const input: CreatePostInput = {
      type: 'POST',
      description,
      image: undefined,
      images: undefined,
      video: undefined,
      nofComments: 0,
      nofLikes: 0,
      userID: userId,
    };

    //upload the media files to s3 and get the key
    if (image) {
      const imageKey = await uploadMedia(image);
      input.image = imageKey;
    }

    try {
      await doCreatePost({variables: {input}});
      setIsSubmitting(false);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (e) {
      Alert.alert('Error uploading the post', (e as Error).message);
      setIsSubmitting(false);
    }
  };

  const uploadMedia = async (uri: string) => {
    try {
      //get the blob of the file from uri
      const response = await fetch(uri);
      const blob = await response.blob();
      //upload file to s3
      const imageExtension = uri.split('.')[uri.split('.').length - 1];

      const s3Response = await Storage.put(`${uuid()}.${imageExtension}`, blob);
      return s3Response.key;
    } catch (e) {
      Alert.alert('Error uploading file');
    }
  };

  let content;
  if (image) {
    content = (
      <Image source={{uri: image}} style={styles.image} resizeMode="contain" />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
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
      <Button
        title={isSubmitting ? 'Submitting...' : 'Submit'}
        onPress={onSubmit}
      />
    </KeyboardAwareScrollView>
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
    width: '100%',
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
