import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL } from '../src/env';  // Adjust the path as necessary

const ComplaintForm = ({ route }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name || '');
  const [phonenumber, setPhoneNumber] = useState(user.phonenumber || '');
  const [complaint, setComplaint] = useState('');
  const [reason, setReason] = useState('');

  const reasons = [
    'Rude behavior',
    'Late arrival',
    'Unsafe driving',
    'Overcharging',
    'Not following route',
    'Refused to take the ride',
    'Unprofessional conduct',
    'Vehicle cleanliness',
    'Failed to show up',
    'Other'
  ];

  const handleSubmit = async () => {
    if (!name.trim() || !phonenumber.trim() || !complaint.trim() || !reason) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/complaints`, {
        name,
        phonenumber,
        description: complaint,
        reason,
        pid: user.pid, // Use passengerId from route params
      });

      if (response.status === 201) {
        Alert.alert('Complaint Submitted', 'Your complaint has been submitted successfully.');
        setName('');
        setPhoneNumber('');
        setComplaint('');
        setReason('');
      } else {
        Alert.alert('Error', 'An error occurred while submitting your complaint.');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      Alert.alert('Error', 'An error occurred while submitting your complaint.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/logoscu.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your Phone number"
          value={phonenumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your complaint"
          value={complaint}
          onChangeText={setComplaint}
          multiline
        />

        <Picker
          selectedValue={reason}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => itemIndex !== 0 && setReason(itemValue)}
        >
          <Picker.Item label="Select a reason for complaint" value="" />
          {reasons.map((reason, index) => (
            <Picker.Item key={index} label={reason} value={reason} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Complaint</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: '70%',
    height: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#022B42',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textArea: {
    height: 150,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#022B42',
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
  },
  button: {
    backgroundColor: '#FDD387',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#022B42',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ComplaintForm;
