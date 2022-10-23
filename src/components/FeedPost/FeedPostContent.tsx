import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer.tsx';
import DoublePressable from '../DoublePressable';
import {Post} from '../../API';
import {Storage} from 'aws-amplify';

interface IFeedPostContent {
  post: Post;
  isVisible: boolean;
}

const FeedPostContent = ({post, isVisible}: IFeedPostContent) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    downloadMedia();
  }, []);

  const downloadMedia = async () => {
    if (post.image) {
      //download the image
      const uri = await Storage.get(post.image);
      setImageUri(uri);
    }
  };
  if (imageUri) {
    return (
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />
    );
  } else if (post.images) {
    return <Carousel images={post.images} />;
  } else if (post.video) {
    return <VideoPlayer uri={post.video} paused={!isVisible} />;
  }
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default FeedPostContent;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
