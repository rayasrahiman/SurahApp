import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WIDTH = Dimensions.get('screen').width;
export default function PlaySeekButton({children, next, back}) {
  return (
    <ImageBackground
      source={require('../assets/land_bar.png')}
      style={styles.playButtonBackground}>
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={next}>
          <Image
            source={require('../assets/next_b_on.png')}
            style={styles.skipButton}
          />
        </TouchableOpacity>
        {children}
        <TouchableOpacity onPress={back}>
          <Image
            source={require('../assets/Back_b_on.png')}
            style={styles.skipButton}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  playButtonBackground: {
    width: '100%',
  },
  playButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    width: WIDTH > 1000 ? wp(9) : wp(6),
    height: WIDTH > 1000 ? hp(16) : hp(14),
  },
});
