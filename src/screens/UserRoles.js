import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textStyles} from '../theme/Theme';
import LightButton from '../components/LightButton';
import {useNavigation} from '@react-navigation/native';

const SelectUserRole = () => {
  const navigation = useNavigation();
  const navigateToNext = () => {
    navigation.navigate('DiseasedImageUploadScreen');
  };
  return (
    <View style={styles.selectUserRole}>
      <ImageBackground
        source={require('../images/backgroundDoodle.png')}
        resizeMode="cover"
        style={styles.backrgoundImage}>
        <Image
          style={styles.mainImage}
          source={require('../images/WalkingDogImage.png')}
        />
        <Text style={textStyles.title}>Please select a role to continue</Text>
        <View style={styles.buttons}>
          <LightButton
            buttonTitle={'Dog Owner'}
            onPressAction={navigateToNext}
          />
          <LightButton
            buttonTitle={'Dog Adopter'}
            // onPressAction={() => {
            //   navigation.navigate('TabNavigator');
            // }}
          />
          <LightButton buttonTitle={'Dog Shelter'} />
          <LightButton buttonTitle={'Dog Veterinarian'} />
          <LightButton buttonTitle={'None of the above'} />
        </View>
        <Image style={styles.wave} source={require('../images/wave.png')} />
      </ImageBackground>
    </View>
  );
};

export default SelectUserRole;

const styles = StyleSheet.create({
  selectUserRole: {
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
  },
  buttons: {
    height: '50%',
    justifyContent: 'space-evenly',
    marginBottom: '20%',
    zIndex: 1000,
  },
  wave: {
    width: '100%',
    height: '40%',
    position: 'absolute',
  },
});
