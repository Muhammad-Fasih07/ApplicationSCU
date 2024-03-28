import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';

const DriverRoute = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [pickTime, setPickTime] = useState(new Date());
  const [dropTime, setDropTime] = useState(new Date());
  const [passengerCapacity, setPassengerCapacity] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleSubmit = async () => {
    if (formSubmitted) {
      // Already submitted, show an alert
      Alert.alert('Error', 'Form already submitted. Please try again.');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.19:8082/api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          picklocation: startLocation,
          droplocation: endLocation,
          picktime: pickTime.toLocaleTimeString(),
          droptime: dropTime.toLocaleTimeString(),
          passengercapacity: parseInt(passengerCapacity, 10),
        }),
      });

      if (response.ok) {
        // Route inserted successfully
        console.log('Route inserted successfully!');
        setFormSubmitted(true);
        Alert.alert('Success', 'Route added successfully!');
      } else {
        // Handle error
        console.error('Error inserting route');
        Alert.alert('Error', 'Error adding route. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error adding route. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Map Section */}
      <MapView style={{ flex: 2 }} initialRegion={currentLocation} showsUserLocation={true} followsUserLocation={true}>
        {currentLocation && <Marker coordinate={currentLocation} pinColor="blue" />}
      </MapView>

      {/* Form Section */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#FDD387',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 16,
          paddingTop: 10,
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={{ borderBottomWidth: 1, paddingBottom: 10, backgroundColor: '#022B42' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  paddingLeft: 80,
                }}
              >
                Driver Route Details
              </Text>
            </View>

            <View style={{ alignItems: 'center', padding: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TextInput
                  style={{
                    flex: 1,
                    height: 40,
                    borderColor: '#022B42',
                    borderWidth: 2,
                    marginRight: 5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                  placeholder="Start Location"
                  value={startLocation}
                  onChangeText={(text) => setStartLocation(text)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#022B42',
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => console.log('Show Pick Time Picker')} // Placeholder action, change as needed
                >
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Pick Time</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TextInput
                  style={{
                    flex: 1,
                    height: 40,
                    borderColor: '#022B42',
                    borderWidth: 2,
                    marginRight: 5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                  placeholder="End Location"
                  value={endLocation}
                  onChangeText={(text) => setEndLocation(text)}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#022B42',
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => console.log('Show Drop Time Picker')} // Placeholder action, change as needed
                >
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Drop Time</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={{
                  height: 40,
                  borderColor: '#022B42',
                  borderWidth: 2,
                  marginBottom: 10,
                  width: 250,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  marginRight: 73,
                }}
                placeholder="Passenger Capacity"
                value={passengerCapacity}
                onChangeText={(text) => setPassengerCapacity(text)}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#022B42',
                  padding: 15,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 320,
                }}
                onPress={handleSubmit}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Submit Route</Text>
              </TouchableOpacity>
              {formSubmitted && (
                <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
                  
                </Text>
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default DriverRoute;
