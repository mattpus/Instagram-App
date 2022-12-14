import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {IComment} from '../../types/models';
import {Comment as CommentType} from '../../API';
import dayjs from 'dayjs';
import UserImage from '../UserImage';

type Props = {
  comment: CommentType;
  details?: boolean;
  isNew?: boolean;
};
const Comment = ({comment, details = false, isNew = false}: Props) => {
  const DEFAULT_USER_IMAGE =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/default-user-image.png';
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked(v => !v);
  };
  return (
    <View style={styles.comment}>
      {details && (
        <UserImage imageKey={comment?.User?.image} style={styles.avatar} />
      )}

      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>{' '}
          {comment.comment}
        </Text>
        {details && (
          <View style={styles.footer}>
            {isNew && <Text style={styles.new}> New </Text>}
            <Text style={styles.footerText}>
              {dayjs(comment.createdAt).fromNow()}
            </Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={20}>
        <AntDesign
          name={liked ? 'heart' : 'hearto'}
          size={24}
          style={styles.icon}
          color={liked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentText: {
    color: colors.black,
  },
  commentContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  new: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  footerText: {
    color: colors.grey,
    marginRight: 10,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  icon: {
    marginHorizontal: 5,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 10,
  },
});
