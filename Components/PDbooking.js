import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Polyline as RNMPolyline } from 'react-native-maps';
import axios from 'axios';
import { API_KEY } from '../src/env';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Polyline from '@mapbox/polyline';

const ButtonWithIcon = ({ iconName, label, onPress, isIncrement = false, isDecrement = false }) => (
  <TouchableOpacity style={styles.buttonWithIcon} onPress={onPress}>
    {iconName && <Icon name={iconName} size={20} color="white" />}
    <Text style={styles.buttonText}>{isDecrement ? '-' : isIncrement ? '+' : label}</Text>
  </TouchableOpacity>
);

const PDbooking = ({ route }) => {
  const { selectedRoute, dropOffPoint, pickupPoint } = route.params;
  const navigation = useNavigation();
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropOffCoordinates, setDropOffCoordinates] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [seats, setSeats] = useState(1);
  const [fare, setFare] = useState(0);

  useEffect(() => {
    fetchCoordinates(pickupPoint)
      .then((coords) => setPickupCoordinates(coords))
      .catch((error) => console.error('Error fetching pickup coordinates:', error));
    fetchCoordinates(dropOffPoint)
      .then((coords) => setDropOffCoordinates(coords))
      .catch((error) => console.error('Error fetching drop-off coordinates:', error));
  }, [pickupPoint, dropOffPoint]);

  useEffect(() => {
    if (pickupCoordinates && dropOffCoordinates) {
      fetchRoute(pickupCoordinates, dropOffCoordinates);
    }
  }, [pickupCoordinates, dropOffCoordinates]);

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: API_KEY,
        },
      });
      if (response.data.results.length > 0) {
        return {
          latitude: response.data.results[0].geometry.location.lat,
          longitude: response.data.results[0].geometry.location.lng,
          name: response.data.results[0].formatted_address,
        };
      } else {
        throw new Error('Zero results returned for the address.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  };

  const fetchRoute = async (origin, destination) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: `${origin.latitude},${origin.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
          key: API_KEY,
        },
      });
      const routeCoords = response.data.routes[0].overview_polyline.points;
      const decodedCoords = Polyline.decode(routeCoords);
      const formattedCoords = decodedCoords.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      setPolylineCoords(formattedCoords);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const calculateFare = () => {
    let totalDistance = polylineCoords.reduce((acc, curr, idx, src) => {
      if (idx > 0) {
        const prev = src[idx - 1];
        const dist = calculateDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);
        acc += dist;
      }
      return acc;
    }, 0);

    const fuelPricePerLiter = 290; // Fuel price in PKR
    const averageFuelConsumptionPerKm = 0.12; // Average fuel consumption per km (adjust as needed)
    const baseFarePerKm = 20; // Base fare per km, adjust as needed

    // Total fuel cost calculation
    const fuelCost = totalDistance * averageFuelConsumptionPerKm * fuelPricePerLiter;
    // Total fare calculation
    const monthlyFare = (baseFarePerKm * totalDistance + fuelCost) * 2 * 22 * seats;

    return monthlyFare;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    if (polylineCoords.length > 0) {
      const updatedFare = calculateFare();
      setFare(updatedFare);
    }
  }, [polylineCoords, seats]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6844,
          longitude: 73.0479,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {pickupCoordinates && (
          <Marker coordinate={pickupCoordinates} title="Pickup Point">
            <Callout>
              <Text>{pickupCoordinates.name}</Text>
            </Callout>
          </Marker>
        )}
        {dropOffCoordinates && (
          <Marker coordinate={dropOffCoordinates} title="Drop-off Point">
            <Callout>
              <Text>{dropOffCoordinates.name}</Text>
            </Callout>
          </Marker>
        )}
        {polylineCoords.length > 0 && <RNMPolyline coordinates={polylineCoords} strokeWidth={4} strokeColor="blue" />}
      </MapView>
      <View style={styles.bookingForm}>
        <View style={styles.row}>
          <ButtonWithIcon iconName="remove" label="" onPress={() => setSeats(Math.max(1, seats - 1))} isDecrement />
          <Text style={styles.seatsText}>{`${seats} Seat${seats > 1 ? 's' : ''}`}</Text>
          <ButtonWithIcon iconName="add" label="" onPress={() => setSeats(seats + 1)} isIncrement />
          <TouchableOpacity onPress={() => navigation.navigate('Paymenttype')}
            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3,borderRadius: 10, borderColor: 'green', padding: 5 }}
          >
            <Icon name="attach-money" size={24} color="green" />
            <Text style={{ marginLeft: 5, color: 'green' }}>Cash</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fareContainer}>
          <Text style={styles.label}>You Pay</Text>
          <Text style={styles.amount}>{`${fare.toFixed(2)} PKR`}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={() => alert('Booking successful!')}>
          <Text style={styles.bookButtonText}>BOOK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  bookingForm: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonWithIcon: {
    backgroundColor: 'rgba(2,43,66,0.8)',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#707070',
    fontSize: 16,
    marginLeft: 10,
  },
  seatsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E3170A',
  },
  bookButton: {
    backgroundColor: 'rgba(2,43,66,0.8)',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PDbooking;
