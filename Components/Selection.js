import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#022B42" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Identity</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={handlePassengerPress} style={styles.button}>
          <Icon name="person" size={50} color="#FDD387" />
          <Text style={styles.buttonText}>Passenger</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDriverPress} style={styles.button}>
          <Icon name="person" size={50} color="#FDD387" />
          <Text style={styles.buttonText}>Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(94, 147, 177)', // Secondary color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#022B42',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { height: 2 },
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
});

export default ContactScreen;
