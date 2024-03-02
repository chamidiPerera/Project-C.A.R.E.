import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import DarkButton from '../components/DarkButton';
import {useNavigation} from '@react-navigation/native';
import {colorTheme, textStyles} from '../theme/Theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import Post from '../components/Post';

const SelectedImages = () => {
  const issubmitClicked = true;
  const navigation = useNavigation();
  const navigateToNext = () => {
    navigation.navigate('SelectedImagesScreen');
  };

  return (
    <View style={styles.selectedImagesScreen}>
      <Text style={styles.selectedPhotosText}>2 Photos Selected</Text>
      <View style={styles.listOfImages}>{/* <Post /> */}</View>
      <View style={styles.submitForAnalysisButton}>
        <DarkButton
          buttonTitle="Submit for Analysis"
          onPressAction={navigateToNext}
        />
      </View>

      {issubmitClicked ? (
        <>
          <Text style={textStyles.title}>Predicted Diseases</Text>
          <View style={styles.diseasesResult}>
            <View style={styles.tickBox}>
              <Image
                style={styles.tick}
                source={require('../images/tick.png')}
              />
            </View>
            <View style={styles.diseaseInformation}>
              <Text style={styles.diseaseName}>Disease Name</Text>
              <Text style={styles.confidenceLevel}>Confidence: 90%</Text>
            </View>
          </View>
          <Text style={styles.justification}>
            The reason behind ths prediction is
          </Text>
        </>
      ) : (
        <SkeletonPlaceholder borderRadius={4}>
          <>
            <View style={styles.predictedDiseaseText}></View>
            <View style={styles.diseasesResult}>
              <View style={styles.tickBox}></View>
              <View style={styles.diseaseInformationSkeliton}></View>
            </View>
            <View style={styles.justificationSkeliton}></View>
          </>
        </SkeletonPlaceholder>
      )}
    </View>
  );
};

export default SelectedImages;

const styles = StyleSheet.create({
  selectedImagesScreen: {
    flex: 1,
  },

  submitForAnalysisButton: {
    marginBottom: 20,
  },
  listOfImages: {
    height: '50%',
    borderWidth: 1,
    borderColor: colorTheme.black,
    borderStyle: 'dashed',
    marginVertical: 20,
    marginHorizontal: '5%',
    borderRadius: 15,
  },
  selectedPhotosText: {
    marginTop: 30,
    color: colorTheme.black,
    fontSize: 20,
    fontFamily: 'Lexend-Bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  diseasesResult: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  tickBox: {
    backgroundColor: colorTheme.secondaryColor,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorTheme.secondaryColor,
  },
  tick: {
    width: 30,
    height: 30,
  },
  diseaseInformation: {
    height: 50,
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  diseaseName: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Lexend-Medium',
    textAlign: 'left',
  },
  confidenceLevel: {
    color: '#4F8596',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
    textAlign: 'left',
  },
  justification: {
    color: colorTheme.black,
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
    textAlign: 'left',
    width: '90%',
    alignSelf: 'center',
    // marginBottom: 20,
  },
  diseaseInformationSkeliton: {
    height: 50,
    width: '85%',
    marginLeft: 10,
  },
  justificationSkeliton: {
    height: 30,
    width: '90%',
    alignSelf: 'center',
  },
  predictedDiseaseText: {
    width: '50%',
    height: '20%',
    alignSelf: 'center',
  },
});
