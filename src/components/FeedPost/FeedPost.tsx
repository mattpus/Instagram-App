import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Comment from '../Comment';
import {IPost} from '../../types/models';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer.tsx';
import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';

interface Props {
  post: IPost;
  isVisible?: boolean;
}

const FeedPost = ({post, isVisible}: Props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation<FeedNavigationProp>();

  const navigateToUser = () => {
    navigation.navigate('UserProfile', {userId: post.user.id});
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {userId: post.user.id});
  };
  const ToggleDescription = () => {
    setIsDescriptionExpanded(prevDescription => !prevDescription);
  };
  const toggleLike = () => {
    setIsLiked(prev => !prev);
  };
  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user.image,
          }}
          style={styles.avatars}
        />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.user.username}
        </Text>
        <Entypo name="dots-three-horizontal" style={styles.dots} />
      </View>
      {content}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>
        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>userName</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>
        {/* Post description */}
        <Text>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={ToggleDescription}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments{' '}
        </Text>
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </View>
    </View>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  post: {
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  userName: {
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },
  avatars: {
    marginLeft: 10,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
  dots: {
    marginLeft: 'auto',
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  footer: {
    padding: 10,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
});
