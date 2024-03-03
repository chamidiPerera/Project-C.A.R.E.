import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Post = ({imageSource, location, distance}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.distanceText}>{distance}</Text>
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
    width: '100%',
    height: 150, // Adjust height as per your requirement
    resizeMode: 'cover',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: '100%',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 16,
  },
  distanceText: {
    marginLeft: 'auto',
    fontSize: 16,
  },
});

export default Post;
