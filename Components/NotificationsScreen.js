import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../src/env';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationsScreen = ({ route }) => {
  const { user } = route.params;
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/pending`);
      setPendingBookings(response.data);
    } catch (error) {
      console.error('Error fetching pending bookings:', error);
    }
  };

  const handleBookingResponse = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/bookings/${id}/status`, { status });
      fetchPendingBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingDetails}>
        <View style={styles.bookingRow}>
          <Icon name="place" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Pickup: {item.pickupPoint}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="flag" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Drop-off: {item.dropOffPoint}</Text>
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
          <Text style={styles.bookingText}>Passenger: {item.pname}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Icon name="phone" size={20} style={styles.icon} />
          <Text style={styles.bookingText}>Phone: {item.phonenumberp}</Text>
        </View>
      </View>
      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleBookingResponse(item.id, 'accepted')}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleBookingResponse(item.id, 'rejected')}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={pendingBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Pending Bookings</Text>
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
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FDD387',
  },
  bookingDetails: {
    marginBottom: 15,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  bookingText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Ensure text wraps correctly
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;
