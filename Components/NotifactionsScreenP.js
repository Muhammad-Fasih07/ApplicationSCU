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
        <View style={styles.notificationRow}>
          <Icon name="place" size={24} style={styles.icon} />
          <Text style={styles.notificationText}>Pickup Point: {item.pickupPoint}</Text>
        </View>
        <View style={styles.notificationRow}>
          <Icon name="flag" size={24} style={styles.icon} />
          <Text style={styles.notificationText}>Drop-off Point: {item.dropOffPoint}</Text>
        </View>
        <View style={styles.notificationRow}>
          <Icon name="info" size={24} style={styles.icon} />
          <Text style={styles.notificationText}>Status: {item.status}</Text>
        </View>
        <View style={styles.notificationRow}>
          <Icon name="person" size={24} style={styles.icon} />
          <Text style={styles.notificationText}>Driver Name: {item.dname}</Text>
        </View>
        <View style={styles.notificationRow}>
          <Icon name="phone" size={24} style={styles.icon} />
          <Text style={styles.notificationText}>Cell No.: {item.phonenumberd}</Text>
        </View>
        <View style={styles.notificationRow}>
          <Icon name="directions-car" size={24} style={styles.icon} />
          <Text style={styles.notificationText}>Number Plate: {item.vehicle_number_plate}</Text>
        </View>
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
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    color: '#022B42',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});

export default NotificationsScreenP;
