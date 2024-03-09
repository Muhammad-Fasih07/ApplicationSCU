import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';

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
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#333333',
        }}
      >
        Passenger Routes
      </Text>

      {routes.length > 0 ? (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'column',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
                paddingVertical: 15,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    marginRight: 10,
                    fontSize: 16,
                    color: '#555555',
                  }}
                >
                  Pickup
                </Text>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    color: '#333333',
                  }}
                >
                  {item.picklocation}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    marginRight: 10,
                    fontSize: 16,
                    color: '#555555',
                  }}
                >
                  Drop-off
                </Text>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    color: '#333333',
                  }}
                >
                  {item.droplocation}
                </Text>
              </View>
              {/* Repeat the pattern for other cellContainers */}
            </View>
          )}
        />
      ) : (
        <Text
          style={{
            fontSize: 18,
            color: '#555555',
            textAlign: 'center',
          }}
        >
          No routes available
        </Text>
      )}
    </View>
  );
};

export default PassengerRoute;
