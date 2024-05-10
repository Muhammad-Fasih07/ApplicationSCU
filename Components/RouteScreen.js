import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, TouchableOpacity, TouchableWithoutFeedback, Animated, TouchableHighlight } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../src/env';

const RouteScreen = () => {
  const [pickupPoints, setPickupPoints] = useState([]);
  const [dropOffPoints, setDropOffPoints] = useState([]);
  const pickupSearchRef = useRef(null);
  const dropoffSearchRef = useRef(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleAddLocation = (data, details, type) => {
    const location = details.formatted_address;
    const points = type === 'pickup' ? pickupPoints : dropOffPoints;
    const setPoints = type === 'pickup' ? setPickupPoints : setDropOffPoints;

    if (points.length < 7) {
      setPoints(prev => [...prev, { location, isDeleting: false }]);
      if (type === 'pickup') {
        pickupSearchRef.current?.setAddressText('');
      } else {
        dropoffSearchRef.current?.setAddressText('');
      }
    } else {
      Alert.alert("Limit Reached", `You can only add up to 7 ${type === 'pickup' ? 'pickup' : 'dropoff'} locations.`);
    }
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const toggleDeleteOption = (index, type) => {
    const points = type === 'pickup' ? pickupPoints : dropOffPoints;
    const setPoints = type === 'pickup' ? setPickupPoints : setDropOffPoints;
    setPoints(prev => prev.map((point, i) => i === index ? { ...point, isDeleting: !point.isDeleting } : point));
  };

  const deleteLocation = (index, type) => {
    const points = type === 'pickup' ? pickupPoints : dropOffPoints;
    const setPoints = type === 'pickup' ? setPickupPoints : setDropOffPoints;
    setPoints(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationInputs}>
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
            predefinedPlacesDescription: styles.predefinedPlacesDescription
          }}
          onFail={error => console.error(error)}
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
            predefinedPlacesDescription: styles.predefinedPlacesDescription
          }}
          onFail={error => console.error(error)}
        />
      </View>
      <View style={styles.locationLists}>
        <ScrollView>
          {pickupPoints.map((point, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => shakeAnimation()}
              onLongPress={() => toggleDeleteOption(index, 'pickup')}>
              <Animated.View style={[styles.locationItem, { transform: [{ translateX: shakeAnim }] }]}>
                <Text style={styles.locationText}>Pickup {index + 1}: {point.location}</Text>
                {point.isDeleting && (
                  <TouchableOpacity onPress={() => deleteLocation(index, 'pickup')} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        <ScrollView>
          {dropOffPoints.map((point, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => shakeAnimation()}
              onLongPress={() => toggleDeleteOption(index, 'dropoff')}>
              <Animated.View style={[styles.locationItem, { transform: [{ translateX: shakeAnim }] }]}>
                <Text style={styles.locationText}>Dropoff {index + 1}: {point.location}</Text>
                {point.isDeleting && (
                  <TouchableOpacity onPress={() => deleteLocation(index, 'dropoff')} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" color='rgba(2,43,66,1)' onPress={() => console.log("Submit locations")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2,43,66,0.7)',
    padding: 20,
  },
  locationInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationLists: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'nowrap',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(253, 126, 20, 0.7)',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#495057',
    marginRight: 6,
  },
  deleteButton: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(253, 126, 20, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
  },
  textInput: {
    fontSize: 14,
    padding: 12,
    borderWidth: 2.5,
    borderColor: 'rgba(253, 126, 20, 0.7)',
    borderRadius: 8,
    color: '#495057',
    backgroundColor: '#fff',
    flex: 1,
    marginRight: 10,
  },
  predefinedPlacesDescription: {
    color: 'rgba(2,43,66,0.7)',
  },
  buttonContainer: {
    marginTop: 10,
    paddingHorizontal: 50, // Adjust as needed
  }
  
});

export default RouteScreen;
