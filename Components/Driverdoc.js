import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from '../src/env';  // Adjust the path as necessary

const FileUploadScreen = ({ route }) => {
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [cnicPhoto, setCnicPhoto] = useState(null);
  const navigation = useNavigation();

  const {
    firstName,
    lastName,
    gender,
    phonenumber,
    password,
    licenseNumber,
    identity,
  } = route.params;

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
    const response = await axios.post(`${API_BASE_URL}/api/registerDriver`, {
      identity,
      firstName,
      lastName,
      phoneNumber: phonenumber,
      password,
      gender,
      licenseNumber,
      driverPhoto,
      licensePhoto,
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Icon */}
      <Ionicons name="document-text-outline" size={100} color="#022B42" style={styles.logo} />

      <Text style={styles.headerText}>Upload Documents</Text>

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => pickImage('driver')}
      >
        {driverPhoto ? (
          <Ionicons name="document-outline" size={80} color="#022B42" />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="document-outline" size={80} color="#DDD" />
            <Text style={styles.placeholderText}>Select Driver Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => pickImage('license')}
      >
        {licensePhoto ? (
          <Ionicons name="document-outline" size={80} color="#022B42" />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="document-outline" size={80} color="#DDD" />
            <Text style={styles.placeholderText}>Select License Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => pickImage('cnic')}
      >
        {cnicPhoto ? (
          <Ionicons name="document-outline" size={80} color="#022B42" />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="document-outline" size={80} color="#DDD" />
            <Text style={styles.placeholderText}>Select CNIC Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={submitData} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#022B42',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderWidth: 2, // Border width for blue border
    borderColor: '#022B42', // Blue border color
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  placeholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#022B42',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FileUploadScreen;
