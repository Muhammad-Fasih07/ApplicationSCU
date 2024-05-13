import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { API_BASE_URL } from '../src/env'; // Ensure this points to your API server

const Vehicleinfo = ({ navigation, route }) => {
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [carNumberPlate, setVehicleNumberPlate] = useState('');
  const [vehiclePhoto, setvehiclePhoto] = useState(null);
  const [vehicleCC, setVehicleCC] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { user } = route.params;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setvehiclePhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (formSubmitted) {
      Alert.alert('Error', 'Form already submitted. Please try again.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicle_brand: vehicleBrand,
          vehicle_model: vehicleModel,
          vehicle_number_plate: carNumberPlate,
          vehicle_photo: vehiclePhoto,
          vehicle_cc: vehicleCC,
          vehicle_type: vehicleType, // Add vehicle type field
          d_id: user.d_id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Vehicle inserted successfully!');
        setFormSubmitted(true);
        Alert.alert('Success', 'Vehicle added successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        console.error('Error inserting vehicle', data.message);
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Network error, please try again later.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: '#F5F5DC',
      }}
    >
      <Image
        source={require('../assets/logoscu.png')}
        style={{
          width: '30%',
          height: 80,
          marginBottom: 10,
          borderRadius: 20,
          backgroundColor: 'rgb(24,61,61)',
        }}
      />
      <Text style={{ fontSize: 25, fontWeight: '400', textAlign: 'center', marginBottom: 15, fontWeight: 'bold' }}>
        Vehicle Details
      </Text>

      <View style={{ borderBottomWidth: 1, borderColor: 'gray', width: '90%', marginBottom: 10 }}>
        <Picker
          selectedValue={vehicleBrand}
          style={{ width: '100%', height: 50 }}
          onValueChange={(itemValue, itemIndex) => setVehicleBrand(itemValue)}
        >
          <Picker.Item label="Select Vehicle Brand" value="" />
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Honda" value="Honda" />
          <Picker.Item label="Suzuki" value="Suzuki" />
          <Picker.Item label="Hyundai" value="Hyundai" />
          <Picker.Item label="KIA" value="KIA" />
          <Picker.Item label="Daihatsu" value="Daihatsu" />
          <Picker.Item label="Nissan" value="Nissan" />
          <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
          <Picker.Item label="BMW" value="BMW" />
          <Picker.Item label="Audi" value="Audi" />
          <Picker.Item label="Mitsubishi" value="Mitsubishi" />
          <Picker.Item label="FAW" value="FAW" />
          <Picker.Item label="Lexus" value="Lexus" />
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Range Rover" value="Range Rover" />
          <Picker.Item label="Land Rover" value="Land Rover" />
          <Picker.Item label="Ford" value="Ford" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={{ borderBottomWidth: 1, borderColor: 'gray', width: '90%', marginBottom: 10 }}>
        <Picker
          selectedValue={vehicleModel}
          style={{ width: '100%', height: 50 }}
          onValueChange={(itemValue, itemIndex) => setVehicleModel(itemValue)}
        >
          <Picker.Item label="Select Vehicle Model" value="" />
          {Array.from({ length: 35 }, (_, i) => 1990 + i).map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={{
          width: '90%',
          height: 50,
          borderBottomWidth: 1,
          borderColor: 'gray',
          marginBottom: 10,
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        placeholder="Vehicle Number Plate"
        value={carNumberPlate}
        onChangeText={setVehicleNumberPlate}
      />

      <View style={{ borderBottomWidth: 1, borderColor: 'gray', width: '90%', marginBottom: 10 }}>
        <Picker
          selectedValue={vehicleCC}
          style={{ width: '100%', height: 50 }}
          onValueChange={(itemValue, itemIndex) => setVehicleCC(itemValue)}
        >
          <Picker.Item label="Select Vehicle CC" value="" />
          <Picker.Item label="660 cc" value="660" />
          <Picker.Item label="800 cc" value="800" />
          <Picker.Item label="1000 cc" value="1000" />
          <Picker.Item label="1200 cc" value="1200" />
          <Picker.Item label="1500 cc" value="1500" />
          <Picker.Item label="1800 cc" value="1800" />
          <Picker.Item label="2000 cc" value="2000" />
          <Picker.Item label="2500 cc" value="2500" />
          <Picker.Item label="3000 cc" value="3000" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <View style={{ borderBottomWidth: 1, borderColor: 'gray', width: '90%', marginBottom: 10 }}>
        <Picker
          selectedValue={vehicleType}
          style={{ width: '100%', height: 50 }}
          onValueChange={(itemValue, itemIndex) => setVehicleType(itemValue)}
        >
          <Picker.Item label="Select Vehicle Type" value="" />
          <Picker.Item label="Car" value="Car" />
          <Picker.Item label="Carry" value="Carry" />
          <Picker.Item label="Van" value="Van" />
        </Picker>
      </View>

      <TouchableOpacity
        style={{
          marginBottom: 30,
          marginTop: 10,
        }}
        onPress={() => pickImage('vehicle')}
      >
        {vehiclePhoto ? (
          <Image
            source={{ uri: vehiclePhoto }}
            style={{
              width: 250,
              height: 170,
            }}
          />
        ) : (
          <Button title="Select Vehicle Photo" color="#022B42" onPress={() => pickImage('vehicle')} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#022B42',
          width: '90%',
          paddingVertical: 15,
          borderRadius: 25,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Vehicleinfo;
