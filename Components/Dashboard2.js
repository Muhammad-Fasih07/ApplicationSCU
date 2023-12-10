import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Dashboard = ({navigation}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animatedImageRef = useRef(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleProfileClick = () => {
    console.log('Navigate to mainscreen');
    closeDrawer();
  };

  const animateImage = () => {
    if (animatedImageRef.current) {
      animatedImageRef.current.shake(800); // Example animation, replace with your preferred animation
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgb(57, 88, 134)',
          padding: 10,
          marginTop:28
        }}
      >
        <TouchableOpacity onPress={toggleDrawer}>
          <Text
            style={{
              color: '#fff',
              fontSize: 24,
              marginRight: 10,
            }}
          >
            ☰
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'rgb(213, 222, 239)',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Welcome to SCU
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={animateImage}>
          <Animatable.View ref={animatedImageRef}>
            <Image
              source={require('../assets/bus.jpg')}
              style={{
                width: 350,
                marginBottom: 550,
                height: 150,
                marginHorizontal: 50,
                borderRadius: 20,
                backgroundColor: 'rgb(24,61,61)',
              }}
            />
          </Animatable.View>
        </TouchableOpacity>
      </View>
      {drawerOpen && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 250,
            backgroundColor: 'rgb(138, 174, 224)',
            padding: 20,
            borderRadius: 5,
          }}
        >
          {/* User Picture */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 30 }}>
            <Image
              source={require('../assets/userlogo.png')}
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 30 }}
            />
            {/* Replace with actual user name */}
            <Text style={{ fontSize: 16, color: '#333' ,fontWeight:'bold'}}>User Name</Text>
          </View>

          {/* Drawer items */}
          <TouchableOpacity onPress={handleProfileClick}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                color: '#333',
                marginTop: 30,
                fontWeight: 'bold',
              }}
            >
              Your Trip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                color: '#333',
                marginTop: 15,
                fontWeight: 'bold',
              }}
            >
              Wallet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                color: '#333',
                marginTop: 15,
                fontWeight: 'bold',
              }}
            >
              Payment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                color: '#333',
                marginTop: 15,
                fontWeight: 'bold',
              }}
            >
              Help
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                color: '#333',
                marginTop: 15,
                fontWeight: 'bold',
              }}
            >
              Setting
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileClick}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                color: '#333',
                marginTop: 15,
                fontWeight: 'bold',
              }}
            >
              Privacy Center
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
          style={{
            marginTop:280,
            padding: 10,
            backgroundColor: '#022B42',
            marginVertical: 3,
            borderRadius: 5,
            shadowColor: 'rgb(147, 177, 166)',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.3,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Passenger Mode
          </Text>
        </TouchableOpacity>
         
          {/* Add other drawer items here */}
        </View>
      )}
    </View>
  );
};

export default Dashboard;
