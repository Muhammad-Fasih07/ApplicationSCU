import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../src/env';
import { Ionicons } from '@expo/vector-icons';

const RouteScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [pickupPoints, setPickupPoints] = useState([]);
  const [dropOffPoints, setDropOffPoints] = useState([]);
  const pickupSearchRef = useRef(null);
  const dropoffSearchRef = useRef(null);

  const handleAddLocation = (data, details, type) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: details.formatted_address,
      realName: details.name,
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
      navigation.navigate('Pick', { pickupPoints, dropOffPoints, user });
    } else {
      Alert.alert('Insufficient Locations', 'Please add at least one pickup and one drop-off location.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Plan Your Route</Text>
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
          textInput: styles.textInput,
          listView: styles.listView,
        }}
      />
      <FlatList
        data={pickupPoints}
        keyExtractor={(item, index) => `pickup-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationText}>
              {item.realName} - {item.address}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveLocation(index, 'pickup')}>
              <Ionicons name="trash-bin" size={20} color="red" />
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
          textInput: styles.textInput,
          listView: styles.listView,
        }}
      />
      <FlatList
        data={dropOffPoints}
        keyExtractor={(item, index) => `dropoff-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationText}>
              {item.realName} - {item.address}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveLocation(index, 'dropoff')}>
              <Ionicons name="trash-bin" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={navigateToPick}>
        <Text style={styles.buttonText}>Go to Pick Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#022B42',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#022B42',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  listView: {
    backgroundColor: '#FFF',
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginBottom: 5,
    borderRadius: 10,
  },
  locationText: {
    flex: 1,
    fontSize: 11,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#022B42',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RouteScreen;
