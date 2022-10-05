import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from './src/theme/colors';
import fonts from './src/theme/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
const App = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>New app</Text>
      <AntDesign name="stepforward" size={25} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: colors.primary,
    fontSize: fonts.size.l,
  },
});
