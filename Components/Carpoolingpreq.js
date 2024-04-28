import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { API_BASE_URL } from '../src/env';  // Adjust the path as necessary
const PassengerRrequest = () => {
  const [carpoolingp, setcarpoolingp] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carpoolingp`);

      if (!response.ok) {
        console.error('Error fetching data. Status:', response.status);
        return;
      }

      const data = await response.json();
      setcarpoolingp(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const containerStyle = {
    flexDirection: 'column',
    borderBottomWidth: 10,
    borderTopWidth: 6,
    borderColor: '#022B42',
    backgroundColor: '#FDD387',
    borderRadius: 10,
    padding: 10,
    width:'90%',
    marginBottom: 15,
    alignSelf: 'center',
    ...getShadowStyle(), // Apply shadow styles
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#022B42' }}>
          Passenger Carpooling Request
        </Text>
      </View>
      {carpoolingp.length > 0 ? (
        <FlatList
          data={carpoolingp}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // Handle button press here, e.g., navigate to details screen
                console.log('Button pressed for route:', item.id);
              }}
              style={containerStyle}
            >
              
              <Text style={{ fontSize: 16, color: '#555555', marginBottom: 10 }}>
                Pickup: {item.pickLocation}
              </Text>
              <Text style={{ fontSize: 16, color: '#555555', marginBottom: 10 }}>
                Drop-off: {item.dropLocation}
              </Text>
              <Text style={{ fontSize: 16, color: '#555555', marginBottom: 10 }}>
                Pick Time: {item.pickTime}
              </Text>
              <Text style={{ fontSize: 16, color: '#555555', marginBottom: 10 }}>
                Drop Time: {item.dropTime}
              </Text>
              <Text style={{ fontSize: 16, color: '#555555', marginBottom: 10 }}>
                Type: {item.type}
              </Text>
              <Text style={{ fontSize: 16, color: '#555555', marginBottom: 10 }}>
                MaleQuantity: {item.maleQuantity}
              </Text>
              <Text style={{ fontSize: 16, color: '#555555', marginBottom: 10 }}>
                FemaleQuantity: {item.femaleQuantity}
              </Text>
              
              
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ fontSize: 18, color: '#555555', textAlign: 'center' }}>
          No routes available
        </Text>
      )}
    </View>
  );
};

export default PassengerRrequest;

// Helper function to get shadow styles based on platform
const getShadowStyle = () => {
  if (Platform.OS === 'android') {
    return { elevation: 5 };
  } else if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
    };
  } else {
    return {};
  }
};
