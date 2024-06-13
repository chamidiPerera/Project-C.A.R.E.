import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colours = [
  '#b87a3f',
  '#c9a477',
  '#d8bca4',
  '#5c544c',
  '#1b1c17',
  '#e3d7d1',
  '#ffffff',
];

const ColourPicker = ({onSelect}) => {
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    fetchSelectedColors();
  }, []);

  const fetchSelectedColors = async () => {
    try {
      const savedColorsString = await AsyncStorage.getItem('selectedColors');
      if (savedColorsString !== null) {
        const savedColors = JSON.parse(savedColorsString);
        setSelectedColors(savedColors);
      }
    } catch (error) {
      console.error('Error fetching selected colors:', error);
    }
  };

  const saveSelectedColors = async colors => {
    try {
      const colorsString = JSON.stringify(colors);
      await AsyncStorage.setItem('selectedColors', colorsString);
      console.log('Selected colors saved:', colors);
    } catch (error) {
      console.error('Error saving selected colors:', error);
    }
  };

  const handleSelectColor = color => {
    let updatedColors = [];
    if (selectedColors.includes(color)) {
      updatedColors = selectedColors.filter(c => c !== color);
    } else {
      updatedColors = [...selectedColors, color];
    }
    setSelectedColors(updatedColors);
    saveSelectedColors(updatedColors);
    onSelect(updatedColors);
  };

  const isSelected = color => {
    return selectedColors.includes(color);
  };

  return (
    <View style={styles.colourPicker}>
      {colours.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.circle,
            {backgroundColor: isSelected(color) ? `${color}80` : color},
          ]}
          onPress={() => handleSelectColor(color)}>
          {isSelected(color) && (
            <Icon
              name="checkmark"
              size={24}
              color="white"
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  colourPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  checkIcon: {
    position: 'absolute',
  },
});

export default ColourPicker;
