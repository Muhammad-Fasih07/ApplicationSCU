import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../src/env';  // Adjust the path as necessary
const ComplaintForm = () => {
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [complaint, setComplaint] = useState('');

  /**
   * Handle the form submission.
   *
   * @return {Promise<void>} Returns a Promise that resolves when the submission is complete.
   */
  const handleSubmit = async () => {
    // Check if any of the required fields are empty
    if (!name.trim() || !phonenumber.trim() || !complaint.trim()) {
      // Display an error message if any of the fields are empty
      Alert.alert('Error', 'Name, phone number, and complaint are required fields');
      return;
    }

    try {
      // Log the data before making the request
      console.log('Data to be submitted:', { name, phonenumber, complaint });

      // Make a POST request to the API endpoint
      const response = await axios.post(`${API_BASE_URL}/api/complaints`, {
        name: name,
        phonenumber: phonenumber,
        description: complaint,
      });

      if (response.status === 201) {
        // Display a success message if the complaint is successfully submitted
        Alert.alert('Complaint Submitted', 'Your complaint has been submitted successfully.');
        // Clear the form fields after successful submission if needed
        setName('');
        setPhoneNumber('');
        setComplaint('');
      } else {
        // Display an error message if the API request fails
        Alert.alert('Error', 'An error occurred while submitting your complaint.');
      }
    } catch (error) {
      // Display an error message if there is an error submitting the complaint
      console.error('Error submitting complaint:', error);
      Alert.alert('Error', 'An error occurred while submitting your complaint.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/logoscu.png')} // Replace with the path to your image
          style={{
            width: '60%',
            height: 150,
            marginBottom: 80,
            borderRadius: 40, // Add border radius to make it rounded
          }}
          resizeMode="center" // You can adjust the resizeMode as needed
        />
      </View>

      <TextInput
        style={{ borderWidth: 2, borderColor: '#022B42', borderRadius: 20, padding: 10, marginBottom: 20 }}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={{ borderWidth: 2, borderColor: '#022B42', borderRadius: 20, padding: 10, marginBottom: 20 }}
        placeholder="Enter your Phone number"
        value={phonenumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad" // Use "phone-pad" instead of "phone-number"
      />

      <TextInput
        style={{ borderWidth: 2, borderColor: '#022B42', borderRadius: 20, padding: 10, marginBottom: 20, height: 200 }}
        placeholder="Enter your complaint"
        value={complaint}
        onChangeText={(text) => setComplaint(text)}
        multiline
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#022B42',
          borderRadius: 20,
          padding: 15,
          marginTop: 80,
          alignItems: 'center',
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComplaintForm;
