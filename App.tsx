import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import EditProfileScreen from './src/screens/EditProfileScreen';
// import CommentsScreen from './src/screens/CommentsScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      {/* <HomeScreen /> */}
      {/* <CommentsScreen /> */}
      {/* <ProfileScreen /> */}
      <EditProfileScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
