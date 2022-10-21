import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import {useRef, useState} from 'react';
import FeedPost from '../../components/FeedPost';
import {useQuery} from '@apollo/client';
import {listPosts} from './queries';
import {ListPostsQuery, ListPostsQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  // const [posts, setPosts] = useState([]);
  const {data, loading, error, refetch} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await API.graphql(graphqlOperation(listPosts));
  //     setPosts(response.data.listPosts.items);
  //   };

  //   fetchPosts();
  // }, []);

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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }
  const posts = data?.listPosts?.items || [];
  return (
    <View>
      {/* <FeedPost post={posts[3]} /> */}
      <FlatList
        data={posts}
        renderItem={({item}) =>
          item && <FeedPost post={item} isVisible={activePostId === item.id} />
        }
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        onRefresh={() => refetch()}
        refreshing={loading}
      />
    </View>
  );
};

export default HomeScreen;
