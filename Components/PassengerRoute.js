import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE_URL } from '../src/env';  // Adjust the path as necessary

const PassengerRoute = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [pickTime, setPickTime] = useState(new Date());
  const [dropTime, setDropTime] = useState(new Date());
  const [selectedPickTime, setSelectedPickTime] = useState('Pick Time');
  const [selectedDropTime, setSelectedDropTime] = useState('Drop Time');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPickTimePickerVisible, setPickTimePickerVisible] = useState(false);
  const [isDropTimePickerVisible, setDropTimePickerVisible] = useState(false);

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

  const handlePickTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || pickTime;
    setPickTime(currentTime);
    setSelectedPickTime(currentTime.toLocaleTimeString());
    setPickTimePickerVisible(false); // Hide the picker after selection
  };

  const handleDropTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || dropTime;
    setDropTime(currentTime);
    setSelectedDropTime(currentTime.toLocaleTimeString());
    setDropTimePickerVisible(false); // Hide the picker after selection
  };

  const showPicker = (pickerType) => {
    if (pickerType === 'pick') {
      setPickTimePickerVisible(true);
    } else if (pickerType === 'drop') {
      setDropTimePickerVisible(true);
    }
  };

  const handleSubmit = async () => {
    if (formSubmitted) {
      Alert.alert('Error', 'Form already submitted. Please try again.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/passengerroutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          picklocation: startLocation,
          droplocation: endLocation,
          picktime: pickTime.toLocaleTimeString(),
          droptime: dropTime.toLocaleTimeString(),
        }),
      });

      if (response.ok) {
        console.log('Route inserted successfully!');
        setFormSubmitted(true);
        Alert.alert('Success', 'Route added successfully!');
      } else {
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
      <MapView style={{ flex: 2 }} initialRegion={currentLocation} showsUserLocation={true} followsUserLocation={true}>
        {currentLocation && <Marker coordinate={currentLocation} pinColor="blue" />}
      </MapView>

      <View style={{ flex: 1, backgroundColor: '#FDD387', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 16, paddingTop: 10 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={{ borderBottomWidth: 1, paddingBottom: 10, backgroundColor: '#022B42' }}>
              <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white', paddingHorizontal: 16, paddingVertical: 6, paddingLeft: 50 }}>
                Passenger Route Request
              </Text>
            </View>
            <View style={{ alignItems: 'center', padding: 15 }}>
              {/* Start Location and Pick Time */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TextInput style={{ height: 40, borderColor: '#022B42', borderWidth: 2, marginBottom: 10, width: '50%', borderRadius: 10, paddingHorizontal: 10 }}
                  placeholder="Start Location"
                  value={startLocation}
                  onChangeText={(text) => setStartLocation(text)}
                />
                <TouchableOpacity style={{ backgroundColor: '#022B42', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}
                  onPress={() => showPicker('pick')}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{selectedPickTime}</Text>
                </TouchableOpacity>
              </View>

              {/* End Location and Drop Time */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TextInput style={{ height: 40, borderColor: '#022B42', borderWidth: 2, marginBottom: 10, width: '50%', borderRadius: 10, paddingHorizontal: 10 }}
                  placeholder="End Location"
                  value={endLocation}
                  onChangeText={(text) => setEndLocation(text)}
                />
                <TouchableOpacity style={{ backgroundColor: '#022B42', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}
                  onPress={() => showPicker('drop')}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{selectedDropTime}</Text>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={{ backgroundColor: '#022B42', padding: 15, borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: '70%', marginTop: 10 }}
                onPress={handleSubmit}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Submit Route</Text>
              </TouchableOpacity>

              {formSubmitted && <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Route submitted successfully!</Text>}
            </View>

            {/* DateTimePicker conditional rendering based on Platform and visibility */}
            {Platform.OS === 'android' && (
              <>
                {isPickTimePickerVisible && (
                  <DateTimePicker
                    testID="pickTimePicker"
                    value={pickTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handlePickTimeChange}
                  />
                )}
                {isDropTimePickerVisible && (
                  <DateTimePicker
                    testID="dropTimePicker"
                    value={dropTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleDropTimeChange}
                  />
                )}
              </>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default PassengerRoute;
