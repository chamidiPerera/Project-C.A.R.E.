import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textStyles} from '../theme/Theme';
import VerticlSpacer from '../components/VerticlSpacer';

const InstructionsScreen = () => {
  return (
    <View style={styles.instructionsScreen}>
      <VerticlSpacer />
      <VerticlSpacer />
      <VerticlSpacer />
      <Text style={textStyles.subtitle}>01. Focus on Colors:</Text>
      <VerticlSpacer />
      <Text style={[textStyles.description, {textAlign: 'left'}]}>
        Red: Pay close attention to the red areas. These are the regions that
        the AI model found to be most important features related to the disease.{' '}
        {'\n'} {'\n'}
        Green: Next check if there is green, look at the green regions. These
        areas are of moderate symptoms. {'\n'} {'\n'}
        Yellow: If there is yellow colour, these regions are of some importance
        but less than those highlighted in red or green. {'\n'} {'\n'}
        Blue or Gray: Finally, notice the blue/ gray areas. These are areas that
        the model considers less important areas. They are often background or
        noise in the image.
      </Text>
      <VerticlSpacer />
      <Text style={textStyles.subtitle}>02. Compare with original image:</Text>
    </View>
  );
};

export default InstructionsScreen;

const styles = StyleSheet.create({
  instructionsScreen: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
});
