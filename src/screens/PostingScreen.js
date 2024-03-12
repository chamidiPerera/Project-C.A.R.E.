import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {colorTheme, textStyles} from '../theme/Theme';

import VerticlSpacer from '../components/VerticlSpacer';
import Icon from 'react-native-vector-icons/EvilIcons';
import ColourPicker from '../components/ColourPicker';
import LightButton from '../components/LightButton';
import ThreeButtonsRow from '../components/ThreeButtonsRow';
import DarkButton from '../components/DarkButton';
import TwoButtonsRow from '../components/TwoButtonRow';

const PostingScreen = () => {
  const [text, onChangeText] = React.useState('Input Additional Information');
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
            <TouchableOpacity style={styles.uploadPhotoBox}>
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
                { marginTop: 10, textAlign: 'left'},
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

export default PostingScreen;

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
