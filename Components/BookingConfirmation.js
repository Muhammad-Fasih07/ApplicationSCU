import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookingConfirmation = ({ route, navigation }) => {
  const { bookingDetails, user } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Icon name="check-circle" size={60} color="#4CAF50" style={styles.icon} />
          <Text style={styles.title}>Booking Confirmed!</Text>

          <View style={styles.receiptContainer}>
            <View style={styles.receiptRow}>
              <Text style={styles.label}>Pickup Point:</Text>
              <Text style={styles.value}>{bookingDetails.pickupPoint}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.label}>Drop-off Point:</Text>
              <Text style={styles.value}>{bookingDetails.dropOffPoint}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.label}>Seats:</Text>
              <Text style={styles.value}>{bookingDetails.seats}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.label}>Fare:</Text>
              <Text style={styles.value}>{`${bookingDetails.fare.toFixed(2)} PKR`}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.label}>Driver Name:</Text>
              <Text style={styles.value}>{bookingDetails.dname}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.label}>Cell No.:</Text>
              <Text style={styles.value}>{bookingDetails.phonenumberd}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.label}>Number Plate:</Text>
              <Text style={styles.value}>{bookingDetails.vehicle_number_plate}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard', { user })}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  receiptContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1.5,
    textAlign: 'right',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#022B42',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookingConfirmation;
