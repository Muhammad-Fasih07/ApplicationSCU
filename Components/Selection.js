import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactScreen = ({ navigation, route }) => {
  const circleSize = 200;

  const identityTypePassenger = 'Passenger';
  const identityTypeDriver = 'Driver';

  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      {/* Header */}
      {/* ... */}

      {/* Passenger button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PassengerRegNo', { identityType: identityTypePassenger })}
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
        onPress={() => navigation.navigate('Driver', { identityType: identityTypeDriver })}
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