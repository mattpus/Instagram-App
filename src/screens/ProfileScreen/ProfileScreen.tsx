import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  UserProfileNavigationProp,
  UserProfileRouteProp,
  MyProfileRouteProp,
  MyProfileNavigationProp,
} from '../../types/navigation';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import {ActivityIndicator} from 'react-native';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {GetCommentQueryVariables, GetUserQuery} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    MyProfileNavigationProp | UserProfileNavigationProp
  >();
  const {userId: authUserId} = useAuthContext();
  const userId = route.params?.userId || authUserId;

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetCommentQueryVariables
  >(getUser, {variables: {id: userId}});

  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || 'User not found'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <FeedGridView
      data={user.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default ProfileScreen;
