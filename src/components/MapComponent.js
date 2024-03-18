import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapComponent = () => {
  const [mapType, setMapType] = useState('standard');
  const [zoomLevel, setZoomLevel] = useState(0.0922);
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setInitialRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setSelectedLocation({latitude, longitude});
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setInitialRegion(prevRegion => ({
        ...prevRegion,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      }));
    }
  }, [selectedLocation]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleMapPress = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setSelectedLocation({latitude, longitude});
  };

  const handleOkayButtonPress = () => {
    if (selectedLocation) {
      // Do something with the selected location
      Alert.alert(
        'Location Selected',
        `Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}`,
      );
    } else {
      Alert.alert('Error', 'Please select a location on the map.');
    }
  };

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel / 2;
    setZoomLevel(newZoomLevel);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: newZoomLevel,
        longitudeDelta: newZoomLevel,
      });
    }
  };

  const handleZoomOut = () => {
    const newZoomLevel = zoomLevel * 2;
    setZoomLevel(newZoomLevel);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: newZoomLevel,
        longitudeDelta: newZoomLevel,
      });
    }
  };

  const toggleMapType = () => {
    setMapType(prevMapType =>
      prevMapType === 'standard' ? 'satellite' : 'standard',
    );
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={handleMapPress}
        mapType={mapType}
        ref={mapRef}>
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title="Selected Location"
            description="You selected this location"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
        <Text style={styles.zoomButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.zoomButton, {bottom: 70}]}
        onPress={handleZoomOut}>
        <Text style={styles.zoomButtonText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.zoomButton, {bottom: 130}]}
        onPress={toggleMapType}>
        <Text style={styles.zoomButtonText}>Map Type</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.okayButton, {bottom: 130}]}
        onPress={handleOkayButtonPress}>
        <Text style={styles.okayText}>Map Type</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  okayButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  okayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  zoomButton: {
    position: 'absolute',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
  },
  zoomButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default MapComponent;
