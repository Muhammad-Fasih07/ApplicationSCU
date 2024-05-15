import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Platform, Text, Image } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import PolylineLib from '@mapbox/polyline';
import { API_KEY } from '../src/env';
import carIcon from '../assets/car.png'; // Ensure you have a car icon in your assets

const Track = ({ route }) => {
  const { points } = route.params;
  const [coordinates, setCoordinates] = useState([]);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          setLoading(false);
          return;
        }

        console.log('Location permission granted');

        const coords = [];
        for (let point of points) {
          console.log('Fetching coordinates for point:', point);
          const pickupCoords = await fetchCoordinates(point.pickupPoint);
          const dropOffCoords = await fetchCoordinates(point.dropOffPoint);
          coords.push({ ...pickupCoords, type: 'pickup', name: point.pickupPoint });
          coords.push({ ...dropOffCoords, type: 'dropoff', name: point.dropOffPoint });
        }
        console.log('Fetched coordinates:', coords);
        setCoordinates(coords);

        const location = await Location.getCurrentPositionAsync({});
        const driverCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setDriverLocation(driverCoords);

        // Fetch the route from the driver's location to the first pickup point
        const firstPickupCoords = coords[0];
        const initialRouteCoords = await fetchRouteFromCoordinates(driverCoords, firstPickupCoords);

        // Fetch the route from each pickup point to the corresponding drop-off point
        const allCoords = [...initialRouteCoords];
        for (let i = 0; i < coords.length - 1; i += 2) {
          const pickupCoords = coords[i];
          const dropOffCoords = coords[i + 1];
          console.log('Fetching route from:', pickupCoords, 'to:', dropOffCoords);
          const routeCoords = await fetchRouteFromCoordinates(pickupCoords, dropOffCoords);
          allCoords.push(...routeCoords);
        }
        console.log('Fetched polyline coordinates:', allCoords);
        setPolylineCoords(allCoords);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        Alert.alert('Error', 'Failed to fetch coordinates. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [points]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const location = await Location.getCurrentPositionAsync({});
        const newDriverLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setDriverLocation(newDriverLocation);
        // Add driver's current location to the polyline coordinates to visually connect with the route
        if (polylineCoords.length > 0) {
          const updatedPolylineCoords = [newDriverLocation, ...polylineCoords];
          setPolylineCoords(updatedPolylineCoords);
        }
      } catch (error) {
        console.error('Error fetching driver location:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [polylineCoords]);

  const fetchCoordinates = async (address) => {
    if (!address) {
      console.error('Address is undefined');
      throw new Error('Address is undefined');
    }
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: API_KEY,
        },
      });
      console.log('Geocode response:', response.data);
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Zero results returned for the address.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  };

  const fetchRouteFromCoordinates = async (origin, destination) => {
    try {
      const params = {
        origin: `${origin.latitude},${origin.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
        key: API_KEY,
        mode: 'driving',
        traffic_model: 'best_guess',
        departure_time: 'now', // Include this parameter
      };
      console.log('Fetching route with params:', params);

      const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params,
      });
      console.log('Directions response:', response.data);

      if (response.data.routes.length > 0) {
        const points = PolylineLib.decode(response.data.routes[0].overview_polyline.points);
        console.log('Decoded polyline points:', points);
        return points.map(point => ({ latitude: point[0], longitude: point[1] }));
      } else {
        throw new Error('No routes found');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FDD387" />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: driverLocation ? driverLocation.latitude : 33.6844,
            longitude: driverLocation ? driverLocation.longitude : 73.0479,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsTraffic={true}
        >
          {coordinates.map((coord, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
              title={coord.name}
            >
              <Callout>
                <Text>{coord.name}</Text>
              </Callout>
            </Marker>
          ))}
          {driverLocation && (
            <Marker
              coordinate={driverLocation}
              title="Driver's Location"
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <Image source={carIcon} style={{ width: 30, height: 30 }} />
            </Marker>
          )}
          {polylineCoords.length > 0 && (
            <Polyline coordinates={polylineCoords} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Track;
