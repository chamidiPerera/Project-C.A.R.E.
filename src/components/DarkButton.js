import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colorTheme, textStyles} from '../theme/Theme';

const DarkButton = props => {
  const {onPressAction, buttonTitle, isDisabled} = props;

  return (
    <TouchableOpacity
      onPress={onPressAction}
      style={styles.button}
      disabled={isDisabled}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default DarkButton;

const styles = StyleSheet.create({
  button: {
    width: '90%',
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
  },
  buttonText: {
    color: colorTheme.white,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Lexend-Medium',
  },
});
