import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colorTheme, textStyles} from '../theme/Theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import VerticlSpacer from '../components/VerticlSpacer';

const SelectedImages = () => {
  const route = useRoute();

  const {
    predictedBodyPart,
    bodyPartConfidenceLevel,
    predictedDiseases,
    diseaseConfidenceLevel,
    selectedPicture,
  } = route.params;

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const navigation = useNavigation();

  const navigateToNext = () => {
    navigation.navigate('SelectedImagesScreen');
  };

  const percentageBodyPartConfidence = Math.trunc(
    bodyPartConfidenceLevel * 100,
  );

  const percentageDiseaseConfidence = Math.trunc(diseaseConfidenceLevel * 100);

  return (
    <View style={styles.selectedImagesScreen}>
      <Text style={styles.selectedPhotosText}>Selected Photo</Text>
      <View style={styles.listOfImages}>
        {selectedPicture.map((photo, index) => (
          <Image
            key={index}
            style={styles.selectedPhoto}
            source={{uri: photo.uri}}
          />
        ))}
      </View>
      <View style={styles.submitForAnalysisButton}></View>

      {isDataLoaded ? (
        <>
          <View style={styles.predictedBodyPartBox}>
            <Text style={[textStyles.subtitle]}>
              Predicted Body Part (Skin/Eye) :
            </Text>
            {predictedBodyPart == 'eye' ? (
              <Text style={styles.diseaseName}>Eye</Text>
            ) : (
              <Text style={styles.diseaseName}>Skin</Text>
            )}
          </View>
          <View style={styles.predictedBodyPartBox}>
            {predictedBodyPart == 'eye' ? (
              <Text style={[textStyles.subtitle]}>
                Possibility of it being an eye :
              </Text>
            ) : (
              <Text style={[textStyles.subtitle]}>
                Possibility of it being skin :
              </Text>
            )}

            <Text
              style={[
                styles.diseaseName,
                {
                  color:
                    percentageDiseaseConfidence > 60 ? '#5d8ea1' : '#ffd4df',
                },
              ]}>
              {percentageBodyPartConfidence}%
            </Text>
          </View>
          <VerticlSpacer />
          <Text style={textStyles.title}>Predicted Disease</Text>
          <View style={styles.diseasesResult}>
            <View
              style={[
                styles.tickBox,
                {
                  backgroundColor:
                    percentageDiseaseConfidence > 60
                      ? colorTheme.secondaryColor
                      : '#ffd4df',
                },
              ]}>
              <Image
                style={styles.tick}
                source={require('../images/tick.png')}
              />
            </View>
            <View style={styles.diseaseInformation}>
              <Text style={styles.diseaseName}>
                {predictedDiseases === 'Blepharitis' &&
                  'Blepharitis (Inflammation of the eyelids)'}
                {predictedDiseases === 'Conjunctivitis' &&
                  'Conjunctivitis (Pink eye)'}
                {predictedDiseases === 'Entropion' &&
                  'Entropion (Inward rolling of the eyelid)'}
                {predictedDiseases === 'EyelidTumor' &&
                  'Eyelid Tumor (Abnormal growth on the eyelid)'}
                {predictedDiseases === 'HealthyEye' && 'Healthy Eye'}
                {predictedDiseases === 'Mastopathy' &&
                  'Mastopathy (Breast disorder)'}
                {predictedDiseases === 'Nuclear Sclerosis' &&
                  'Nuclear Sclerosis (Age-related change in the lens of the eye)'}
                {predictedDiseases === 'Pigmented Keratitis' &&
                  'Pigmented Keratitis (Inflammation of the cornea with pigment deposits)'}
                {predictedDiseases === 'circlar alopecia' &&
                  'Circular Alopecia (Hair loss in circular patterns)'}
                {predictedDiseases === 'flees' && 'Fleas Infestation'}
                {predictedDiseases === 'healthy' && 'Healthy Skin'}
                {predictedDiseases === 'runglong' && 'Runglong (Mange in dogs)'}
                {predictedDiseases === 'skin lesions' && 'Skin Lesions'}
              </Text>
              <Text
                style={[
                  styles.confidenceLevel,
                  {
                    color:
                      percentageDiseaseConfidence > 60 ? '#5d8ea1' : '#a14c4d',
                  },
                ]}>
                Diseases Possibility: {percentageDiseaseConfidence}%
              </Text>
            </View>
          </View>

          <Text style={styles.justification}>
            The reason behind ths prediction is
          </Text>
        </>
      ) : (
        <SkeletonPlaceholder borderRadius={4}>
          <>
            <View style={styles.justificationSkeliton}></View>
            <View style={styles.justificationSkeliton}></View>
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
    padding: 10,
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
    fontFamily: 'Lexend-Bold',
    textAlign: 'left',
  },
  confidenceLevel: {
    fontSize: 14,
    fontFamily: 'Lexend-Medium',
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
    marginBottom: 10,
  },
  predictedDiseaseText: {
    width: '50%',
    height: '20%',
    alignSelf: 'center',
  },
  selectedPhoto: {
    flex: 1,
  },
  predictedBodyPartBox: {
    marginLeft: 20,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
});
