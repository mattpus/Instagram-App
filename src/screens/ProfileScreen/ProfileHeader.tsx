import {View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

import Button from '../../components/Button';
import {ProfileNavigationProp} from '../../types/navigation';
import {User} from '../../API';

import {useAuthContext} from '../../contexts/AuthContext';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({user}: IProfileHeader) => {
  const {userId} = useAuthContext();
  const DEFAULT_USER_IMAGE =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/default-user-image.png';
  const navigation = useNavigation<ProfileNavigationProp>();
  navigation.setOptions({title: user?.username || 'Profile'});
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile image */}
        <Image
          source={{uri: user.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />

        {/* Posts, followers, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {/* Button */}
      {userId === user.id && (
        <View style={{flexDirection: 'row'}}>
          <Button
            text="Edit Profile"
            onPress={() => navigation.navigate('Edit Profile')}
            inline
          />
          <Button text="Sign out" onPress={() => Auth.signOut()} inline />
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
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  numberContainer: {
    alignItems: 'center',
  },
  numberText: {
    fontSize: fonts.size.m,
    fontWeight: fonts.weight.full,
    color: colors.black,
  },
  name: {
    fontWeight: fonts.weight.semi,
    color: colors.black,
  },
});
