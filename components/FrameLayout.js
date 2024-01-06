import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

export default function FrameLayout({backgroundImage, children}) {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImageContainer}
      resizeMode="contain">
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
