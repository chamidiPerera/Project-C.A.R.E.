import {
  Image,
  ImageBackground,
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {textStyles} from '../theme/Theme';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import DarkButton from '../components/DarkButton';
import LightButton from '../components/LightButton';

const WelcomeScreen = () => {
  const [location, setLocation] = useState(false);
  const navigation = useNavigation();

  const navigateToNext = () => {
    navigation.navigate('ChooseRoleScreen');
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return err;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
    locationAccessedToast();
    navigateToNext();
  };

  const locationAccessedToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'C.A.R.E. is using your location',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const locationDenyOnPress = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Location Permission Denied',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    navigateToNext();
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
            onPressAction={getLocation}
          />
          <LightButton
            buttonTitle={'Deny Access'}
            onPressAction={locationDenyOnPress}
          />
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
