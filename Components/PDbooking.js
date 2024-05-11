import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const PDbooking = ({ route }) => {
  const { selectedRoute } = route.params;

  // Check if the routeCoordinates are valid
  const validCoordinates = selectedRoute.routeCoordinates && selectedRoute.routeCoordinates.length > 0;

  return (
    <ScrollView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedRoute.source.latitude,
          longitude: selectedRoute.source.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {validCoordinates && (
          <Polyline
            coordinates={selectedRoute.routeCoordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />
        )}
      </MapView>
      <View style={styles.details}>
        <Text style={styles.headerText}>Route Details</Text>
        <Text>Pickup Point: {selectedRoute.pickup}</Text>
        <Text>Dropoff Point: {selectedRoute.dropoff}</Text>
        <Text>Pickup Time: {selectedRoute.pickuptime}</Text>
        <Text>Dropoff Time: {selectedRoute.dropofftime}</Text>
        <Text>Fare: {selectedRoute.fare}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 300,
  },
  details: {
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PDbooking;
