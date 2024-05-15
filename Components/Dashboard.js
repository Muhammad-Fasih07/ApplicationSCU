import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar, Modal,
  SafeAreaView, Image, Linking, FlatList,
  Alert, StyleSheet, BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_BASE_URL, API_KEY } from '../src/env';

const Dashboard = ({ route, navigation }) => {
  const { user } = route.params;
  const circleSize = 120;
  const animatedImageRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(false);
  const [homeAddress, setHomeAddress] = useState('');
  const [instituteAddress, setInstituteAddress] = useState('');
  const [homeAddressPlaceholder, setHomeAddressPlaceholder] = useState('My current location');
  const [instituteAddressPlaceholder, setInstituteAddressPlaceholder] = useState('Where to?');
  const [isHomeFocused, setIsHomeFocused] = useState(false);
  const [isInstituteFocused, setIsInstituteFocused] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/pending`);
      setNotifications(response.data);
      const unread = response.data.some(notification => notification.status === 'unread');
      setUnreadNotifications(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const animateImage = () => {
    if (animatedImageRef.current) {
      animatedImageRef.current.shake(800);
    }
  };

  const handleEmergencyCall = number => {
    Linking.openURL(`tel:${number}`);
    setEmergencyModalVisible(false);
  };

  const navigateToPassengerBooking = () => {
    console.log('Navigating to PassengerBooking with user:', user);
    navigation.navigate('PassengerBooking', { user: user });
  };

  const handleAddHome = () => {
    if (homeAddress) {
      setHomeAddressPlaceholder(homeAddress);
      Alert.alert('Home Address', homeAddress);
    }
  };

  const handleAddInstitute = () => {
    if (instituteAddress) {
      setInstituteAddressPlaceholder(instituteAddress);
      Alert.alert('Institute Address', instituteAddress);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {drawerOpen && <TouchableOpacity activeOpacity={1} style={styles.drawerOverlay} onPress={toggleDrawer} />}
      <TouchableOpacity onPress={() => setEmergencyModalVisible(true)} style={styles.emergencyButton}>
        <Icon name="warning" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={emergencyModalVisible}
        onRequestClose={() => setEmergencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Emergency Call</Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleEmergencyCall('1122')}>
              <Text style={styles.modalOptionText}>Call Ambulance (1122)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleEmergencyCall('15')}>
              <Text style={styles.modalOptionText}>Call Police (15)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={drawerOpen} onRequestClose={toggleDrawer}>
        <View style={styles.drawerContainer}>
          <TouchableOpacity style={styles.drawerOverlay} onPress={toggleDrawer} />
          <View style={styles.drawerContent}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.drawerCloseButton}>
              <Icon name="menu" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditprofileP', { user })}>
              <View style={styles.drawerUserInfo}>
                <Image
                  source={user.photo ? { uri: user.photo } : require('../assets/userlogo.png')}
                  style={styles.drawerUserImage}
                />
                <Text style={styles.drawerUserName}>{user.name}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToPassengerBooking}>
              <Text style={styles.drawerItemText}>Your Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.drawerItemText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.drawerItemText}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Contactus', { user })}>
              <Text style={styles.drawerItemText}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreenP', { user })}>
              <Text style={styles.drawerItemText}>
                Notification
                {unreadNotifications && <Icon name="circle" size={10} color="red" style={styles.unreadIndicator} />}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Privacycenter')}>
              <Text style={styles.drawerItemText}>Privacy Center</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Text style={styles.drawerItemTextLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={[]}
        renderItem={() => null}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={toggleDrawer}>
                <Icon name="menu" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Hey, {user.name} 👋</Text>
              <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen', { user })}>
                <Icon name="notifications" size={30} color={unreadNotifications ? 'red' : '#fff'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={animateImage}>
              <Animatable.View ref={animatedImageRef}>
                <Image source={require('../assets/bus.jpg')} style={styles.mainImage} />
              </Animatable.View>
            </TouchableOpacity>
            <View style={styles.quickActions}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PassengerRoute', { user })}
                style={[styles.quickActionButton, { width: circleSize, height: circleSize }]}
              >
                <Icon name="directions-bus" size={30} color="#FDD387" />
                <Text style={styles.quickActionText}>Pick & Drop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Carpooling')}
                style={[styles.quickActionButton, { width: circleSize, height: circleSize }]}
              >
                <Icon name="directions-car" size={30} color="#FDD387" />
                <Text style={styles.quickActionText}>Carpooling</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputSection}>
              <View style={styles.inputActions}>
                <GooglePlacesAutocomplete
                  placeholder={homeAddressPlaceholder}
                  onPress={(data, details = null) => {
                    setHomeAddress(data.description);
                  }}
                  query={{
                    key: API_KEY,
                    language: 'en',
                  }}
                  styles={{
                    textInput: [styles.input, { marginRight: 10 }],
                    listView: isHomeFocused ? styles.listViewFocused : {},
                  }}
                  onFocus={() => setIsHomeFocused(true)}
                  onBlur={() => setIsHomeFocused(false)}
                />
                <GooglePlacesAutocomplete
                  placeholder={instituteAddressPlaceholder}
                  onPress={(data, details = null) => {
                    setInstituteAddress(data.description);
                  }}
                  query={{
                    key: API_KEY,
                    language: 'en',
                  }}
                  styles={{
                    textInput: styles.input,
                    listView: isInstituteFocused ? styles.listViewFocused : {},
                  }}
                  onFocus={() => setIsInstituteFocused(true)}
                  onBlur={() => setIsInstituteFocused(false)}
                />
              </View>
              <TouchableOpacity style={styles.addButton} onPress={handleAddHome}>
                <Icon name="add" size={20} color="#000" />
                <Text style={styles.addButtonText}>Add Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleAddInstitute}>
                <Icon name="add" size={20} color="#000" />
                <Text style={styles.addButtonText}>Add Institute</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.routeInfo}>
              <Text style={styles.routeInfoText}>Every available route in Islamabad</Text>
              <TouchableOpacity onPress={() => navigation.navigate('PassengerRrequest', { user })} style={styles.viewAllButton}>
                <Text style={styles.viewAllButtonText}>VIEW ALL</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.chatIconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { user, userType: 'passenger' })}>
                <Ionicons name="chatbubble-ellipses" size={30} color="#fff" />
              </TouchableOpacity>
            </View> */}
          </>
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
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  emergencyButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'red',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    marginBottom: 10,
  },
  modalOptionText: {
    color: 'blue',
    fontSize: 16,
  },
  drawerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  drawerContent: {
    width: 250,
    backgroundColor: '#FDD387',
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  drawerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  drawerUserImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  drawerUserName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  drawerItemText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    marginTop: 15,
    fontWeight: 'bold',
  },
  drawerItemTextLogout: {
    fontSize: 16,
    marginBottom: 10,
    color: 'red',
    marginTop: 15,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgb(94, 147, 177)', // Secondary color
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#022B42',
  },
  mainImage: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    borderRadius: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  quickActionButton: {
    backgroundColor: 'rgb(94, 147, 177)', // Secondary color
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
  quickActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputSection: {
    padding: 20,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    borderColor: '#FDD387',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
    color: '#022B42',
  },
  listViewFocused: {
    width: '150%', // Increase the width of the list when focused
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    marginLeft: 5,
    color: '#FFF',
  },
  routeInfo: {
    padding: 20,
    alignItems: 'center',
  },
  routeInfoText: {
    fontSize: 16,
    color: '#FFF',
  },
  viewAllButton: {
    marginTop: 10,
  },
  viewAllButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(94, 147, 177)', // Secondary color
  },
  unreadIndicator: {
    marginLeft: 5,
  },
  chatIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgb(94, 147, 177)',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Dashboard;
