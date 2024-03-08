import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Post from '../components/Post';
import {colorTheme, textStyles} from '../theme/Theme';
import Icon from 'react-native-vector-icons/Entypo';

const DogsInShelters = () => {
  const images = [
    {
      source: require('../images/dogImage.png'),
      location: 'Makuluduwa',
      distance: '300m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Piliyandala',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Dehiwala',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Panadura',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Panadura',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Panadura',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Panadura',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Panadura',
      distance: '500m',
    },
    {
      source: require('../images/dogImage.png'),
      location: 'Panadura',
      distance: '500m',
    },
  ];

  return (
    <View style={styles.dogsInSheltersFeed}>
      <View style={styles.spacer}></View>
      <Text style={textStyles.title}>Stray dogs in Dog Shelters</Text>
      <ScrollView>
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
      </ScrollView>
      <TouchableOpacity style={styles.plusButton}>
        <Icon
          name="plus"
          size={30}
          color={colorTheme.white}
          backgroundColor={colorTheme.primaryColor}
          style={{
            borderRadius: 50,
            padding: 10,
          }}
        />
      </TouchableOpacity>
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
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default DogsInShelters;
