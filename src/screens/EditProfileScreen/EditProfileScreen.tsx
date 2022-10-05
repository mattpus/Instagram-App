import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import user from '../../assets/data/user.json';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface Props {
  label: string;
  multiline?: boolean;
}
const CustomInput = ({label, multiline = false}: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        multiline={multiline ? true : false}
      />
    </View>
  );
};
const EditProfileScreen = () => {
  const onSubmit = () => {
    console.warn('change submitted');
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: user.image}} style={styles.avatar} />
      <Text style={styles.button}>Change Profile photo </Text>

      <CustomInput label="Name" />
      <CustomInput label="UserName" />
      <CustomInput label="Website" />
      <CustomInput label="Bio" multiline />
      <Text onPress={onSubmit} style={styles.button}>
        Submit
      </Text>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 10,
  },
  label: {
    width: 75,
  },
  input: {
    borderColor: colors.border,
    borderBottomWidth: 1,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  button: {
    color: colors.primary,
    fontSize: fonts.size.m,
    fontWeight: fonts.weight.semi,
    marginVertical: 10,
  },
});
