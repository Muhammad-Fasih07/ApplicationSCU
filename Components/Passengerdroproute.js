import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Passengerdroproute = ({ route }) => {
  const { user } = route.params;
  const { selectedRoute, pickupPoint } = route.params;
  const navigation = useNavigation();

  const handleDropoffPointPress = (dropOffPoint) => {
    console.log('Drop-off point selected:', dropOffPoint.realName || 'Unknown drop-off location');
    navigation.navigate('PDbooking', {
      selectedRoute, user,
      pickupPoint, 
      dropOffPoint: dropOffPoint.realName || 'Unknown drop-off location'
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedRoute.name} - Dropoff Points</Text>
      {selectedRoute.dropoffpoints ? (
        selectedRoute.dropoffpoints.map((dropOffPoint, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handleDropoffPointPress(dropOffPoint)}>
            {/* Combine realName and address for display */}
            <Text style={styles.buttonText}>
              {dropOffPoint.realName && dropOffPoint.address 
                ? `${dropOffPoint.realName} - ${dropOffPoint.address}`
                : 'Unknown location'}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No dropoff points available</Text>
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

export default Passengerdroproute;
