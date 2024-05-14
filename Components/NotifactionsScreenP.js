import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../src/env';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationsScreenP = ({ route }) => {
  const { user } = route.params;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/pending`, {
        params: { pid: user.id }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationDetails}>
        <Text style={styles.notificationText}><Icon name="place" size={20} /> Pickup Point: {item.pickupPoint}</Text>
        <Text style={styles.notificationText}><Icon name="flag" size={20} /> Drop-off Point: {item.dropOffPoint}</Text>
        <Text style={styles.notificationText}><Icon name="info" size={20} /> Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Notifications</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022B42',
  },
  header: {
    padding: 20,
    backgroundColor: '#022B42',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FDD387',
  },
  headerText: {
    color: '#FDD387',
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FDD387',
  },
  notificationDetails: {
    marginBottom: 15,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default NotificationsScreenP;
