import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colorTheme} from '../theme/Theme';

const LightButton = props => {
  const {onPressAction, buttonTitle, showIcon} = props;

  return (
    <TouchableOpacity onPress={onPressAction} style={styles.button}>
      {showIcon ? (
        <View style={styles.buttonWithIcon}>
          <Image
            style={styles.icon}
            source={require('../images/cameraIcon.png')}
          />
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </View>
      ) : (
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      )}
    </TouchableOpacity>
  );
};

export default LightButton;

const styles = StyleSheet.create({
  button: {
    width: '90%',
    shadowColor: colorTheme.black, // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: colorTheme.white,
    elevation: 3, // Android
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorTheme.primaryColor,
    alignItems: 'center',
  },
  buttonText: {
    color: colorTheme.primaryColor,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Lexend-Medium',
  },
  buttonWithIcon: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
