import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactScreen = ({ navigation }) => {
  const circleSize = 200;

  const [identity, setIdentity] = useState('');

  const handleDriverPress = () => {
    setIdentity('Driver');
  };

  const handlePassengerPress = () => {
    setIdentity('Passenger');
  };

  useEffect(() => {
    if (identity === 'Driver') {
      navigation.navigate('Driver', { Driver: identity });
    } else if (identity === 'Passenger') {
      navigation.navigate('PassengerRegNo', { Passenger: identity });
    }
  }, [identity, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      {/* Header */}
      {/* ... */}

      {/* Passenger button */}
      <TouchableOpacity
        onPress={handlePassengerPress}
        style={{
          backgroundColor: '#022B42',
          borderRadius: circleSize / 2,
          marginVertical: 100,
          width: circleSize,
          height: circleSize,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Passenger icon */}
        <Icon name="person" size={50} color="#FDD387" />
        <Text style={{ color: '#fff', marginTop: 8, fontSize: 16 }}>Passenger</Text>
      </TouchableOpacity>

      {/* Driver button */}
      <TouchableOpacity
        onPress={handleDriverPress}
        style={{
          backgroundColor: '#022B42',
          borderRadius: circleSize / 2,
          marginVertical: 20,
          width: circleSize,
          height: circleSize,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Driver icon */}
        <Icon name="person" size={50} color="#FDD387" />
        <Text style={{ color: '#fff', marginTop: 8, fontSize: 16 }}>Driver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactScreen;
