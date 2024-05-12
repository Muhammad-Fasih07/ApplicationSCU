import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../src/env';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ButtonWithIcon = ({ iconName, label, onPress, isIncrement = false, isDecrement = false }) => (
  <TouchableOpacity style={styles.buttonWithIcon} onPress={onPress}>
    {iconName && <Icon name={iconName} size={20} color="#707070" />}
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

  useEffect(() => {
    fetchCoordinates(pickupPoint)
      .then(coords => setPickupCoordinates(coords))
      .catch(error => console.error("Error fetching pickup coordinates:", error));
    fetchCoordinates(dropOffPoint)
      .then(coords => setDropOffCoordinates(coords))
      .catch(error => console.error("Error fetching drop-off coordinates:", error));
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
          key: API_KEY
        }
      });
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng, name: response.data.results[0].formatted_address };
      } else {
        throw new Error("Zero results returned for the address.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };
  
  const fetchRoute = async (origin, destination) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: `${origin.latitude},${origin.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
          key: API_KEY
        }
      });
      const routeCoords = response.data.routes[0].overview_polyline.points;
      const decodedCoords = decodePolyline(routeCoords);
      setPolylineCoords(decodedCoords);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  const handleBook = () => {
    // Add your booking logic here
    alert('Booking successful!');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6844,
          longitude: 73.0479,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}>
        {pickupCoordinates && (
          <Marker coordinate={pickupCoordinates} title="Pickup Point">
            <Callout><Text>{pickupCoordinates.name}</Text></Callout>
          </Marker>
        )}
        {dropOffCoordinates && (
          <Marker coordinate={dropOffCoordinates} title="Drop-off Point">
            <Callout><Text>{dropOffCoordinates.name}</Text></Callout>
          </Marker>
        )}
        {polylineCoords.length > 0 && (
          <Polyline coordinates={polylineCoords} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>
      <View style={styles.bookingForm}>
        <View style={styles.row}>
          <ButtonWithIcon iconName="attach-money" label="Cash" onPress={() => {}} />
          <View style={styles.seatSelector}>
            <ButtonWithIcon label="" onPress={() => setSeats(Math.max(1, seats - 1))} isDecrement />
            <Text style={styles.seatsText}>{`${seats} Seat`}</Text>
            <ButtonWithIcon label="" onPress={() => setSeats(seats + 1)} isIncrement />
          </View>
        </View>
        <View style={styles.fareContainer}>
          <Text style={styles.label}>You Pay</Text>
          <Text style={styles.amount}>5,800 PKR</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookButtonText}>BOOK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  map: {
    flex: 1
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
    elevation: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(144, 238, 144, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(2,43,66,1)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#fd7e14',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1.5,
    elevation: 2
  },
  buttonText: {
    color: '#707070',
    fontSize: 16,
    marginLeft: 10
  },
  seatSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2
  },
  seatsText: {
    color: '#707070',
    fontSize: 16,
    marginHorizontal: 20
  },
  fareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  bookButton: {
    backgroundColor: 'rgba(2,43,66,0.8)',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center'
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default PDbooking;
