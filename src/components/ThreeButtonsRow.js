import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colorTheme, textStyles } from '../theme/Theme';

const ThreeButtonsRow = ({ onSelect }) => {
  const [pressedButton, setPressedButton] = useState(null);

  const handlePress = (size) => {
    setPressedButton(size);
    onSelect(size);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handlePress('Small')}
        style={[
          styles.button,
          pressedButton === 'Small' && styles.pressedButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            pressedButton === 'Small' && styles.pressedButtonText,
          ]}
        >
          Small
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Medium')}
        style={[
          styles.button,
          pressedButton === 'Medium' && styles.pressedButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            pressedButton === 'Medium' && styles.pressedButtonText,
          ]}
        >
          Medium
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Large')}
        style={[
          styles.button,
          pressedButton === 'Large' && styles.pressedButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            pressedButton === 'Large' && styles.pressedButtonText,
          ]}
        >
          Large
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

export default ThreeButtonsRow;
