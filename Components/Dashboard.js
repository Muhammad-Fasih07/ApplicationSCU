import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dashboard = ({ navigation }) => {
  const handleLogout = () => {
    // Logic for handling logout
    // For example, clearing authentication tokens or user data
    navigation.navigate('Login'); // Navigate to the Login screen after logout
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, // Adjust paddingTop for better alignment
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Dashboard
      </Text>

      {/* Add various sections or components representing different functionalities */}
      <TouchableOpacity
        onPress={() => {
          // Navigate to different screens or perform actions based on dashboard items
          // Example: navigation.navigate('Profile') to navigate to the profile screen
        }}
        style={{
          backgroundColor: 'lightblue',
          padding: 20,
          marginBottom: 20,
          borderRadius: 10,
          width: '80%',
          alignItems: 'center',
        }}
      >
        <Text>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          // Logic or navigation for other dashboard functionalities
        }}
        style={{
          backgroundColor: 'lightgreen',
          padding: 20,
          marginBottom: 20,
          borderRadius: 10,
          width: '80%',
          alignItems: 'center',
        }}
      >
        <Text>Analytics</Text>
      </TouchableOpacity>

      {/* Logout button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: 'red',
          padding: 15,
          borderRadius: 10,
          width: '50%',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
