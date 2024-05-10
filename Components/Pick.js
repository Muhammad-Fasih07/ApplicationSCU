import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { API_KEY } from '../src/env';

const FullScreenMap = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [pickupTime, setPickupTime] = useState(null);
  const [dropOffTime, setDropOffTime] = useState(null);
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showDropOffTimePicker, setShowDropOffTimePicker] = useState(false);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [mapType, setMapType] = useState('standard');
  const [highlightedRouteIndex, setHighlightedRouteIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestPermissionsAndLocate();
  }, []);

  useEffect(() => {
    if (startLocation && endLocation) {
      fetchRoutes(startLocation, endLocation).then((routes) => {
        setRoutes(routes);
        setTimeout(() => {
          const shortestRouteIndex = findShortestRouteIndex(routes);
          setHighlightedRouteIndex(shortestRouteIndex);
        }, 10000); // Change to 10 seconds
      });
    }
  }, [startLocation, endLocation]);

  const findShortestRouteIndex = (routes) => {
    return routes.reduce((shortestIndex, currentRoute, currentIndex, array) => {
      return currentRoute.duration.value < array[shortestIndex].duration.value ? currentIndex : shortestIndex;
    }, 0);
  };

  const requestPermissionsAndLocate = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      return;
    }
    setLoading(true);
    try {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    } catch (error) {
      console.error('Error getting current location:', error);
      setError('Error getting current location. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async (startLoc, endLoc) => {
    setLoading(true);
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${endLoc.latitude},${endLoc.longitude}&key=${API_KEY}&mode=driving&alternatives=true`;

    try {
      const response = await fetch(directionsUrl);
      const data = await response.json();
      if (data.status !== 'OK') {
        console.error('Failed to fetch directions:', data.error_message);
        setError('Failed to fetch directions. Please try again later.');
        return [];
      }
      return data.routes.map((route) => {
        const decodedPoints = polyline.decode(route.overview_polyline.points);
        const coordinates = decodedPoints.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        if (route.legs && route.legs[0] && route.legs[0].distance && route.legs[0].distance.text) {
          return {
            duration: route.legs[0].duration.text,
            distance: route.legs[0].distance.text,
            distanceValue: route.legs[0].distance.value,
            coordinates,
          };
        } else {
          console.error('Distance information not found in route:', route);
          return null;
        }
      }).filter(route => route !== null);
    } catch (error) {
      console.error('Error fetching directions:', error);
      setError('Error fetching directions. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
};


  const addPickupPoint = (location) => {
    setStartLocation(location);
  };

  const addDropoffPoint = (location) => {
    setEndLocation(location);
  };

  const handleAddPoint = () => {
    navigation.navigate('RouteScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <MapView
        style={{ flex: 1 }}
        region={currentPosition}
        showsUserLocation={true}
        followUserLocation={true}
        mapType={mapType}
      >
        {startLocation && <Marker coordinate={startLocation} title="Pickup Location" />}
        {endLocation && <Marker coordinate={endLocation} title="Drop-off Location" />}
        {routes.map((route, index) => (
          <Polyline
            key={index}
            coordinates={route.coordinates}
            strokeColor={index === highlightedRouteIndex ? 'green' : `rgba(2, 43, 66, ${0.8 - index * 0.2})`}
            strokeWidth={index === highlightedRouteIndex ? 8 : 6}
          >
            <Callout>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Route {index + 1}</Text>
                <Text>Duration: {route.duration}</Text>
                {route.distance && <Text>Distance: {(route.distanceValue / 1000).toFixed(2)} km</Text>}
              </View>
            </Callout>
          </Polyline>
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.mapTypeToggleButton}
        onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
      >
        <MaterialIcons name={mapType === 'standard' ? 'satellite' : 'map'} size={24} color="white" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <GooglePlacesAutocomplete
          placeholder="From where? (Pickup)"
          onPress={(data, details = null) => {
            addPickupPoint({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          query={{
            key: API_KEY,
            language: 'en',
            components: 'country:pk',
          }}
          fetchDetails={true}
          styles={{
            textInput: styles.input,
            listView: styles.listView,
            description: styles.description,
            poweredContainer: styles.poweredContainer,
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="To where? (Drop-off)"
          onPress={(data, details = null) => {
            addDropoffPoint({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          query={{
            key: API_KEY,
            language: 'en',
            components: 'country:pk',
          }}
          fetchDetails={true}
          styles={{
            textInput: styles.input,
            listView: styles.listView,
            description: styles.description,
            poweredContainer: styles.poweredContainer,
          }}
        />

<TouchableOpacity style={styles.submitButton} onPress={handleAddPoint}>
  <Text style={styles.submitButtonText}>Add Points</Text>
</TouchableOpacity>

        <View style={styles.timeButtonsContainer}>
          <TouchableOpacity onPress={() => setShowPickupTimePicker(true)} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>
              {pickupTime
                ? pickupTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
                : 'Pickup Time'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowDropOffTimePicker(true)} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>
              {dropOffTime
                ? dropOffTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
                : 'Drop-off Time'}
            </Text>
          </TouchableOpacity>
        </View>

        {showPickupTimePicker && (
          <DateTimePicker
            value={pickupTime || new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowPickupTimePicker(false);
              if (selectedDate) {
                setPickupTime(selectedDate);
              }
            }}
          />
        )}

        {showDropOffTimePicker && (
          <DateTimePicker
            value={dropOffTime || new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowDropOffTimePicker(false);
              if (selectedDate) {
                setDropOffTime(selectedDate);
              }
            }}
          />
        )}

        <TouchableOpacity style={styles.submitButton} >
          <Text style={styles.submitButtonText}>Submit Route</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  errorText: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
  },
  mapTypeToggleButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'rgba(2,43,66,0.8)',
    padding: 5,
    borderRadius: 10,
    zIndex: 1000,
    marginRight: 320,
  },
  inputContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(2,43,66,0.6)',
    bottom: 0,
    width: '100%',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  listView: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    maxHeight: 150,
    zIndex: 1000,
  },
  description: {
    fontWeight: 'bold',
  },
  poweredContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(2,43,66,0.8)',
  },
  timeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  timeButton: {
    padding: 10,
    backgroundColor: '#022B42',
    marginBottom: 10,
    borderRadius: 10,
  },
  timeButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#022B42',
    borderRadius: 10,
    marginBottom: 5,
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});

export default FullScreenMap;
