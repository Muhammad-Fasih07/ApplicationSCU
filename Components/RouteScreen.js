import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../src/env';

const RouteScreen = ({ navigation }) => {
  const [pickupPoints, setPickupPoints] = useState([]);
  const [dropOffPoints, setDropOffPoints] = useState([]);
  const pickupSearchRef = useRef(null);
  const dropoffSearchRef = useRef(null);

  const handleAddLocation = (data, details, type) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: details.formatted_address,
      realName: details.name, // Store the real name of the location
    };
    
    const points = type === 'pickup' ? pickupPoints : dropOffPoints;
    const setPoints = type === 'pickup' ? setPickupPoints : setDropOffPoints;

    if (points.length < 4) {
      setPoints((prev) => [...prev, location]);
      type === 'pickup' ? pickupSearchRef.current?.setAddressText('') : dropoffSearchRef.current?.setAddressText('');
    } else {
      Alert.alert('Limit Reached', `You can only add up to 4 ${type} locations.`);
    }
  };

  const handleRemoveLocation = (index, type) => {
    const setPoints = type === 'pickup' ? setPickupPoints : setDropOffPoints;
    setPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const navigateToPick = () => {
    if (pickupPoints.length > 0 && dropOffPoints.length > 0) {
      navigation.navigate('Pick', { pickupPoints, dropOffPoints });
    } else {
      Alert.alert('Insufficient Locations', 'Please add at least one pickup and one drop-off location.');
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={pickupSearchRef}
        placeholder="Add Pickup Points"
        fetchDetails
        onPress={(data, details = null) => handleAddLocation(data, details, 'pickup')}
        query={{
          key: API_KEY,
          language: 'en',
        }}
        styles={{
          textInput: styles.textInput
        }}
      />
      <FlatList
        data={pickupPoints}
        keyExtractor={(item, index) => `pickup-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.locationItem}>
            <Text style={[styles.locationText, { color: 'black' }]}>
              {item.realName} - {item.address}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveLocation(index, 'pickup')}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <GooglePlacesAutocomplete
        ref={dropoffSearchRef}
        placeholder="Add Dropoff Points"
        fetchDetails
        onPress={(data, details = null) => handleAddLocation(data, details, 'dropoff')}
        query={{
          key: API_KEY,
          language: 'en',
        }}
        styles={{
          textInput: styles.textInput
        }}
      />
      <FlatList
        data={dropOffPoints}
        keyExtractor={(item, index) => `dropoff-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.locationItem}>
            <Text style={[styles.locationText, { color: 'black' }]}>
              {item.realName} - {item.address}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveLocation(index, 'dropoff')}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Go to Pick Screen" onPress={navigateToPick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(2,43,66,0.7)',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
  },
  locationText: {
    flex: 1,
    fontSize: 15,
  },
  removeText: {
    color: 'red',
  },
  buttonContainer: {
    backgroundColor: 'rgba(2,43,66,1)',
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
  },
});

export default RouteScreen;
