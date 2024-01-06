import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Surah from './screens/Surah';
import NavigationScreen from './navigation/NavigationScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
