import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textStyles} from '../theme/Theme';
import DarkButton from '../components/DarkButton';
import LightButton from '../components/LightButton';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const navigateToNext = () => {
    navigation.navigate('ChooseRoleScreen');
  };

  return (
    <View style={styles.welcomeScreen}>
      <ImageBackground
        source={require('../images/backgroundDoodle.png')}
        resizeMode="cover"
        style={styles.backrgoundImage}>
        <Image
          style={styles.mainImage}
          source={require('../images/shareLocationImage.png')}
        />
        <Text style={textStyles.title}>WELCOME</Text>
        <Text style={textStyles.description}>
          We would like to access your location to give your the best matching
          results.
        </Text>
        <View style={styles.buttons}>
          <DarkButton
            buttonTitle={'Allow Access'}
            onPressAction={navigateToNext}
          />
          <LightButton buttonTitle={'Deny Access'} />
        </View>
        <Image style={styles.wave} source={require('../images/wave.png')} />
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomeScreen: {
    flex: 1,
  },
  backrgoundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mainImage: {
    width: '60%',
    height: '30%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttons: {
    height: '15%',
    justifyContent: 'space-evenly',
    marginBottom: '40%',
    marginTop: '20%',
    zIndex: 1000,
  },
  wave: {
    width: '100%',
    height: '40%',
    position: 'absolute',
  },
});
