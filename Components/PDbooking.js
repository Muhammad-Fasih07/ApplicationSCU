import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Callout, Polyline as RNMPolyline } from 'react-native-maps';
import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../src/env';
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
  const { user, selectedRoute } = route.params;
  const { dropOffPoint, pickupPoint } = route.params;
  const navigation = useNavigation();
  const [pickupDetails, setPickupDetails] = useState(null);
  const [dropOffDetails, setDropOffDetails] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [seats, setSeats] = useState(1);
  const [fare, setFare] = useState(0);

  useEffect(() => {
    const fetchInitialCoordinates = async () => {
      try {
        const pickupCoords = await fetchCoordinates(pickupPoint);
        const dropOffCoords = await fetchCoordinates(dropOffPoint);
        setPickupDetails(pickupCoords);
        setDropOffDetails(dropOffCoords);
      } catch (error) {
        console.error('Error fetching initial coordinates:', error);
        Alert.alert('Error', 'Failed to fetch initial coordinates. Please try again.');
      }
    };

    fetchInitialCoordinates();
  }, [pickupPoint, dropOffPoint]);

  useEffect(() => {
    if (pickupDetails && dropOffDetails) {
      fetchRoute(pickupDetails, dropOffDetails);
    }
  }, [pickupDetails, dropOffDetails]);

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: API_KEY,
        },
      });
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        const formattedAddress = response.data.results[0].formatted_address;
        return {
          latitude: lat,
          longitude: lng,
          name: formattedAddress,
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
      if (response.data.routes.length > 0) {
        const routeCoords = response.data.routes[0].overview_polyline.points;
        const decodedCoords = Polyline.decode(routeCoords);
        const formattedCoords = decodedCoords.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setPolylineCoords(formattedCoords);
      } else {
        throw new Error('No routes found');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      Alert.alert('Error', 'Failed to fetch route. Please try again.');
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

    const baseFare = 60; // Base fare in PKR
    const farePerKm = 30; // Fare per kilometer in PKR
    const timeFarePerMinute = 2; // Fare per minute in PKR (assume some constant time)
    const workingDaysPerMonth = 22; // Number of working days per month

    // Assume an average speed to calculate total time (time = distance / speed)
    const averageSpeedKmPerHour = 30; // Average speed in km/h
    const totalTimeInMinutes = (totalDistance / averageSpeedKmPerHour) * 60;

    const distanceFare = totalDistance * farePerKm;
    const timeFare = totalTimeInMinutes * timeFarePerMinute;

    // Monthly fare calculation
    const monthlyFare = (baseFare + distanceFare + timeFare) * seats * workingDaysPerMonth;
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

  const confirmBooking = async () => {
    try {
      const bookingDetails = {
        pickupPoint: pickupDetails.name, // Save real name
        dropOffPoint: dropOffDetails.name, // Save real name
        seats,
        fare,
        pid: user.pid, // Ensure the correct key is used (pid instead of user)
        pname: user.name,
        phonenumberp: user.phonenumber,
        d_id: selectedRoute.d_id,
        dname: selectedRoute.name,
        phonenumberd: selectedRoute.phonenumber,
        vehicle_number_plate: selectedRoute.vehicle_number_plate,
      };

      const response = await axios.post(`${API_BASE_URL}/api/bookings`, bookingDetails);

      if (response.status === 200) {
        alert('Booking successful!');
        navigation.navigate('BookingConfirmation', { bookingDetails, user });
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Booking failed. Please try again.');
    }
  };

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
        {pickupDetails && (
          <Marker coordinate={pickupDetails} title="Pickup Point">
            <Callout>
              <Text>{pickupDetails.name}</Text>
            </Callout>
          </Marker>
        )}
        {dropOffDetails && (
          <Marker coordinate={dropOffDetails} title="Drop-off Point">
            <Callout>
              <Text>{dropOffDetails.name}</Text>
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
            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, borderRadius: 10, borderColor: 'green', padding: 5 }}
          >
            <Icon name="attach-money" size={24} color="green" />
            <Text style={{ marginLeft: 5, color: 'green' }}>Cash</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fareContainer}>
          <Text style={styles.label}>You Pay</Text>
          <Text style={styles.amount}>{`${fare.toFixed(2)} PKR`}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={confirmBooking}>
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
