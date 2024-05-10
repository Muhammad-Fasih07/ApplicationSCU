import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { API_KEY } from '../src/env';
import { API_BASE_URL } from '../src/env';

const Pick = ({ route, navigation }) => {
  const {user } = route.params;
  const { pickupPoints, dropOffPoints } = route.params || { pickupPoints: [], dropOffPoints: [] };
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isFormVisible, setIsFormVisible] = useState(true);

  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerTitle, setMarkerTitle] = useState('');
  const [pickupTime, setPickupTime] = useState(null);
  const [dropOffTime, setDropOffTime] = useState(null);
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showDropOffTimePicker, setShowDropOffTimePicker] = useState(false);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [mapType, setMapType] = useState('standard');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);


  useEffect(() => {
    requestPermissionsAndLocate();
  }, []);

  useEffect(() => {
    if (startLocation && endLocation) {
      fetchRoutes(startLocation, endLocation).then((routes) => {
        setRoutes(routes);
        const shortestRouteIndex = findShortestRouteIndex(routes);
        setSelectedRouteIndex(shortestRouteIndex);
        setTimeout(() => {
          setSelectedRouteIndex(shortestRouteIndex);
        }, 10000); // Delay of 10 seconds to display the selected route
      });
    }
  }, [startLocation, endLocation]);

  useEffect(() => {
    if (pickupPoints.length > 0 && dropOffPoints.length > 0) {
      const allPoints = [...pickupPoints, ...dropOffPoints];
      const coordinates = allPoints.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
      }));
      setPolylineCoordinates(coordinates);
    }
  }, [pickupPoints, dropOffPoints]);

  const findShortestRouteIndex = (routes) => {
    return routes.reduce((shortestIndex, currentRoute, currentIndex, array) => {
      return currentRoute.duration.value < array[shortestIndex].duration.value ? currentIndex : shortestIndex;
    }, 0);
  };

  const handleMapInteractionStart = () => {
    setIsFormVisible(false); // Hide form when map is interacted with
  };

  const handleMapInteractionEnd = () => {
    setIsFormVisible(true); // Show form when map interaction ends
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
      const routesData = data.routes.map((route) => {
        const decodedPoints = polyline.decode(route.overview_polyline.points);
        const coordinates = decodedPoints.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        return {
          duration: route.legs[0].duration.text,
          distance: route.legs[0].distance.text,
          coordinates,
        };
      });
      setRoutes(routesData);
    } catch (error) {
      console.error('Error fetching directions:', error);
      setError('Error fetching directions. Please try again later.');
      setRoutes([]);
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
    // Navigate to RouteScreen and pass pickupPoints and dropOffPoints
    navigation.navigate('RouteScreen', { pickupPoints, dropOffPoints });
  };

  const handleSelectRoute = (index) => {
    setSelectedRouteIndex(index);
  };

  const calculateMidpoint = (coordinates) => {
    const midIndex = Math.floor(coordinates.length / 2);
    return coordinates[midIndex];
  };

  const MidpointMarker = () => {
    if (selectedRouteIndex === null) return null;
    const midpoint = calculateMidpoint(routes[selectedRouteIndex].coordinates);
    return (
      <Marker coordinate={midpoint} anchor={{ x: 0.5, y: 0.5 }} opacity={0}>
        <Callout tooltip>
          <View style={styles.calloutContainer}>
            <Text style={styles.infoText}>Duration: {routes[selectedRouteIndex].duration}</Text>
            <Text style={styles.infoText}>Distance: {routes[selectedRouteIndex].distance}</Text>
          </View>
        </Callout>
      </Marker>
    );
  };

  const handleMapPress = async (event) => {
    if (fetchingLocation) {
      // If a location fetch is already in progress, ignore the click
      return;
    }
    
    const coords = event.nativeEvent.coordinate;
    setMarkerPosition(coords);
    try {
      setFetchingLocation(true); // Set the flag to indicate fetch in progress
      const apiKey = API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${apiKey}`;
      const response = await axios.get(url);
      if (response.data && response.data.results.length > 0) {
        const details = response.data.results[0].formatted_address;
        setMarkerTitle(details);
      } else {
        setMarkerTitle('Location details not found');
      }
    } catch (err) {
      console.error('Error fetching location details:', err);
      setMarkerTitle('Failed to fetch location details');
    } finally {
      setFetchingLocation(false); // Reset the flag after fetch is completed
    }
  };

  const handleSubmit = async () => {
    if (formSubmitted) {
      Alert.alert('Error', 'Form already submitted. Please try again.');
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/pickdroproutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          source: startLocation ? startLocation.address : 'Your Source',  // Ensuring source is fetched from state or replaced with a valid one
          destination: endLocation ? endLocation.address : 'Your Destination',  // Ensuring destination is fetched from state or replaced with a valid one
          pickupPoints: pickupPoints,
          dropoffPoints: dropOffPoints,
          pickupTime: pickupTime ? pickupTime.toISOString() : null,
          dropoffTime: dropOffTime ? dropOffTime.toISOString() : null,
          d_id: user.d_id, // This needs to be dynamically assigned as per your application's logic
        }),
      });
  
      if (!response.ok) {
        // Throw an error if the server response was not OK
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }
  
      const data = await response.json(); // Parse JSON response only if it is OK
      console.log('Route created successfully!', data);
      setFormSubmitted(true);
      Alert.alert('Success', 'Route created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      let errorMessage = 'Failed to create route. Please try again later.';
      if (error instanceof Error) { // Check if error is an instance of Error
        errorMessage = error.message;
      }
      console.error('Error creating route:', errorMessage);
      Alert.alert('Error', errorMessage);
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
        mapType={mapType}
        onPress={handleMapPress} // Hook the function to the onPress event
        onPanDrag={handleMapInteractionStart}
        onRegionChangeComplete={handleMapInteractionEnd}
      >
        {startLocation && <Marker coordinate={startLocation} title="Pickup Location" />}
        {endLocation && (
          <Marker
            coordinate={{ latitude: endLocation.latitude, longitude: endLocation.longitude }}
            title="End Location"
          />
        )}
        {routes.map((route, index) => (
          <Polyline
            key={index}
            coordinates={route.coordinates}
            strokeColor={index === selectedRouteIndex ? 'green' : 'rgba(2, 43, 66, 0.8)'}
            strokeWidth={index === selectedRouteIndex ? 8 : 2}
            onPress={() => handleSelectRoute(index)}
            tappable={true} // Ensure that the polyline is tappable
          />
        ))}
        {selectedRouteIndex !== null && <MidpointMarker coordinates={routes[selectedRouteIndex].coordinates} />}

        {pickupPoints.map((point, index) => (
          <Marker key={`pickup-${index}`} coordinate={point} title={`Pickup ${index + 1}`} pinColor="blue" />
        ))}
        {dropOffPoints.map((point, index) => (
          <Marker key={`dropoff-${index}`} coordinate={point} title={`Drop-off ${index + 1}`} pinColor="red" />
        ))}
        {markerPosition && (
          <Marker coordinate={markerPosition} title={markerTitle}>
            <Callout>
              <Text>{markerTitle || 'Selected Location'}</Text>
            </Callout>
          </Marker>
        )}
      </MapView>
      <TouchableOpacity
        style={styles.mapTypeToggleButton}
        onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
      >
        <MaterialIcons name={mapType === 'standard' ? 'satellite' : 'map'} size={24} color="white" />
      </TouchableOpacity>

      {isFormVisible && (
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
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Route</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
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
  infoBox: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  calloutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Pick;