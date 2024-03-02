import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {textStyles} from '../theme/Theme';
import LightButton from '../components/LightButton';
import DarkButton from '../components/DarkButton';
import {useNavigation} from '@react-navigation/native';

const DiseasedImageUploadScreen = () => {
  const isSelected = true;
  const navigation = useNavigation();
  const navigateToNext = () => {
    navigation.navigate('SelectedImagesScreen');
  };
  return (
    <View style={styles.diseasedImageUploadScreen}>
      <ImageBackground
        source={require('../images/backgroundDoodle.png')}
        resizeMode="cover"
        style={styles.backrgoundImage}>
        <Image
          style={styles.mainImage}
          source={require('../images/uploadImagesImage.png')}
        />
        <Text style={textStyles.title}>
          We need to see your dog's diseased area
        </Text>
        <Text style={textStyles.description}>
          Take a photo of the area you're concerned about. Make sure it's clear
          and well-lit.
        </Text>
        <View style={styles.takePictureButton}>
          <LightButton buttonTitle={'Take a photo'} showIcon={true} />
        </View>
        <TouchableOpacity style={styles.chooseFromgalleryButton}>
          <Image
            style={styles.arrowRight}
            source={require('../images/arrowRight.png')}
          />
          <View>
            <Text style={[textStyles.subtitle, styles.selectedphotosText]}>
              Or select from gallery
            </Text>
            {isSelected ? (
              <Text style={[textStyles.description, styles.selectedphotosText]}>
                2 photos selected
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
        <View style={styles.submitForAnalysisButton}>
          <DarkButton
            buttonTitle="Next"
            isDisabled={!isSelected}
            onPressAction={navigateToNext}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default DiseasedImageUploadScreen;

const styles = StyleSheet.create({
  diseasedImageUploadScreen: {
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
  chooseFromgalleryButton: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  arrowRight: {
    width: 50,
    height: 50,
  },
  selectedphotosText: {
    textAlign: 'left',
    padding: 0,
    width: '100%',
  },
  takePictureButton: {
    marginTop: 20,
  },
  submitForAnalysisButton: {
    marginTop: '40%',
    marginBottom: 20,
  },
});
