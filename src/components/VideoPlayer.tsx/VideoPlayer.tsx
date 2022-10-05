import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import colors from '../../theme/colors';

type Props = {
  uri: string;
  paused: boolean;
};
const VideoPlayer = ({uri, paused}: Props) => {
  const [muted, setMuted] = useState(true);

  return (
    <View>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted={muted}
        paused={paused}
      />
      <Pressable onPress={() => setMuted(v => !v)} style={styles.muteButton}>
        <Ionicons
          name={muted ? 'volume-mute' : 'volume-medium'}
          size={20}
          color="white"
        />
      </Pressable>
    </View>
  );
};

export default VideoPlayer;
const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 1,
  },
  muteButton: {
    backgroundColor: colors.black,
    opacity: 0.5,
    padding: 5,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
