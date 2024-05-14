import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookingConfirmation = ({ route, navigation }) => {
  const { bookingDetails, user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="check-circle" size={60} color="#4CAF50" style={styles.icon} />
        <Text style={styles.title}>Booking Confirmed!</Text>
        
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Pickup Point</Text>
          <Text style={styles.value}>{bookingDetails.pickupPoint}</Text>
        </View>
        
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Drop-off Point</Text>
          <Text style={styles.value}>{bookingDetails.dropOffPoint}</Text>
        </View>
        
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Seats</Text>
          <Text style={styles.value}>{bookingDetails.seats}</Text>
        </View>
        
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Fare</Text>
          <Text style={styles.value}>{`${bookingDetails.fare.toFixed(2)} PKR`}</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard', { user })}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
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
  infoBlock: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'rgba(2,43,66,0.8)',
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
