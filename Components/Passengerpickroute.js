import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Passengerpickroute = ({ route }) => {
  const { user } = route.params;
  const { selectedRoute } = route.params;
  const navigation = useNavigation();

  const handlePickupPointPress = (pickupPoint) => {
    console.log('Pickup point selected:', pickupPoint.realName);
    // Navigate with the pickup point's real name as a parameter
    navigation.navigate('Passengerdroproute', {
      selectedRoute,user,
      pickupPoint: pickupPoint.realName || 'Unknown location'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedRoute.name} - Pickup Points</Text>
      {selectedRoute.pickuppoints ? (
        selectedRoute.pickuppoints.map((pickupPoint, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handlePickupPointPress(pickupPoint)}>
            {/* Combine realName and address for display */}
            <Text style={styles.buttonText}>
              {pickupPoint.realName ? `${pickupPoint.realName} - ${pickupPoint.address}` : 'Unknown location'}
            </Text>
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
