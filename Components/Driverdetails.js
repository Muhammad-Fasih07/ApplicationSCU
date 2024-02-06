import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';

const Register = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [carNumberPlate, setVehicleNumberPlate] = useState('');

  // Extracting values from route.params if available
  const { vehicleType, phonenumber, password, identity } = route.params;

  const handleSubmit = () => {
    // Add validation logic as needed

    // Log the form data
    console.log('identity:', identity);
    console.log('Vehicle Type:', vehicleType);
    console.log('Phone Number:', phonenumber);
    console.log('Password:', password);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Gender:', gender);
    console.log('Vehicle Brand:', vehicleBrand);
    console.log('Vehicle Model:', vehicleModel);
    console.log('License Number:', licenseNumber);
    console.log('Vehicle Number Plate:', carNumberPlate);

    // Navigate to the next screen and pass necessary details
    navigation.navigate('Driverdoc', {
      identity,
      vehicleType,
      phonenumber,
      password,
      firstName,
      lastName,
      gender,
      vehicleBrand,
      vehicleModel,
      licenseNumber,
      carNumberPlate,
    });
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
            paddingHorizontal: 105,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Vehicle Brand"
          value={vehicleBrand}
          onChangeText={(text) => setVehicleBrand(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 105,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChangeText={(text) => setVehicleModel(text)}
        />

        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#022B42',
            borderRadius: 25,
            paddingHorizontal: 100,
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
            paddingHorizontal: 80,
            paddingVertical: 12,
            width: '80%',
            marginBottom: 22,
          }}
          placeholder="Vehicle Number Plate"
          value={carNumberPlate}
          onChangeText={(text) => setVehicleNumberPlate(text)}
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
            marginTop: 30,
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
