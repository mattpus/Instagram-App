import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable';

import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';
import {Post} from '../../API';
import PostMenu from './PostMenu';
import dayjs from 'dayjs';

import useLikeService from '../../services/LikeService';
import FeedPostContent from './FeedPostContent';
import {Storage} from 'aws-amplify';
import UserImage from '../UserImage';

const DEFAULT_USER_IMAGE =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/default-user-image.png';

interface Props {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({post, isVisible}: Props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const navigation = useNavigation<FeedNavigationProp>();
  const {toggleLike, isLiked} = useLikeService(post);

  const postLikes = post.Likes?.items.filter(like => !like?._deleted) || [];
  useEffect(() => {
    if (post?.User?.image) {
      Storage.get(post.User.image).then(setImageUri);
    }
  }, [post]);
  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', {userId: post.User.id});
    }
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  const navigateToLikes = () => {
    navigation.navigate('PostLikes', {id: post.id});
  };

  const ToggleDescription = () => {
    setIsDescriptionExpanded(prevDescription => !prevDescription);
  };

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <UserImage imageKey={post?.User?.image} style={styles.avatars} />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <PostMenu post={post} />
      </View>
      {/* Content */}
      <DoublePressable onDoublePress={toggleLike}>
        <FeedPostContent post={post} isVisible={isVisible} />
      </DoublePressable>
      {/* Footer */}
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
        {postLikes.length === 0 ? (
          <Text>Be the first to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )}

        {/* Post description */}
        <Text>
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={ToggleDescription}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments{' '}
        </Text>
        {/* Post date */}
        <Text>{dayjs(post.createdAt).fromNow()}</Text>
        {(post.Comments?.items || []).map(
          comment => comment && <Comment key={comment.id} comment={comment} />,
        )}
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
    marginRight: 10,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
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
