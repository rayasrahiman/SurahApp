import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Animated, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Surah');
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./android/app/src/main/res/drawable/splash_screen.png')}
        style={[styles.splashImage, {opacity: fadeAnim}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
