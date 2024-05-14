import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const Register = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  // Extracting values from route.params if available, providing default values
  const { vehicleType = '', phonenumber = '', password = '', identity = '' } = route.params || {};

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Icon Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#022B42" />
      </View>

      <Text style={styles.subHeaderText}>Register Details</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={setLastName}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Custom" value="custom" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="License Number"
          placeholderTextColor="#888"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#022B42',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#022B42',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: '#022B42',
    elevation: 2,
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#022B42',
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#022B42',
  },
  submitButton: {
    backgroundColor: '#022B42',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Register;
