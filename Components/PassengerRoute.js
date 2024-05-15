import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { API_KEY, API_BASE_URL } from '../src/env';

const PassengerRoute = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestPermissionsAndLocate();
  }, []);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      fetchRoute(pickupLocation, dropoffLocation);
    }
  }, [pickupLocation, dropoffLocation]);

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

  const fetchRoute = async (startLoc, endLoc) => {
    setLoading(true);
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${endLoc.latitude},${endLoc.longitude}&key=${API_KEY}&mode=driving&alternatives=true&traffic_model=best_guess&departure_time=now`;
    try {
      const response = await axios.get(directionsUrl);
      if (response.data.status !== 'OK') {
        console.error('Failed to fetch directions:', response.data.error_message);
        setError('Failed to fetch directions. Please try again later.');
        return;
      }
      const points = polyline.decode(response.data.routes[0].overview_polyline.points);
      const coordinates = points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
      setPolylineCoordinates(coordinates);
    } catch (error) {
      console.error('Error fetching directions:', error);
      setError('Error fetching directions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!pickupLocation || !dropoffLocation) {
      Alert.alert('Error', 'Please select both pickup and drop-off locations.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/route-request`, {
        pickuplocation: pickupLocation.address,
        dropofflocation: dropoffLocation.address,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Route request submitted successfully!');
      } else {
        Alert.alert('Error', 'Failed to submit route request.');
      }
    } catch (error) {
      console.error('Error submitting route request:', error);
      Alert.alert('Error', 'Failed to submit route request.');
    }
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
        mapType="standard"
      >
        {pickupLocation && (
          <Marker
            coordinate={{ latitude: pickupLocation.latitude, longitude: pickupLocation.longitude }}
            title="Pickup Location"
          />
        )}
        {dropoffLocation && (
          <Marker
            coordinate={{ latitude: dropoffLocation.latitude, longitude: dropoffLocation.longitude }}
            title="Drop-off Location"
          />
        )}
        {polylineCoordinates.length > 0 && (
          <Polyline coordinates={polylineCoordinates} strokeColor="blue" strokeWidth={4} />
        )}
      </MapView>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <GooglePlacesAutocomplete
          placeholder="From where? (Pickup)"
          onPress={(data, details = null) => {
            if (details) {
              setPickupLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: details.formatted_address,
                realName: details.name || 'Unknown Location',
              });
            }
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
            if (details) {
              setDropoffLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: details.formatted_address,
                realName: details.name || 'Unknown Location',
              });
            }
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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

export default PassengerRoute;
