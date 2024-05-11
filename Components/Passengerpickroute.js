import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Passengerpickroute = ({ route }) => {
  const { selectedRoute } = route.params;
  const navigation = useNavigation();

  const handlePickupPointPress = (address) => {
    console.log('Pickup point selected:', address);
    navigation.navigate('Passengerdroproute', { selectedRoute });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedRoute.name} - Pickup Points</Text>
      {selectedRoute.pickuppoints ? (
        selectedRoute.pickuppoints.map((address, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handlePickupPointPress(address)}>
            <Text style={styles.buttonText}>{address}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No pickup points available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Passengerpickroute;
