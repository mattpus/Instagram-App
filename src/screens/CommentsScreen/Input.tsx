import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const Input = () => {
  const [newComment, setNewComment] = useState('');
  const onPost = () => {
    console.warn('posting the comment', newComment);
    //sending the data to the backend
    setNewComment('');
  };
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
        style={styles.image}
      />
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        style={styles.input}
        placeholder="write your comment"
        multiline
      />

      <Text onPress={onPost} style={styles.button}>
        POST
      </Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: colors.border,
    padding: 5,
    alignItems: 'flex-end',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 5,
  },
  input: {
    borderColor: colors.lightgrey,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 10,
    paddingVertical: 5,
    paddingRight: 50,
    flex: 1,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    right: 15,
    bottom: 17,
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.bold,
    color: colors.primary,
  },
});
