import {ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';

import FeedGridView from '../../components/FeedGridView';
import ProfileHeader from './ProfileHeader';
import {MyProfileRouteProp, UserProfileRouteProp} from '../../types/navigation';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {GetUserQuery, GetUserQueryVariables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();

  const {userId: authUserId} = useAuthContext();

  const userId = route.params?.userId || authUserId;
  console.log('USER ID FROM PROFILESCREEN===> ', userId);
  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId}});

  console.log('DATA FROM PROFILESCREEN', data);
  const user = data?.getUser;
  console.log('USER FROM PROFILESCREEN', user);
  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  if (!user) {
    return (
      <ApiErrorMessage
        title="user not exisitng"
        message="user not found"
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
