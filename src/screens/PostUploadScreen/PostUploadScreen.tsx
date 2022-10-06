import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Camera} from 'expo-camera';
import colors from '../../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const PostUploadScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      console.log(cameraPermission);
      const micPermission = await Camera.requestMicrophonePermissionsAsync();
      setHasPermissions(
        cameraPermission.status === 'granted' &&
          micPermission.status === 'granted',
      );
    };
    getPermissions();
  }, []);

  if (hasPermissions === null) {
    return <Text> Loading...</Text>;
  }

  if (hasPermissions === false) {
    return <Text>No access to the camera</Text>;
  }
  return (
    <View style={styles.page}>
      <Camera style={styles.camera} />
      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <MaterialIcons name="flash-off" size={30} color={colors.white} />
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        <View style={styles.circle} />
        <MaterialIcons name="flip-camera-ios" size={30} color={colors.white} />
      </View>
    </View>
  );
};

export default PostUploadScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});
