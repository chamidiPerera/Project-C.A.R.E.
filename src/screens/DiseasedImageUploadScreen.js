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
import axios from 'axios';

import LightButton from '../components/LightButton';
import DarkButton from '../components/DarkButton';
import VerticlSpacer from '../components/VerticlSpacer';

const DiseasedImageUploadScreen = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [imageDetails, setImageDetails] = useState(null)

  const navigation = useNavigation();
  const navigateToNext = () => {
    navigation.navigate('SelectedImagesScreen', { 
      predictedBodyPart: prediction.predicted_class,
      bodyPartConfidenceLevel: prediction.skin_or_eye_confidence,
      predictedDiseases: prediction.predicted_disease,
      diseaseConfidenceLevel: prediction.diseases_confidence,
      selectedPicture: selectedPhotos, 
      prediction_confidence: prediction.prediction_confidence,
      imageDetails: imageDetails
    });
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
      setSelectedPhotos([response.assets[0]]);
      setImageDetails(response.assets[0])
      uploadImage(response.assets[0]);
    } else {
      console.log('User cancelled image picker');
    }
  };

  const uploadImage = async imageData => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageData.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post(
        // 'http://10.0.2.2:5000/predict',
        'http://172.27.19.106:5000/predict', // lucifer
        // "http://127.0.0.1:5000/predict",
        formData,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setPrediction(response.data);
      console.log({prediction});
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  return (
    <View style={styles.diseasedImageUploadScreen}>
      <ImageBackground
        source={require('../images/backgroundDoodle.png')}
        resizeMode="cover"
        style={styles.backrgoundImage}>
        {selectedPhotos.length == 0 && (
          <Image
            style={styles.mainImage}
            source={require('../images/uploadImagesImage.png')}
          />
        )}
        {selectedPhotos.length > 0 && (
          <>
            <VerticlSpacer />
            <VerticlSpacer />
            <VerticlSpacer />
          </>
        )}
        <Text style={textStyles.title}>
          We need to see your dog's diseased area
        </Text>
        <Text style={textStyles.description}>
          Take a close photo of the area you're concerned about. Make sure it's properly visible
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        </View>
        <View
          style={[
            styles.submitForAnalysisButton,
            {marginTop: selectedPhotos.length > 0 ? 10 : '40%'}, // Conditional margin top
          ]}>
          <DarkButton
            buttonTitle="Submit for Analysis"
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
    marginTop: 20,
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
    width: 400,
    height: 400,
    marginRight: 10,
  },
});
