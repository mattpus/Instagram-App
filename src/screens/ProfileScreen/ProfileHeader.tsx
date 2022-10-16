import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../types/navigation';
import {Auth} from 'aws-amplify';
import {User} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../conifg';
import {useAuthContext} from '../../contexts/AuthContext';

interface Props {
  user: User;
}

const ProfileHeader = ({user}: Props) => {
  const {userId} = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Image
          source={{uri: user.image || DEFAULT_USER_IMAGE}}
          style={styles.image}
        />
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{user.nofPost}</Text>
          <Text style={styles.label}>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{user.nofFollowers}</Text>
          <Text style={styles.label}>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{user.nofFollowing}</Text>
          <Text style={styles.label}>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      {userId === user.id && (
        <View style={styles.buttonContainer}>
          <Button
            text="Edit Profile"
            onPress={() => navigation.navigate('Edit Profile')}
            inline
          />
          <Button text="Sign Out" onPress={() => Auth.signOut()} inline />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    paddingVertical: 5,
  },
  image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  numberContainer: {
    alignItems: 'center',
  },
  number: {
    fontSize: fonts.size.m,
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },
  label: {
    color: colors.grey,
  },
  name: {
    fontWeight: fonts.weight.bold,
    fontSize: fonts.size.m,
  },
  bio: {},
  buttonContainer: {
    flexDirection: 'row',
  },
});
