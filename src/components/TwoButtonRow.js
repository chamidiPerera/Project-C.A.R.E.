import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colorTheme, textStyles} from '../theme/Theme';

const TwoButtonsRow = () => {
  const [pressedButton, setPressedButton] = useState(null);

  const handlePress = place => {
    setPressedButton(place);
    switch (place) {
      case 'Shelter':
        console.log('Shelter button pressed');
        break;
      case 'Road':
        console.log('Road button pressed');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handlePress('Shelter')}
        style={[
          styles.button,
          pressedButton === 'Shelter' && styles.pressedButton,
        ]}>
        <Text
          style={[
            styles.buttonText,
            pressedButton === 'Shelter' && styles.pressedButtonText,
          ]}>
          Shelter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Road')}
        style={[
          styles.button,
          pressedButton === 'Road' && styles.pressedButton,
        ]}>
        <Text
          style={[
            styles.buttonText,
            pressedButton === 'Road' && styles.pressedButtonText,
          ]}>
          Road
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '92%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colorTheme.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: colorTheme.primaryColor,
    borderWidth: 1,
  },
  buttonText: {
    color: colorTheme.primaryColor,
    fontSize: textStyles.description.fontSize,
    fontFamily: textStyles.description.fontFamily,
  },
  pressedButton: {
    backgroundColor: colorTheme.primaryColor,
  },
  pressedButtonText: {
    color: colorTheme.white,
  },
});

export default TwoButtonsRow;
