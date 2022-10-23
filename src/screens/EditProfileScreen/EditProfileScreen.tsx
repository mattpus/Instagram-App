import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useForm, Controller, Control} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {deleteUser, getUser, updateUser, usersByUsername} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {Auth, Storage} from 'aws-amplify';
import {DEFAULT_USER_IMAGE} from '../../conifg';
import {v4 as uuid} from 'uuid';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({
  control,
  name,
  label,
  multiline = false,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={label}
              style={[
                styles.input,
                {borderColor: error ? colors.error : colors.border},
              ]}
              multiline={multiline}
            />
            {error && (
              <Text style={{color: colors.error}}>
                {error.message || 'Error'}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const {control, handleSubmit, setValue} = useForm<IEditableUser>();
  const navigation = useNavigation();
  const {userId, user: authUser} = useAuthContext();

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId}},
  );
  const [getUsersByUsername] = useLazyQuery<
    UsersByUsernameQuery,
    UsersByUsernameQueryVariables
  >(usersByUsername);
  const user = data?.getUser;

  const [doUpdateUser, {loading: updateLoading, error: updateError}] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const [doDeleteUser, {loading: deleteLoading, error: deleteError}] =
    useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('website', user.website);
      setValue('bio', user.bio);
    }
  }, [user, setValue]);

  const onSubmit = async (formData: IEditableUser) => {
    const input: UpdateUserInput = {
      id: userId,
      ...formData,
      _version: user?._version,
    };
    if (selectedPhoto?.uri) {
      input.image = await uploadMedia(selectedPhoto.uri);
    }
    await doUpdateUser({variables: {input}});
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  const uploadMedia = async (uri: string) => {
    try {
      //get the blob of the file from uri
      const response = await fetch(uri);
      const blob = await response.blob();
      //upload file to s3
      const imageExtension = uri.split('.')[uri.split('.').length - 1];

      const s3Response = await Storage.put(`${uuid()}.${imageExtension}`, blob);
      return s3Response.key;
    } catch (e) {
      Alert.alert('Error uploading file');
    }
  };
  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your user profile is permanent', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes, delete', style: 'destructive', onPress: startDeleting},
    ]);
  };
  const startDeleting = async () => {
    if (!user) {
      return;
    }
    //delete from database
    await doDeleteUser({
      variables: {input: {id: userId, _version: user?._version}},
    });

    //delete from cognito
    authUser?.deleteUser(e => {
      if (e) {
        console.log(e);
      }
      Auth.signOut();
    });
  };
  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };
  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError || deleteError) {
    return (
      <ApiErrorMessage
        title="Error fetching or updating the user"
        message={error?.message || updateError?.message || deleteError?.message}
      />
    );
  }

  const validateUsername = async (username: string) => {
    try {
      const response = await getUsersByUsername({variables: {username}});
      if (response.error) {
        Alert.alert('Failed to get user by Username');
        return 'Failed to get user by Username';
      }
      const users = response.data?.usersByUsername?.items;
      if (users && users?.length > 0 && users?.[0]?.id !== userId) {
        return 'Username is already taken';
      }
    } catch (e) {
      Alert.alert('Failed to get user by Username');
      return 'Username is already taken';
    }
    return true;
  };
  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE}}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change profile photo
      </Text>

      <CustomInput
        name="name"
        control={control}
        rules={{required: 'Name is required'}}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be more than 3 character',
          },
          validate: validateUsername,
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{
          pattern: {
            value: URL_REGEX,
            message: 'Invalid url',
          },
        }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: 'Bio should be less than 200 character',
          },
        }}
        label="Bio"
        multiline
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        {updateLoading ? 'Submitting...' : 'Submit'}
      </Text>
      <Text
        onPress={handleSubmit(confirmDelete)}
        style={styles.textButtonDanger}>
        {deleteLoading ? 'Deleting...' : 'Delete User'}
      </Text>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.m,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  textButtonDanger: {
    color: colors.error,
    fontSize: fonts.size.m,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
    minHeight: 50,
  },
});
