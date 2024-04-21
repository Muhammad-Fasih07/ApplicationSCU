import React, { useState } from 'react';
import { View, Button, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const FileUploadScreen = ({ route }) => {
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [vehiclePhoto, setVehiclePhoto] = useState(null);
  const [cnicPhoto, setCnicPhoto] = useState(null);
  const navigation = useNavigation();

  const {
    firstName,
    lastName,
    gender,
    vehicleType,
    phonenumber,
    password,
    vehicleBrand,
    vehicleModel,
    licenseNumber,
    carNumberPlate,
    identity,
  } = route.params ;

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      switch (type) {
        case 'driver':
          setDriverPhoto(result.assets[0].uri);
          break;
        case 'license':
          setLicensePhoto(result.assets[0].uri);
          break;
        case 'vehicle':
          setVehiclePhoto(result.assets[0].uri);
          break;
        case 'cnic':
          setCnicPhoto(result.assets[0].uri);
          break;
        default:
          break;
      }
    }
  };
  

  const submitData = async () => {
   
  
      // Make the API request to your backend endpoint for driver registration
      const response = await axios.post('http://192.168.100.6:8082/api/registerDriver', {
        identity,
        type: vehicleType,
        firstName,
        lastName,
        phoneNumber: phonenumber,
        password,
        gender,
        vehicleBrand,
        vehicleModel,
        licenseNumber,
        vehicleNumberPlate: carNumberPlate,
        driverPhoto,
        licensePhoto,
        vehiclePhoto,
        cnicPhoto,
      });
  
      // Handle the API response as needed
      if (response.status === 201) {
        Alert.alert('Success', 'Driver registered successfully!');
        // Redirect to the next screen or perform any other action
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Failed to register driver. Please try again.');
      }
   
  };
  


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Logo Image */}
      <Image
        source={require('../assets/logoscu.png')}
        style={{ width: 200, height: 140, resizeMode: 'contain', marginBottom: 20, borderRadius: 40 }}
      />

      <TouchableOpacity
        style={{
          marginBottom: 20,
        }}
        onPress={() => pickImage('driver')}
      >
        {driverPhoto ? (
          <Image
            source={{ uri: driverPhoto }}
            style={{
              width: 170,
              height: 110,
            }}
          />
        ) : (
          <Button title="Select Driver Photo" color="#022B42" onPress={() => pickImage('driver')} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginBottom: 20,
        }}
        onPress={() => pickImage('license')}
      >
        {licensePhoto ? (
          <Image
            source={{ uri: licensePhoto }}
            style={{
              width: 170,
              height: 110,
            }}
          />
        ) : (
          <Button title="Select License Photo" color="#022B42" onPress={() => pickImage('license')} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginBottom: 20,
        }}
        onPress={() => pickImage('vehicle')}
      >
        {vehiclePhoto ? (
          <Image
            source={{ uri: vehiclePhoto }}
            style={{
              width: 170,
              height: 110,
            }}
          />
        ) : (
          <Button title="Select Vehicle Photo" color="#022B42" onPress={() => pickImage('vehicle')} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginBottom: 20,
        }}
        onPress={() => pickImage('cnic')}
      >
        {cnicPhoto ? (
          <Image
            source={{ uri: cnicPhoto }}
            style={{
              width: 170,
              height: 110,
            }}
          />
        ) : (
          <Button title="Select CNIC Photo" color="#022B42" onPress={() => pickImage('cnic')} />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={submitData}>
        <View
          style={{
            backgroundColor: '#022B42',
            padding: 12,
            paddingHorizontal: 110,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            Submit
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FileUploadScreen;
