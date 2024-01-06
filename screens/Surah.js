import {
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Sound from 'react-native-sound';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FrameLayout from '../components/FrameLayout';
import PlaySeekButton from '../components/PlaySeekButton';

const images = [
  {id: 1, second: 0, image: require('../assets/Fatiha-verses/1.png')},
  {id: 2, second: 12.189, image: require('../assets/Fatiha-verses/2.png')},
  {id: 3, second: 18.867, image: require('../assets/Fatiha-verses/3.png')},
  {id: 4, second: 24.366, image: require('../assets/Fatiha-verses/4.png')},
  {id: 5, second: 30.252, image: require('../assets/Fatiha-verses/5.png')},
  {id: 6, second: 37.852, image: require('../assets/Fatiha-verses/6.png')},
  {id: 7, second: 44.335, image: require('../assets/Fatiha-verses/7.png')},
];

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export default function Surah() {
  const [verse, setVerse] = useState(require('../assets/Fatiha-verses/1.png'));
  const [isPlay, setIsPlay] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentSecond, setCurrentSecond] = useState(0);
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  useEffect(() => {
    const sound = new Sound(
      `${require('../assets/level001.mp3')}`,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.error('Failed to load the sound', error);
          return;
        }
      },
    );
    setSound(sound);

    const intervalId = setInterval(() => {
      if (sound.isPlaying()) {
        sound.getCurrentTime(seconds => {
          let closest = images[0];

          for (let i = 1; i < images.length; i++) {
            if (
              images[i].second <= seconds &&
              Math.abs(images[i].second - seconds) <
                Math.abs(closest.second - seconds)
            ) {
              closest = images[i];
            }
          }
          setVerse(closest.image);
          setCurrentSecond(seconds);
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playSound = () => {
    if (sound) {
      setIsPlay(true);
      sound.play(success => {
        if (success) {
          setIsPlay(false);
          console.log('Successfully played the sound');
        } else {
          console.error('Failed to play the sound');
        }
      });
    }
  };

  const pauseAudio = () => {
    if (sound.isPlaying()) {
      sound.pause();
      setIsPlay(false);
    } else {
      sound.play();
      setIsPlay(true);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/002.jpg')}
      style={styles.container}>
      <Animated.View style={[styles.imageContainer, {opacity: fadeInAnim}]}>
        <FrameLayout backgroundImage={require('../assets/sorah_frame.png')}>
          <Image
            resizeMode="contain"
            source={verse}
            style={styles.foregroundImage}
          />
        </FrameLayout>
      </Animated.View>
      <PlaySeekButton>
        {isPlay ? (
          <TouchableOpacity onPress={pauseAudio}>
            <Image
              source={require('../assets/Play_off.png')}
              style={styles.playButton}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={playSound}>
            <Image
              source={require('../assets/Play_on.png')}
              style={styles.playButton}
            />
          </TouchableOpacity>
        )}
      </PlaySeekButton>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(100),
  },
  imageContainer: {
    flex: 1,
  },
  foregroundImage: {
    width: WIDTH > 1000 ? wp(48) : wp(40),
    height: WIDTH > 1000 ? hp(48) : hp(40),
    marginRight: wp(11),
    marginHorizontal: wp(10),
    marginBottom: hp(3),
  },
  playButton: {
    width: WIDTH > 1000 ? wp(14) : wp(10),
    height: WIDTH > 800 ? hp(22) : hp(20),
    marginTop: hp(2),
    marginHorizontal: WIDTH > 1000 ? wp(1) : wp(0),
  },
});
