import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer.tsx';
import DoublePressable from '../DoublePressable';
import {Post} from '../../API';
import {Storage} from 'aws-amplify';
import {postsByDate} from '../../graphql/queries';

interface IFeedPostContent {
  post: Post;
  isVisible: boolean;
}

const FeedPostContent = ({post, isVisible}: IFeedPostContent) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagesUri, setImagesUri] = useState<string[] | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  useEffect(() => {
    downloadMedia();
  }, []);

  const downloadMedia = async () => {
    if (post.image) {
      //download the image
      const uri = await Storage.get(post.image);
      setImageUri(uri);
    } else if (post.images) {
      const uris = await Promise.all(post.images.map(img => Storage.get(img)));
      setImagesUri(uris);
    } else if (post.video) {
      const uri = await Storage.get(post.video);
      setVideoUri(uri);
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
  } else if (imagesUri) {
    return <Carousel images={imagesUri} />;
  } else if (videoUri) {
    return <VideoPlayer uri={videoUri} paused={!isVisible} />;
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
