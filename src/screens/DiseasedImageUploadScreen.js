import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {colorTheme, textStyles} from '../theme/Theme';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

import LightButton from '../components/LightButton';
import DarkButton from '../components/DarkButton';

const DiseasedImageUploadScreen = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const navigation = useNavigation();
  const navigateToNext = () => {
    navigation.navigate('SelectedImagesScreen');
  };
  const test = () => {
    const response = axios
      .get('http://172.20.10.3:5000/test')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
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
      // const newSelectedPhotos = [...selectedPhotos, response.assets[0]];
      setSelectedPhotos(response);
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
        'http://172.20.10.3:5000/predict',
        formData,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setPrediction(response.data);
      console.log(prediction);
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {prediction && (
            <View style={{marginTop: 20}}>
              <Text>Predicted Disease:</Text>
              <Text>{prediction.predicted_class}</Text>
              <Text>Confidence: {prediction.confidence}</Text>
            </View>
          )}
        </View>
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
