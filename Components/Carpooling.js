import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import { API_KEY, API_BASE_URL } from '../src/env';
import polyline from '@mapbox/polyline';

const Carpooling = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fare, setFare] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [shortestRouteIndex, setShortestRouteIndex] = useState(null);
  const [dummyCars, setDummyCars] = useState([]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (startLocation && endLocation) {
      calculateFareAndRoutes();
    }
  }, [startLocation, endLocation]);

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const calculateFareAndRoutes = async () => {
    if (!startLocation || !endLocation) return;

    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${endLocation.latitude},${endLocation.longitude}&key=${API_KEY}&mode=driving&alternatives=true&traffic_model=best_guess&departure_time=now`;
    try {
      const response = await fetch(directionsUrl);
      const data = await response.json();
      if (data.status !== 'OK') {
        console.error('Failed to fetch directions:', data.error_message);
        setError('Failed to fetch directions. Please try again later.');
        return;
      }

      const routesData = data.routes.map((route, index) => {
        const points = polyline.decode(route.overview_polyline.points);
        const coordinates = points.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));
        return {
          coordinates,
          distance: route.legs[0].distance.value,
          duration: route.legs[0].duration_in_traffic.value,
          index,
        };
      });

      setRoutes(routesData);

      const shortestRoute = routesData.reduce((prev, curr) => (curr.duration < prev.duration ? curr : prev), routesData[0]);
      setShortestRouteIndex(shortestRoute.index);

      const distanceInKm = shortestRoute.distance / 1000;
      const baseFare = 100; // base fare
      const farePerKm = 30; // fare per km

      const calculatedFare = baseFare + distanceInKm * farePerKm;
      setFare(calculatedFare.toFixed(2));
      generateDummyCars();
    } catch (error) {
      console.error('Error calculating fare:', error);
      setError('Error calculating fare. Please try again later.');
    }
  };

  const handleSubmit = async () => {
    if (formSubmitted) {
      Alert.alert('Error', 'Form already submitted. Please try again.');
      return;
    }

    if (!startLocation || !endLocation) {
      Alert.alert('Error', 'Please enter both start and end locations.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/passengerroutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          picklocation: startLocation.address,
          droplocation: endLocation.address,
          fare,
        }),
      });

      if (response.ok) {
        console.log('Route inserted successfully!');
        setFormSubmitted(true);
        Alert.alert('Success', 'Route added successfully!');
      } else {
        console.error('Error inserting route');
        Alert.alert('Error', 'Error adding route. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error adding route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addPickupPoint = (details) => {
    const newPickupLocation = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: details.formatted_address,
      realName: details.name || 'Unknown Location',
    };
    setStartLocation(newPickupLocation);
    if (endLocation) {
      generateDummyCars(newPickupLocation);
    }
  };

  const addDropoffPoint = (details) => {
    const newDropoffLocation = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: details.formatted_address,
      realName: details.name || 'Unknown Location',
    };
    setEndLocation(newDropoffLocation);
    if (startLocation) {
      generateDummyCars(startLocation);
    }
  };

  const generateDummyCars = (location) => {
    if (!location) return;
    const radius = 0.01; // Approximately 1 km
    const cars = Array.from({ length: 0 }).map((_, index) => ({
      latitude: location.latitude + (Math.random() - 0.5) * radius * 2,
      longitude: location.longitude + (Math.random() - 0.5) * radius * 2,
      id: index,
    }));
    setDummyCars(cars);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <MapView
        style={{ flex: 2 }}
        initialRegion={currentLocation}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {currentLocation && <Marker coordinate={currentLocation} pinColor="blue" />}
        {startLocation && <Marker coordinate={startLocation} title={startLocation.realName || 'Starting Location'} />}
        {endLocation && <Marker coordinate={endLocation} title={endLocation.realName || 'Ending Location'} />}
        {routes.map((route, index) => (
          <Polyline
            key={index}
            coordinates={route.coordinates}
            strokeColor={index === shortestRouteIndex ? 'green' : 'blue'}
            strokeWidth={3}
          />
        ))}
        {startLocation && endLocation && dummyCars.map((car) => (
          <Marker
            key={car.id}
            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
            title={`Dummy Car ${car.id + 1}`}
            // image={require('../assets/ca')} // Add your car icon image in the assets folder
            style={{ width: 32, height: 32 }} // Adjust the size of the car icon
          />
        ))}
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
              addPickupPoint(details);
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
              addDropoffPoint(details);
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Payment Method', 'You selected Cash')}>
            <Text style={styles.buttonText}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fareContainer}>
          <Text style={styles.fareText}>Fare: {fare} PKR</Text>
        </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#022B42',
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  fareContainer: {
    padding: 10,
    backgroundColor: '#022B42',
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  fareText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Carpooling;
