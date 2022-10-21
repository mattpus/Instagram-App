import {View, Text, StyleSheet, Alert} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import fonts from '../../theme/fonts';
import {useMutation} from '@apollo/client';
import {deletePost} from './queries';
import {DeletePostMutation, DeletePostMutationVariables, Post} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {
  NavigationHelpersContext,
  useNavigation,
} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';

interface IPostMenu {
  post: Post;
}
const PostMenu = ({post}: IPostMenu) => {
  const navigation = useNavigation<FeedNavigationProp>();
  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {
    variables: {
      input: {
        id: post.id,
        _version: post._version,
      },
    },
  });

  const {userId} = useAuthContext();
  const isMyPost = post.userID === userId;
  const startDeletingPost = async () => {
    const response = await doDeletePost();
    console.log(response);
  };
  const onDeletePressed = () => {
    Alert.alert('Are you sure?', 'Deleting the post is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: startDeletingPost,
      },
    ]);
  };
  const onEditPressed = () => {
    navigation.navigate('UpdatePost', {id: post.id});
  };
  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.dots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert('Reporting the post')}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        {isMyPost && (
          <>
            <MenuOption onSelect={onDeletePressed}>
              <Text style={[styles.optionText, {color: 'red'}]}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={onEditPressed}>
              <Text style={[styles.optionText, {marginBottom: 20}]}>
                Edit Post
              </Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default PostMenu;
const styles = StyleSheet.create({
  dots: {
    marginLeft: 'auto',
  },
  options: {
    marginBottom: 100,
  },
  optionText: {
    textAlign: 'center',
    fontSize: fonts.size.m,
    padding: 10,
  },
});
