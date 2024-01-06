import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Implement your logic to handle the password reset here
    // You can send a reset password email or navigate to a reset password confirmation screen
    // For this example, we'll simply display an alert
    if (email) {
      alert(`Password reset request sent to ${email}`);
    } else {
      alert('Please enter your email address.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logoscu.png')}
        style={{
          width: '30%', // Use 100% width to make it responsive
          height: 80,
          marginBottom: 20, // Adjust margin as needed
          borderRadius: 20,
          backgroundColor: 'rgb(24,61,61)',
        }}
      />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="gray"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity onPress={handleResetPassword} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Navigate back to the login screen
        style={styles.goBackButton}
      >
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    fontSize: 16,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#022B42',
    padding: 15,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    marginTop: 20,
  },
  goBackButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
