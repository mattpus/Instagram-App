import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {IUser} from '../../types/models';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {UserProfileNavigationProp} from '../../types/navigation';
import {User} from '../../API';

interface Props {
  user: User;
}

const UserListItem = ({user}: Props) => {
  const DEFAULT_USER_IMAGE =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/default-user-image.png';
  const navigation = useNavigation<UserProfileNavigationProp>();
  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user.id});
  };
  return (
    <Pressable onPress={goToUserScreen} style={styles.root}>
      <Image
        source={{uri: user.image || DEFAULT_USER_IMAGE}}
        style={styles.image}
      />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: fonts.weight.bold,
    marginBottom: 5,
  },
  username: {
    color: colors.grey,
  },
});
