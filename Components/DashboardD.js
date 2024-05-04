import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  SafeAreaView,
  TextInput,
  Image,
  Linking,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const DashboardD = ({ route, navigation }) => {
  // Destructuring user from route.params
  const { user } = route.params;
  const circleSize = 120;
  const animatedImageRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [showDriverRrequest, setShowDriverRrequest] = useState(false);

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to animate the image
  const animateImage = () => {
    if (animatedImageRef.current) {
      animatedImageRef.current.shake(800);
    }
  };

  // Function to handle emergency call
  const handleEmergencyCall = (number) => {
    Linking.openURL(`tel:${number}`);
    setEmergencyModalVisible(false);
  };

  // Dummy data for FlatList (replace with your actual data)
  const data = [];

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View>
      {/* Render your item content here */}
      <Text>{item.text}</Text>
    </View>
  );
  const handlePickAndDropRequest = () => {
    // Implement what happens when the Pick and Drop Request button is pressed
    navigation.navigate('DriverRrequest');
  };

  // Function to handle Carpooling Request
  const handleCarpoolingRequest = () => {
    // Implement what happens when the Carpooling Request button is pressed
    navigation.navigate('Carpoolingpreq');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      {/* Overlay for Drawer */}
      {drawerOpen && (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={toggleDrawer}
        />
      )}

      {/* Emergency Button */}
      <TouchableOpacity
        onPress={() => setEmergencyModalVisible(true)}
        style={{
          position: 'absolute',
          top: 15,
          left: 325,
          zIndex: 10,
          backgroundColor: 'red',
          borderRadius: 25,
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="warning" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Emergency Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={emergencyModalVisible}
        onRequestClose={() => setEmergencyModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Emergency Call</Text>
            <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => handleEmergencyCall('1122')}>
              <Text style={{ color: 'blue', fontSize: 16 }}>Call Ambulance (1122)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEmergencyCall('15')}>
              <Text style={{ color: 'blue', fontSize: 16 }}>Call Police (15)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Drawer Modal */}
      <Modal animationType="slide" transparent={true} visible={drawerOpen} onRequestClose={toggleDrawer}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* Drawer Content */}
          <View
            style={{
              width: 250,
              backgroundColor: '#FDD387',
              height: '100%',
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
              paddingTop: 20,
              right: '35%',
              paddingBottom: 50,
            }}
          >
            <TouchableOpacity onPress={toggleDrawer}>
              <Icon name="close" size={30} />
            </TouchableOpacity>
            {/* User Information */}
            <TouchableOpacity onPress={() => navigation.navigate('Editprofile', { user: user })}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 30, left: 30 }}>
                <Image
                  source={user.driverphoto ? { uri: user.driverphoto } : require('../assets/userlogo.png')}
                  style={{ width: 100, height: 100, borderRadius: 345, marginRight: 20 }}
                />
                <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>{user.name}</Text>
              </View>
            </TouchableOpacity>

            {/* Drawer Items */}

            <TouchableOpacity>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: '#333', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Your Trip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: '#333', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Wallet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: '#333', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Payment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ContactusD',{ user: user })}>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: '#333', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Contact Us
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: '#333', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Setting
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Vehicleinfo', { user: user })}>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: '#333', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Vehicle Verfication
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Privacycenter')}>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: '#333', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Privacy Center
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Text
                style={{ fontSize: 16, marginBottom: 10, color: 'red', marginTop: 15, fontWeight: 'bold', left: 40 }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main FlatList (replacing ScrollView) */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: '#F5F5DC' }}
        ListHeaderComponent={() => (
          <>
            {/* Header Section */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
              }}
            >
              <TouchableOpacity onPress={toggleDrawer}>
                <Icon name="menu" size={30} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                }}
              >
                Hey, {user.name} 👋
              </Text>
              <View style={{ width: 30 }} />
            </View>

            {/* Main Content Section */}
            <TouchableOpacity onPress={animateImage}>
              <Animatable.View ref={animatedImageRef}>
                <Image
                  source={require('../assets/bus.jpg')}
                  style={{
                    width: '100%',
                    height: 150,
                    marginBottom: 20,
                    borderRadius: 20,
                    backgroundColor: 'rgb(24,61,61)',
                  }}
                />
              </Animatable.View>
            </TouchableOpacity>

            {/* Quick Actions */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('DriverRoute')}
                style={{
                  backgroundColor: '#022B42',
                  borderRadius: circleSize / 2,
                  width: circleSize,
                  height: circleSize,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="directions-bus" size={30} color="#FDD387" />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  Pick & Drop
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('CarpoolingD')}
                style={{
                  backgroundColor: '#022B42',
                  borderRadius: circleSize / 2,
                  width: circleSize,
                  height: circleSize,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="directions-car" size={30} color="#FDD387" />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  Carpooling
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Section */}
            <View style={{ padding: 20 }}>
              <Text></Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <TouchableOpacity
                  onPress={handlePickAndDropRequest}
                  style={{
                    width: '49%',
                    backgroundColor: '#022B42',
                    padding: 11,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>P&D Request</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCarpoolingRequest}
                  style={{
                    width: '49%',
                    backgroundColor: '#022B42',
                    padding: 11,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>Carpooling Request</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Icon name="add" size={20} color="#000" />
                <Text
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Add Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Icon name="add" size={20} color="#000" />
                <Text
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Add Work
                </Text>
              </TouchableOpacity>
            </View>

            {/* Route Section
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>Every available route in Islamabad</Text>
              <TouchableOpacity onPress={() => setShowDriverRrequest(!showDriverRrequest)} style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#007bff' }}>
                  {showDriverRrequest ? 'HIDE ROUTES' : 'VIEW ALL'}
                </Text>
              </TouchableOpacity>

              {showDriverRrequest && (
                <View style={{ marginTop: 20 }}>
                  <PassengerRoute />
                </View>
              )}
            </View> */}
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default DashboardD;
