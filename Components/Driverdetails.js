import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Register = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

   // Extracting values from route.params if available
   const { vehicleType, phonenumber, password, identity } = route.params;

  const handleSubmit = () => {
    navigation.navigate('Driverdoc', {
      identity,
      vehicleType,
      phonenumber,
      password,
      firstName,
      lastName,
      gender,
      licenseNumber,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50 ,backgroundColor:'#F5F5DC'}}>
      <Text style={{ fontSize: 25, fontWeight: '400', textAlign: 'center', marginBottom: 15 ,fontWeight:'bold'}}>
        Register Details
      </Text>

      <TextInput
        style={{
          width: '90%',
          height: 50,
          borderBottomWidth: 1,
          borderColor: 'gray',
          marginBottom: 20,
          paddingHorizontal: 10,
          fontSize: 18
        }}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={{
          width: '90%',
          height: 50,
          borderBottomWidth: 1,
          borderColor: 'gray',
          marginBottom: 20,
          paddingHorizontal: 10,
          fontSize: 18
        }}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <View style={{ borderBottomWidth: 1, borderColor: 'gray', width: '90%', marginBottom: 20 }}>
        <Picker
          selectedValue={gender}
          style={{ width: '100%', height: 50 }}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Custom" value="custom" />
        </Picker>
      </View>

      

      

      <TextInput
        style={{
          width: '90%',
          height: 50,
          borderBottomWidth: 1,
          borderColor: 'gray',
          marginBottom: 20,
          paddingHorizontal: 10,
          fontSize: 18
        }}
        placeholder="License Number"
        value={licenseNumber}
        onChangeText={setLicenseNumber}
      />

      
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#022B42',
          width: '90%',
          paddingVertical: 15,
          borderRadius: 25,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
