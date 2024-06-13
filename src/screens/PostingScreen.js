import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {colorTheme, textStyles} from '../theme/Theme';
import VerticlSpacer from '../components/VerticlSpacer';
import ColourPicker from '../components/ColourPicker';
import ThreeButtonsRow from '../components/ThreeButtonsRow';
import DarkButton from '../components/DarkButton';
import TwoButtonsRow from '../components/TwoButtonRow';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const PostingScreen = () => {
  const [text, onChangeText] = useState('Input Additional Information');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedDiseasePhotos, setSelectedDiseasePhotos] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);
  const [diseaseImageDetails, setDiseaseImageDetails] = useState(null);
  const [dogData, setDogData] = useState({
    shelterOrRoad: '',
    shelterName: '',
    dogName: '',
    healthyStatus: '',
    gender: '',
    contact: '',
    photo: '',
    additionalInfo: '',
    location: '',
    healthConcernsPhoto: '',
    size: '',
    skinColor: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    console.log('Updated dog data:', dogData);
  }, [dogData]);

  const navigateToMap = () => {
    navigation.navigate('MapComponent');
  };

  const handleNext = async () => {
    try {
      console.log('Saving dog data:', dogData);
      await AsyncStorage.setItem('dogData', JSON.stringify(dogData));
      Alert.alert('Data Saved', 'Dog data has been saved to AsyncStorage.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const diseaseChooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      handleDiseaseImageResponse(response);
    });
  };

  const handleDiseaseImageResponse = response => {
    console.log('Response = ', response);
    if (!response.didCancel) {
      setSelectedDiseasePhotos([response.assets[0]]);
      setDiseaseImageDetails(response.assets[0]);
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
        'http://192.168.199.210:5000/predict',
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
      setImageDetails(response.assets[0]);
      saveImageToStorage(response.assets[0]);
    } else {
      console.log('User cancelled image picker');
    }
  };

  const saveImageToStorage = async image => {
    try {
      await AsyncStorage.setItem('selectedImage', JSON.stringify(image));
      console.log('Image saved to AsyncStorage:', image);
    } catch (error) {
      console.error('Error saving image to AsyncStorage:', error);
    }
  };

  const handleInputChange = (key, value) => {
    setDogData({...dogData, [key]: value});
  };

  return (
    <View style={styles.postingScreen}>
      <ImageBackground
        source={require('../images/backgroundDoodle.png')}
        resizeMode="cover"
        style={styles.backrgoundImage}>
        <Image
          style={styles.wave}
          source={require('../images/upsideDownWave.png')}
        />
        <View style={styles.detailsBox}>
          <ScrollView>
            <VerticlSpacer />
            <Text style={textStyles.title}>Tell us about your dog</Text>
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Is the dog from a shelter or did you find it on the road?
            </Text>
            <TwoButtonsRow
              onSelect={shelterOrRoad =>
                handleInputChange('shelterOrRoad', shelterOrRoad)
              }
            />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Shelter Name/Road Name
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => handleInputChange('shelterName', text)}
              placeholder="Input Shelter Name/Road Name Here"
              multiline={true}
            />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Photo
            </Text>
            <TouchableOpacity
              style={styles.uploadPhotoBox}
              onPress={chooseImage}>
              <Text
                style={[
                  textStyles.description,
                  {textAlign: 'left', marginLeft: 10, color: 'gray'},
                ]}>
                Upload Photo
              </Text>
              <Icon name={'camera'} size={25} color={'gray'} />
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
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Dog Name
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => handleInputChange('dogName', text)}
              placeholder="Input Dog Name Here"
              multiline={true}
            />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Gender
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => handleInputChange('gender', text)}
              placeholder="Input Gender Here"
              multiline={true}
            />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Additional information
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => handleInputChange('additionalInfo', text)}
              placeholder="Input Addition Information Here"
              multiline={true}
            />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Location
            </Text>
            <TouchableOpacity
              style={styles.uploadPhotoBox}
              onPress={navigateToMap}>
              <Text
                style={[
                  textStyles.description,
                  {textAlign: 'left', marginLeft: 10, color: 'gray'},
                ]}>
                Select from Map
              </Text>
              <Icon name={'location'} size={25} color={'gray'} />
            </TouchableOpacity>

            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Skin Color
            </Text>
            <ColourPicker
              onSelect={color => handleInputChange('skinColor', color)}
            />

            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Health Alert
            </Text>
            <Text
              style={[
                textStyles.description,
                {marginTop: 10, textAlign: 'left'},
              ]}>
              Has any visible health concerns?
            </Text>
            <TouchableOpacity
              style={styles.uploadPhotoBox}
              // onPress={diseaseChooseImage()}
              >
              <Text
                style={[
                  textStyles.description,
                  {textAlign: 'left', marginLeft: 10, color: 'gray'},
                ]}>
                Upload Photo
              </Text>
              <Icon name={'camera'} size={25} color={'gray'} />
            </TouchableOpacity>
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Size
            </Text>
            <ThreeButtonsRow
              onSelect={size => handleInputChange('size', size)}
            />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Contact
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => handleInputChange('contact', text)}
              placeholder="Input Contact Here"
              multiline={true}
            />
          </ScrollView>
        </View>
        <DarkButton
          isDisabled={false}
          buttonTitle={'Next'}
          onPress={handleNext}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  postingScreen: {
    flex: 1,
  },
  backrgoundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wave: {
    width: '100%',
    height: '40%',
    position: 'absolute',
  },
  detailsBox: {
    height: '85%',
    width: '90%',
    backgroundColor: colorTheme.white,
    marginTop: 50,
    borderRadius: 15,
    elevation: 2,
    shadowColor: colorTheme.black,
    marginBottom: 10,
  },
  uploadPhotoBox: {
    backgroundColor: '#F5F2F0',
    height: 40,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 60,
    margin: 10,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
  },
  colourPicker: {
    margin: 20,
  },
  sizeButtonGroup: {
    flexDirection: 'row',
  },
});

export default PostingScreen;
