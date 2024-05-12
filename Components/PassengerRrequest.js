import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../src/env'; // Ensure this is correctly pointing to your environment settings

// Helper function to get shadow styles based on platform
const getShadowStyle = () => {
  if (Platform.OS === 'android') {
    return { elevation: 5 };
  } else if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    };
  } else {
    return {};
  }
};

const screen = Dimensions.get('window'); // Get device dimensions

const PassengerRequest = () => {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pickdroproute`);
        if (!response.ok) {
          throw new Error('Error fetching data. Please try again later.');
        }
        const data = await response.json();
        setRoutes(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Passengerpickroute', {
        selectedRoute: item,
        source: item.source,
        destination: item.destination
      })}
      style={styles.containerStyle}
    >
      <View style={styles.routeContainer}>
        <Icon name="radio-button-checked" size={20} color="blue" />
        <View style={styles.verticalLine} />
        <Icon name="radio-button-checked" size={20} color="red" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.boldTextStyle}>Source:</Text>
        <Text style={styles.textStyle}>{item.source || 'N/A'}</Text>
        <Text style={styles.boldTextStyle}>Pickup Time:</Text>
        <Text style={styles.textStyle}>{item.pickuptime || 'N/A'}</Text>
        <Text style={styles.boldTextStyle}>Destination:</Text>
        <Text style={styles.textStyle}>{item.destination || 'N/A'}</Text>
        <Text style={styles.boldTextStyle}>Dropoff Time:</Text>
        <Text style={styles.textStyle}>{item.dropofftime || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Routes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : routes.length > 0 ? (
        <FlatList
          data={routes}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderRouteItem}
        />
      ) : (
        <Text style={styles.infoText}>No routes available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#022B42',
    marginBottom: 20,
  },
  containerStyle: {
    ...getShadowStyle(),
    backgroundColor: 'rgba(253, 211, 135, 0.7)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    borderColor: 'rgba(2,43,66,0.8)',
    borderWidth: 3,
    flexDirection: 'row',
    width: screen.width * 0.9,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  boldTextStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  routeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  verticalLine: {
    width: 4,
    height: 205,
    backgroundColor: '#022B42',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PassengerRequest;
