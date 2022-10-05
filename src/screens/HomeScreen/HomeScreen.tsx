import {FlatList, View, ViewabilityConfig, ViewToken} from 'react-native';
import React, {useRef, useState} from 'react';
import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );
  return (
    <View>
      {/* <FeedPost post={posts[3]} /> */}
      <FlatList
        data={posts}
        renderItem={data => (
          <FeedPost
            post={data.item}
            isVisible={activePostId === data.item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default HomeScreen;
