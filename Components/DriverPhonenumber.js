import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Text, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const DriverPhonenumber = ({ navigation, route }) => {
  const [phonenumber, setPhonenumber] = useState('');
  const { vehicleType,identity} = route.params;

  const handleChange = (value) => {
    setPhonenumber(value);
  };

  const handleSubmit = () => {
    const phoneRegex = /^\d{11}$/;

    if (!phoneRegex.test(phonenumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Pakistani phone number.');
      return;
    }

    // Log the values and then navigate to the next screen
    console.log('Driver:', identity);
    console.log('Vehicle Type:', vehicleType);
    console.log('Phone Number:', phonenumber);

    // Pass identityTypeDriver, vehicleType, and phonenumber to the next screen
    navigation.navigate('DriverPassword', {
      identity,
      vehicleType,
      phonenumber,
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
              Enter your phone number to create an account or log in
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

export default DriverPhonenumber;
