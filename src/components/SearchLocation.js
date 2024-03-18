import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SearchLocationComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);

  const handleLocationSelect = location => {
    setSelectedLocation(location);
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            handleLocationSelect({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              name: details.formatted_address,
            });
          }}
          query={{
            key: 'AIzaSyDb2ePslj51rGpPlf-XtaMhQ7UsZF4Qy6M',
            language: 'en',
          }}
          styles={{
            container: {
              flex: 1,
            },
            listView: {
              backgroundColor: '#FFF',
            },
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 7.873054, // Default initial position
          longitude: 80.771797,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}>
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title={selectedLocation.name}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  map: {
    flex: 1,
  },
});

export default SearchLocationComponent;
