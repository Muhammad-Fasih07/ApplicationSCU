import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';

const ComplaintForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');




 
/**
 * Handle the form submission.
 *
 * @return {Promise<void>} Returns a Promise that resolves when the submission is complete.
 */
const handleSubmit = async () => {
  // Check if any of the required fields are empty
  if (!name.trim() || !email.trim() || !complaint.trim()) {
      // Display an error message if any of the fields are empty
      Alert.alert('Error', 'Name, email, and complaint are required fields');
      return;
  }

  try {
      // Make a POST request to the API endpoint
      const response = await axios.post('http://172.17.248.156:12345/api/complaints', {
          name: name,
          email: email,
          description: complaint,
      });

      if (response.status === 201) {
          // Display a success message if the complaint is successfully submitted
          Alert.alert('Complaint Submitted', 'Your complaint has been submitted successfully.');
          // Clear the form fields after successful submission if needed
          setName('');
          setEmail('');
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
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
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
          // isSubmitDisabled ? '#ccc' : 
          backgroundColor: '#022B42', // Disable the button if fields are empty
          borderRadius: 20,
          padding: 15,
          marginTop: 80,
          alignItems: 'center',
        }}
        onPress={handleSubmit}
        // disabled={isSubmitDisabled} // Disable the button if fields are empty
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComplaintForm;
