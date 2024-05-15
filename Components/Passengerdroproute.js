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
      selectedRoute, 
      user,
      pickupPoint, 
      dropOffPoint: dropOffPoint.realName || 'Unknown drop-off location',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> - Dropoff Points</Text>
      {selectedRoute.dropoffpoints ? (
        selectedRoute.dropoffpoints.map((dropOffPoint, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.button} 
            onPress={() => handleDropoffPointPress(dropOffPoint)}
          >
            <Text style={styles.buttonText}>
              {dropOffPoint.realName && dropOffPoint.address 
                ? `${dropOffPoint.realName} - ${dropOffPoint.address}` 
                : 'Unknown location'}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noPointsText}>No dropoff points available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '900',
    marginVertical: 20,
    color: '#022B42',
  },
  button: {
    backgroundColor: '#FDD387',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#022B42',
    textAlign: 'center',
  },
  noPointsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Passengerdroproute;
