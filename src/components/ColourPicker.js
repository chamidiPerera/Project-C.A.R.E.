import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const colours = [
  '#b87a3f',
  '#c9a477',
  '#d8bca4',
  '#5c544c',
  '#1b1c17',
  '#e3d7d1',
  '#ffffff',
];

const ColourPicker = () => {
  const [selectedCircles, setSelectedCircles] = useState([]);

  const toggleSelectCircle = index => {
    const isSelected = selectedCircles.includes(index);
    if (isSelected) {
      setSelectedCircles(selectedCircles.filter(i => i !== index));
    } else {
      setSelectedCircles([...selectedCircles, index]);
    }
  };

  const isSelected = index => {
    return selectedCircles.includes(index);
  };

  return (
    <View style={styles.ColourPicker}>
      {colours.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.circle,
            {backgroundColor: isSelected(index) ? `${color}80` : color},
          ]}
          onPress={() => toggleSelectCircle(index)}>
          {isSelected(index) && (
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

export default ColourPicker;

const styles = StyleSheet.create({
  ColourPicker: {
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
    borderWidth: 0.3,
  },
  checkIcon: {
    position: 'absolute',
  },
});
