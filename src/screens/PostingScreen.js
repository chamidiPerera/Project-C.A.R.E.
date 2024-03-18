import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import Icon from 'react-native-vector-icons/EvilIcons';
import {colorTheme, textStyles} from '../theme/Theme';
import VerticlSpacer from '../components/VerticlSpacer';
import ColourPicker from '../components/ColourPicker';
import ThreeButtonsRow from '../components/ThreeButtonsRow';
import DarkButton from '../components/DarkButton';
import TwoButtonsRow from '../components/TwoButtonRow';
import {useNavigation} from '@react-navigation/native';
import GooglePlacesInput from '../components/SearchLocation';
import SearchLocationComponent from '../components/SearchLocation';

const PostingScreen = () => {
  const [text, onChangeText] = useState('Input Additional Information');
  const [showMap, setShowMap] = useState(false);

  const navigation = useNavigation();
  const navigateToMap = () => {
    navigation.navigate('MapComponent');
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
            <TwoButtonsRow />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Photo
            </Text>
            <TouchableOpacity style={styles.uploadPhotoBox}>
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
              Additional information
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder="Input Addition Information Here"
              multiline={true}
            />
            <Text
              style={[textStyles.subtitle, {marginLeft: 20, marginTop: 10}]}>
              Location
            </Text>
            <SearchLocationComponent />
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

            <View style={styles.colourPicker}>
              <ColourPicker />
            </View>
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
            <TouchableOpacity style={styles.uploadPhotoBox}>
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
            <ThreeButtonsRow />
          </ScrollView>
        </View>
        <DarkButton isDisabled={true} buttonTitle={'Next'} />
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
