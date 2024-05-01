import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Vehicleinfo = ({ navigation, route }) => {
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

      <View style={{ borderBottomWidth: 1, borderColor: 'gray', width: '90%', marginBottom: 20 }}>
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

      <View style={{ borderBottomWidth: 1, borderColor: 'gray', width: '90%', marginBottom: 20 }}>
        <Picker
          selectedValue={vehicleModel}
          style={{ width: '100%', height: 50 }}
          onValueChange={(itemValue, itemIndex) => setVehicleModel(itemValue)}
        >
          <Picker.Item label="Select Vehicle Model" value="" />
          {Array.from({ length: 35 }, (_, i) => 1990 + i).map(year => (
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
          marginBottom: 20,
          paddingHorizontal: 10,
          fontSize: 18
        }}
        placeholder="License Number"
        value={licenseNumber}
        onChangeText={setLicenseNumber}
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
        placeholder="Vehicle Number Plate"
        value={carNumberPlate}
        onChangeText={setVehicleNumberPlate}
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

export default Vehicleinfo;
