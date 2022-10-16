import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import {Post} from '../../API';

const FeedGridItem = ({post}: {post: Post}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: post.image || post.images?.[0]}}
        style={styles.image}
      />
      {post.images && (
        <MaterialIcon
          name="collections"
          size={16}
          color={colors.white}
          style={styles.icon}
        />
      )}
    </View>
  );
};

export default FeedGridItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    aspectRatio: 1,
    maxWidth: `${100 / 3}%`,
  },
  image: {
    flex: 1,
  },
  icon: {position: 'absolute', top: 5, right: 5},
});
