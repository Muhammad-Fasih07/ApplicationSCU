import React, { useState } from 'react';
import { View, Button, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function FileUploadScreen() {
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [vehiclePhoto, setVehiclePhoto] = useState(null);
  const [cnicPhoto, setCnicPhoto] = useState(null);
  const navigation = useNavigation();

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
  const handleSubmit = () => {
    
    // Similarly validate other fields
    
    navigation.navigate('Dashboard2');
    // Handle submission logic here
  };


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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              width: 150,
              height: 100,
            }}
          />
        ) : (
          <Button title="Select Driver Photo" onPress={() => pickImage('driver')} />
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
              width: 150,
              height: 100,
            }}
          />
        ) : (
          <Button title="Select License Photo" onPress={() => pickImage('license')} />
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
              width: 150,
              height: 100,
            }}
          />
        ) : (
          <Button title="Select Vehicle Photo" onPress={() => pickImage('vehicle')} />
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
              width: 150,
              height: 100,
              
            }}
          />
        ) : (
          <Button title="Select CNIC Photo" onPress={() => pickImage('cnic')} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard2')}
        style={{
          marginBottom: 20,
        }}
      >
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
}
