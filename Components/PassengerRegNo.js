import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Text, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Ionicons from 'reaxiosact-native-vector-icons/Ionicons';
import axios from ''; // Import Axios

const App = ({ navigation }) => {
  const [phonenumber, setPhonenumber] = useState('');

  const handleChange = (value) => {
    setPhonenumber(value);
  };

  const handleSubmit = () => {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phonenumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Pakistani phone number.');
      return;
    }

    const backendEndpoint = 'http://192.168.100.7:5000/passenger/signup';

    // Use Axios to make the POST request
    axios
      .post(backendEndpoint, { phonenumber }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('Success:', response.data);
        // Handle successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred during registration.');
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 20,
          paddingTop: StatusBar.currentHeight || 0,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Selection')}
            style={{
              position: 'absolute',
              top: 15,
              left: 8,
              padding: 15,
              borderRadius: 40,
              backgroundColor: '#022B42',
            }}
          >
            <Ionicons name="arrow-back" size={20} color="#FDD387" />
          </TouchableOpacity>

          <View
            style={{
              marginTop: 120,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '400',
                marginBottom: 10,
              }}
            >
              Enter your phone number
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 20,
                color: 'gray',
              }}
            >
              Enter your phone number, to create an account or log in
            </Text>
          </View>

          <PhoneInput
            defaultValue={phonenumber}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              handleChange(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            style={{
              marginTop: 20,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            textContainerStyle={{
              fontSize: 16,
            }}
            textInputStyle={{
              fontSize: 16,
              color: '#333',
            }}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              marginTop: 375,
              backgroundColor: '#022B42',
              padding: 13.5,
              borderRadius: 25,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

export default App;
