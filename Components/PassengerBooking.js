import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_BASE_URL } from '../src/env';

const PassengerBooking = ({ route, navigation }) => {
  const { user } = route.params;
  const [acceptedBookings, setAcceptedBookings] = useState([]);

  useEffect(() => {
    console.log("User received in PassengerBooking:", user); // Add this line to log user details
    fetchApprovedBookings();
  }, []);

  const fetchApprovedBookings = async () => {
    try {
      console.log("Fetching approved bookings...");
      console.log("User ID:", user.pid); // Use user.pid instead of user.id
      const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
        params: { pid: user.pid, status: 'accepted' }
      });
      console.log("Bookings fetched:", response.data);
      setAcceptedBookings(response.data);
    } catch (error) {
      console.error('Error fetching approved bookings:', error);
    }
  };

  const handleTrack = async (points) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location to show the route",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted");
        navigation.navigate('Track', { points });
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingDetails}>
        <View style={styles.bookingRow}>
          <Icon name="place" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Pickup Point: {item.pickupPoint}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="flag" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Drop-off Point: {item.dropOffPoint}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="event-seat" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Seats: {item.seats}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="attach-money" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Fare: {item.fare} PKR</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="person" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Driver Name: {item.dname}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="phone" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Cell No.: {item.phonenumberd}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="directions-car" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Vehicle Number Plate: {item.vehicle_number_plate}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="check-circle" size={20} color="#4CAF50" style={styles.icon} />
          <Text style={styles.bookingText}>Status: {item.status}</Text>
        </View>
        {item.status === 'accepted' && (
          <TouchableOpacity style={styles.trackButton} onPress={() => handleTrack([{ pickupPoint: item.pickupPoint, dropOffPoint: item.dropOffPoint }])}>
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={acceptedBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Accepted Bookings</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No accepted bookings found.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022B42',
  },
  header: {
    padding: 20,
    backgroundColor: '#022B42',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FDD387',
  },
  headerText: {
    color: '#FDD387',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10, // Reduced padding to make the card smaller
    marginVertical: 5, // Reduced margin to make the card smaller
    marginHorizontal: 10, // Reduced margin to make the card smaller
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FDD387',
  },
  bookingDetails: {
    marginBottom: 10, // Reduced margin to make the card smaller
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Reduced margin to make the card smaller
  },
  icon: {
    marginRight: 10,
  },
  bookingText: {
    fontSize: 14, // Reduced font size to make the card smaller
    color: '#333',
    flex: 1, // Ensure text wraps correctly
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#FDD387',
  },
  trackButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FDD387',
    borderRadius: 5,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#022B42',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    padding: 15,
    backgroundColor: '#FDD387',
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  startButtonText: {
    color: '#022B42',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PassengerBooking;
