import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
// import EditProfileScreen from './src/screens/EditProfileScreen';
// import PostUploadScreen from './src/screens/PostUploadScreen';
// import CommentsScreen from './src/screens/CommentsScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return <Navigation />;
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
