import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [carNumberPlate, setCarNumberPlate] = useState('');

  const handleSubmit = () => {
    // Delay for 1 second before showing the success message (for demonstration purposes)
    // Similarly validate other fields
    
    navigation.navigate('Driverdoc');// Navigate to the next screen or perform other actions
    
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Driver')}
        style={{
          position: 'absolute',
          top: 30,
          left: 20,
          padding: 15,
          borderRadius: 50,
          backgroundColor: '#022B42',
        }}
      >
        <Ionicons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>

      <View
        style={{
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: 15,
          }}
        >
          Register Details
        </Text>

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 110,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 110,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 125,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Gender"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 115,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Van Brand"
          value={carBrand}
          onChangeText={(text) => setCarBrand(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 115,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Van Model"
          value={carModel}
          onChangeText={(text) => setCarModel(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 95,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="License Number"
          value={licenseNumber}
          onChangeText={(text) => setLicenseNumber(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 92,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Van Number Plate"
          value={carNumberPlate}
          onChangeText={(text) => setCarNumberPlate(text)}
        />
      </View>

      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: '#022B42',
            paddingVertical: 15,
            paddingHorizontal: 150,
            borderRadius: 25,
            width: '150%',
            alignItems: 'center',
            marginTop:50
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
