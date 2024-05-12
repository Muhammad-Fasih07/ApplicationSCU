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
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { API_KEY, API_BASE_URL } from '../src/env';

const Pick = ({ route, navigation }) => {
  
  const {pickupPoints = [], dropOffPoints = [] } = route.params;
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
  const [pickuppoints, setPickupPoints] = useState(null);
  const [dropoffpoints, setDropOffPoints] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [mapType, setMapType] = useState('standard');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);



  const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(date - offset)).toISOString().slice(0, -1);
    return localISOTime;
  };

  useEffect(() => {
    requestPermissionsAndLocate();
  }, []);

  useEffect(() => {
    if (startLocation && endLocation) {
      fetchRoutes(startLocation, endLocation).then(routes => {
        setRoutes(routes);
        const shortestRouteIndex = findShortestRouteIndex(routes);
        setSelectedRouteIndex(shortestRouteIndex);
        setTimeout(() => {
          setSelectedRouteIndex(shortestRouteIndex);
        }, 10000);
      });
    }
  }, [startLocation, endLocation]);

  useEffect(() => {
    if (pickupPoints.length > 0 && dropOffPoints.length > 0) {
      const allPoints = [...pickupPoints, ...dropOffPoints];
      const coordinates = allPoints.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
      }));
      setPolylineCoordinates(coordinates);
    }
  }, [pickupPoints, dropOffPoints]);

  const findShortestRouteIndex = (routes) => {
    if (!Array.isArray(routes) || routes.length === 0) {
      console.error('Invalid or empty routes array');
      return -1;
    }
    return routes.reduce((shortestIndex, currentRoute, currentIndex, array) => {
      return currentRoute.duration.value < array[shortestIndex].duration.value ? currentIndex : shortestIndex;
    }, 0);
  };

  const handleMapInteractionStart = () => {
    setIsFormVisible(false);
  };

  const handleMapInteractionEnd = () => {
    setIsFormVisible(true);
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
      const routesData = data.routes.map(route => {
        const decodedPoints = polyline.decode(route.overview_polyline.points);
        const coordinates = decodedPoints.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));
        return {
          duration: route.legs[0].duration,
          distance: route.legs[0].distance,
          coordinates,
        };
      });
      return routesData;
    } catch (error) {
      console.error('Error fetching directions:', error);
      setError('Error fetching directions. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    console.log(`Fetching address for: ${latitude}, ${longitude}`);
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        console.log(`Address found: ${response.data.results[0].formatted_address}`);
        return response.data.results[0].formatted_address;
      } else {
        console.log("No address found.");
        return 'Location not found';
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return 'Failed to fetch location';
    }
  };

  
  const handleLocationSelect = async (location, type) => {
    const address = await reverseGeocode(location.latitude, location.longitude);
    console.log(`Address to set: ${address}`);
    
    const point = {
      latitude: location.latitude,
      longitude: location.longitude,
      title: address // Use real address instead of location title
    };
  
    if (type === 'pickup') {
      const updatedPickups = [...pickupPoints, point];
      setPickupPoints(updatedPickups);
      console.log('Updated Pickups:', updatedPickups);
    } else if (type === 'dropoff') {
      const updatedDropoffs = [...dropOffPoints, point];
      setDropOffPoints(updatedDropoffs);
      console.log('Updated Dropoffs:', updatedDropoffs);
    } else if (type === 'start') {
      setStartLocation(point);
      console.log('Updated Start Location:', point);
    } else if (type === 'end') {
      setEndLocation(point);
      console.log('Updated End Location:', point);
    }
  };
  
  

  const addPickupPoint = (details) => {
    setStartLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      title: details.formatted_address, // Existing formatted address
      realName: details.name || 'Unknown Location' // Adding real name from the details
    });
  };
  
  const addDropoffPoint = (details) => {
    setEndLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      title: details.formatted_address, // Existing formatted address
      realName: details.name || 'Unknown Location' // Adding real name from the details
    });
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
    if (selectedRouteIndex === null || !routes[selectedRouteIndex]) return null;

    const { duration, distance } = routes[selectedRouteIndex];
    const midpoint = calculateMidpoint(routes[selectedRouteIndex].coordinates);

    return (
      <Marker coordinate={midpoint} anchor={{ x: 0.5, y: 0.5 }} opacity={0}>
        <Callout tooltip>
          <View style={styles.calloutContainer}>
            <Text style={styles.infoText}>Duration: {duration ? duration.text : 'N/A'}</Text>
            <Text style={styles.infoText}>Distance: {distance ? distance.text : 'N/A'}</Text>
          </View>
        </Callout>
      </Marker>
    );
  };

  const handleMapPress = async (event) => {
    if (fetchingLocation) return;

    const coords = event.nativeEvent.coordinate;
    setMarkerPosition(coords);
    setFetchingLocation(true);

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${API_KEY}`;
      const response = await axios.get(url);

      if (response.data && response.data.results.length > 0) {
        const details = response.data.results[0].formatted_address;
        setMarkerTitle(details); // Ensure details is a string
      } else {
        setMarkerTitle('Location details not found');
      }
    } catch (err) {
      console.error('Error fetching location details:', err);
      setMarkerTitle('Failed to fetch location details'); // Ensure this is a string
    } finally {
      setFetchingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (formSubmitted) {
      Alert.alert('Error', 'Form already submitted. Please wait or try again later.');
      return;
    }
  
    setFormSubmitted(true); // Prevent multiple submissions
  
    // Prepare data, including the new realName fields
    const requestData = {
      source: startLocation ? startLocation.title : null,
      destination: endLocation ? endLocation.title : null,
      pickupPoints: pickupPoints.map(point => ({
        ...point,
        title: point.title,
        realName: point.realName // Ensure realName is included
      })),
      dropoffPoints: dropOffPoints.map(point => ({
        ...point,
        title: point.title,
        realName: point.realName // Ensure realName is included
      })),
      pickupTime: pickupTime ? toLocalISOString(pickupTime) : null,
      dropoffTime: dropOffTime ? toLocalISOString(dropOffTime) : null,
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/pickdroproutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error occurred');
      }
  
      const data = await response.json();
      Alert.alert('Success', 'Route created successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Error creating route:', error.message);
      Alert.alert('Error', error.message);
      setFormSubmitted(false); // Allow re-submission if there's an error
    }
  };
  
  const onPickupTimeChange = (event, selectedDate) => {
    setShowPickupTimePicker(false);
    if (selectedDate) {
      setPickupTime(new Date(selectedDate));
    }
  };

  const onDropOffTimeChange = (event, selectedDate) => {
    setShowDropOffTimePicker(false);
    if (selectedDate) {
      setDropOffTime(new Date(selectedDate));
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
        onPress={handleMapPress}
        onPanDrag={handleMapInteractionStart}
        onRegionChangeComplete={handleMapInteractionEnd}
        handleLocationSelect={handleLocationSelect}
      >
        {startLocation && (
          <Marker
            coordinate={{ latitude: startLocation.latitude, longitude: startLocation.longitude }}
            title={startLocation.title || 'Starting Location'}
          />
        )}
        {endLocation && (
          <Marker
            coordinate={{ latitude: endLocation.latitude, longitude: endLocation.longitude }}
            title={endLocation.title || 'Ending Location'}
          />
        )}
        {Array.isArray(routes) &&
          routes.map((route, index) => (
            <Polyline
              key={index}
              coordinates={route.coordinates}
              strokeColor={index === selectedRouteIndex ? 'green' : 'rgba(2, 43, 66, 0.8)'}
              strokeWidth={index === selectedRouteIndex ? 8 : 2}
              onPress={() => handleSelectRoute(index)}
              tappable={true}
            />
          ))}
        {selectedRouteIndex !== null && <MidpointMarker coordinates={routes[selectedRouteIndex].coordinates} />}

        {pickupPoints.map((point, index) => (
          <Marker
            key={`pickup-${index}`}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title || `Pickup Point ${index + 1}`}
            pinColor="blue"
          />
        ))}
        {dropOffPoints.map((point, index) => (
          <Marker
            key={`dropoff-${index}`}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title || `Drop-off Point ${index + 1}`}
            pinColor="red"
          />
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
              // Ensure that details is not null
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
              // Ensure that details is not null
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
        onChange={onPickupTimeChange} // Use the new handler
      />
    )}
    {showDropOffTimePicker && (
      <DateTimePicker
        value={dropOffTime || new Date()}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={onDropOffTimeChange} // Use the new handler
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