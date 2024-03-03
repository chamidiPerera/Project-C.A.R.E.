import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Post from '../components/Post';
import {textStyles} from '../theme/Theme';

const DogsInShelters = () => {
  const images = [
    {
      source: require('../images/dogImage.png'),
      location: 'Makuluduwa',
      distance: '300m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Example Location 2',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Example Location 2',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Example Location 2',
      distance: '500m',
    },
  ];

  return (
    <View style={styles.dogsInSheltersFeed}>
      <View style={styles.spacer}></View>
      <Text style={textStyles.title}>Stray dogs in Dog Shelters</Text>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Post
              imageSource={image.source}
              location={image.location}
              distance={image.distance}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dogsInSheltersFeed: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 20,
  },
  imageWrapper: {
    width: '48%', // Adjust as needed to fit two images per row
    marginBottom: 10,
  },
  spacer: {
    padding: 20,
  },
});

export default DogsInShelters;
