import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {colorTheme, textStyles} from '../theme/Theme';
import DarkButton from '../components/DarkButton';

const DogDetailScreen = ({route}) => {
  const {dog} = route.params;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/backgroundDoodle.png')}
        resizeMode="cover"
        style={styles.backrgoundImage}>
        <Image source={dog.source} style={styles.image} />
        <View style={styles.detailedBox}>
          <Text style={textStyles.title}>Dog Information</Text>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Location</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              {dog.location}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Shelter</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              SF Animal Care & Control
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Name</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              {dog.name}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Color</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              brown
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Size</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              Medium
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Health Status</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              Healthy
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Gender</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              Male
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={textStyles.subtitle}>Contact</Text>
            <Text
              style={[
                textStyles.description,
                {textAlign: 'right', width: 'auto'},
              ]}>
              077 932 6178
            </Text>
          </View>
        </View>
        <DarkButton buttonTitle={'Contact'}/>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backrgoundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '33%',
    position: 'absolute',
  },
  detailedBox: {
    height: 'auto',
    width: '90%',
    backgroundColor: colorTheme.white,
    marginTop: 230,
    borderRadius: 15,
    elevation: 2,
    shadowColor: colorTheme.black,
    marginBottom: 30,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    width: '100%',
  },
  column: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DogDetailScreen;
