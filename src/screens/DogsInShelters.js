import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Post from '../components/Post';
import {colorTheme, textStyles} from '../theme/Theme';
import {useNavigation} from '@react-navigation/native';

const DogsInShelters = () => {
  const navigation = useNavigation();
  const navigateToDetailScreen = dog => {
    navigation.navigate('DogDetailScreen', {dog});
  };
  const navigateToNext = () => {
    navigation.navigate('PostingScreen');
  };
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
          {images.map((dog, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              onPress={() => navigateToDetailScreen(dog)}>
              <Post
                imageSource={dog.source}
                location={dog.location}
                distance={dog.distance}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.plusButton} onPress={navigateToNext}>
        <Text style={styles.buttonText}>Post about a dog in your shelter</Text>
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
    width: '48%',
    marginBottom: 10,
  },
  spacer: {
    padding: 20,
  },
  plusButton: {
    position: 'absolute',
    width: '95%',
    shadowColor: colorTheme.black, 
    shadowOffset: {height: 1, width: 1}, 
    shadowOpacity: 1, 
    shadowRadius: 1, 
    elevation: 5, 
    backgroundColor: colorTheme.primaryColor,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorTheme.primaryColor,
    bottom: 20,
  },
  buttonText: {
    color: colorTheme.white,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Lexend-Medium',
  },
});

export default DogsInShelters;
