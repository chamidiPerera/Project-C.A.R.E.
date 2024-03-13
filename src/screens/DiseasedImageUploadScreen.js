import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colorTheme, textStyles} from '../theme/Theme';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import LightButton from '../components/LightButton';
import DarkButton from '../components/DarkButton';

const DiseasedImageUploadScreen = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]); // State to track selected photos

  const navigation = useNavigation();
  const navigateToNext = () => {
    navigation.navigate('SelectedImagesScreen');
  };

  const takePhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      handleImageResponse(response);
    });
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      handleImageResponse(response);
    });
  };

  const handleImageResponse = response => {
    console.log('Response = ', response);
    if (!response.didCancel) {
      const newSelectedPhotos = [...selectedPhotos, response.assets[0]];
      setSelectedPhotos(newSelectedPhotos);
    } else {
      console.log('User cancelled image picker');
    }
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
          <LightButton
            buttonTitle={'Take a photo'}
            showIcon={true}
            onPressAction={takePhoto}
          />
        </View>
        <TouchableOpacity
          style={styles.chooseFromgalleryButton}
          onPress={chooseImage}>
          <Image
            style={styles.arrowRight}
            source={require('../images/arrowRight.png')}
          />
          <View>
            <Text style={[textStyles.subtitle, styles.selectedphotosText]}>
              Or select from gallery
            </Text>
            <Text style={[textStyles.description, styles.selectedphotosText]}>
              {selectedPhotos.length} photos selected
            </Text>
          </View>
        </TouchableOpacity>
        {selectedPhotos.length > 0 && (
          <View style={styles.selectedPhotos}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedPhotos.map((photo, index) => (
                <Image
                  key={index}
                  style={styles.selectedPhoto}
                  source={{uri: photo.uri}}
                />
              ))}
            </ScrollView>
          </View>
        )}
        <View
          style={[
            styles.submitForAnalysisButton,
            {marginTop: selectedPhotos.length > 0 ? 10 : '40%'}, // Conditional margin top
          ]}>
          <DarkButton
            buttonTitle="Next"
            isDisabled={selectedPhotos.length === 0}
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
  selectedPhotos: {
    borderWidth: 1,
    borderColor: colorTheme.black,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  selectedPhoto: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
});
