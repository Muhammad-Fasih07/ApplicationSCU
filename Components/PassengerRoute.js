import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const PassengerRoute = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://172.17.243.179:8082/api/routes');
      
      if (!response.ok) {
        console.error('Error fetching data. Status:', response.status);
        return;
      }
      
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Passenger Routes</Text>

      {routes.length > 0 ? (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.cellContainer}>
                <Text style={styles.cellLabel}>Pickup</Text>
                <Text style={styles.cell}>{item.picklocation}</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.cellLabel}>Drop-off</Text>
                <Text style={styles.cell}>{item.droplocation}</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.cellLabel}>Pickup Time</Text>
                <Text style={styles.cell}>{item.picktime}</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.cellLabel}>Drop-off Time</Text>
                <Text style={styles.cell}>{item.droptime}</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.cellLabel}>Capacity</Text>
                <Text style={styles.cell}>{item.passengercapacity}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noRoutesText}>No routes available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  row: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 15,
  },
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cellLabel: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    color: '#555555',
  },
  cell: {
    flex: 2,
    fontSize: 16,
    color: '#333333',
  },
  noRoutesText: {
    fontSize: 18,
    color: '#555555',
    textAlign: 'center',
  },
});

export default PassengerRoute;
