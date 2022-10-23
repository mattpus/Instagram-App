import {
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import React, {useState, useRef} from 'react';
import colors from '../../theme/colors';

type Props = {
  images: string[];
};
const Carousel = ({images}: Props) => {
  const {width} = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    },
  );
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={{width: width, aspectRatio: 1}} />
        )}
        horizontal
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeImageIndex === index ? colors.primary : colors.white,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
export default Carousel;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  dot: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
