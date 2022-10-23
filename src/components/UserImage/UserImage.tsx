import {View, Text, Image, StyleProp, ImageStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Storage} from 'aws-amplify';
import {DEFAULT_USER_IMAGE} from '../../conifg';

const UserImage = ({
  imageKey,
  style,
}: {
  imageKey?: string | null;
  style?: StyleProp<ImageStyle>;
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (imageKey) {
      Storage.get(imageKey).then(setImageUri);
    }
  }, [imageKey]);

  return (
    <Image
      source={{
        uri: imageUri || DEFAULT_USER_IMAGE,
      }}
      style={style}
    />
  );
};

export default UserImage;
