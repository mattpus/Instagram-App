import {FlatList, View} from 'react-native';
import React from 'react';
import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';

const HomeScreen = () => {
  return (
    <View>
      {/* <FeedPost post={posts[3]} /> */}
      <FlatList
        data={posts}
        renderItem={data => <FeedPost post={data.item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
