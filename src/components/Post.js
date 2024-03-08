import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon1 from 'react-native-vector-icons/Entypo';
import {colorTheme} from '../theme/Theme';

const Post = ({imageSource, location, distance}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.locationContainer}>
        <Icon1 name="location-pin" size={20} color={colorTheme.primaryColor} />
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationText}>{location}</Text>
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  image: {
    borderRadius: 10,
    width: 190,
    height: 150,
    resizeMode: 'cover',
  },
  locationTextContainer: {
    alignItems: 'left',
    marginTop: 5,
    width: 140,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    textAlign: 'left',
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Lexend-Medium',
  },
  distanceText: {
    marginLeft: 5,
    textAlign: 'left',
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
    width: '80%',
  },
});

export default Post;
