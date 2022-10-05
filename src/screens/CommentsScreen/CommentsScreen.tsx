import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import comments from '../../assets/data/comments.json';
import Comment from '../../components/Comment';
import Input from './Input';

const CommentsScreen = () => {
  return (
    <View style={styles.root}>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} details />}
      />
      <Input />
    </View>
  );
};

export default CommentsScreen;
const styles = StyleSheet.create({root: {margin: 5, flex: 1}});
