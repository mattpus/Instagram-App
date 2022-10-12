import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

type ConfirmEmailData = {
  email: string;
  code: string;
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ConfirmEmailScreen = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const {control, handleSubmit, watch} = useForm<ConfirmEmailData>({
    defaultValues: {email: route.params.email},
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<ConfirmEmailNavigationProp>();
  const emailWatched = watch('email');
  const onConfirmPressed = async ({email, code}: ConfirmEmailData) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, code);
      navigation.navigate('Sign in');
    } catch (error) {
      Alert.alert('Ooops!', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(emailWatched);
      Alert.alert('Check your email', 'The code has been sent');
    } catch (e) {
      Alert.alert('Ooops!', (e as Error).message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="email"
          control={control}
          placeholder="email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          text={isLoading ? 'Loading...' : 'Confirm'}
          onPress={handleSubmit(onConfirmPressed)}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
