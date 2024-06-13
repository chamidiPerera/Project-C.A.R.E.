import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorTheme, textStyles} from '../theme/Theme';
import VerticlSpacer from '../components/VerticlSpacer';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const XAI = () => {
  const route = useRoute();

  const {selectedPicture, imageDetails} = route.params;
  const [imageSource, setImageSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const nativegateToNext = () => {
    navigation.navigate('InstructionsScreen');
  };

  useEffect(() => {
    const getHeatMap = async () => {
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: imageDetails.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        const response = await axios.post(
          // 'http://10.0.2.2:5000/predict',
          'http://192.168.199.210:5000/lime_explanation', // lucifer
          // "http://127.0.0.1:5000/predict",
          formData,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const {lime_explanation} = response.data;
        console.log({lime_explanation});
        if (typeof lime_explanation === 'string') {
          setImageSource(`data:image/png;base64,${lime_explanation}`);
          setLoading(false);
        } else {
          console.error('Invalid lime_explanation:', lime_explanation);
          Alert.alert('Error', 'Invalid lime explanation image data received.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching Lime explanation:', error);
        Alert.alert(
          'Error',
          'Failed to fetch Lime explanation image. Please try again.',
        );
        setLoading(false);
      }
    };

    getHeatMap();
  }, []);

  return (
    <View style={{flex: 1}}>
      <VerticlSpacer />
      <VerticlSpacer />
      <VerticlSpacer />
      <Text style={[textStyles.subtitle, {marginLeft: 20}]}>
        Original Image
      </Text>
      <View style={styles.listOfImages}>
        {selectedPicture.map((photo, index) => (
          <Image
            key={index}
            style={styles.selectedPhoto}
            source={{uri: photo.uri}}
          />
        ))}
      </View>
      <Text style={[textStyles.subtitle, {marginLeft: 20}]}>
        Image which shows the ipacted ares
      </Text>

      <TouchableOpacity onPress={nativegateToNext}>
        <Text style={[textStyles.description, {marginLeft: 20}]}>
          wondering how to find the impacted areas? Click here
        </Text>
      </TouchableOpacity>

      <View style={styles.listOfImages}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={4}>
            <View style={styles.XAIImageSkelton}></View>
          </SkeletonPlaceholder>
        ) : (
          imageSource && (
            <Image style={styles.limeImage} source={{uri: imageSource}} />
          )
        )}
      </View>
    </View>
  );
};

export default XAI;

const styles = StyleSheet.create({
  limeImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20,
  },

  selectedPhoto: {
    // width: 200,
    // height: 200,
    flex: 1,
  },

  listOfImages: {
    height: '40%',
    borderWidth: 1,
    borderColor: colorTheme.black,
    borderStyle: 'dashed',
    marginVertical: 20,
    marginHorizontal: '5%',
    borderRadius: 15,
    padding: 10,
  },
  XAIImageSkelton: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
