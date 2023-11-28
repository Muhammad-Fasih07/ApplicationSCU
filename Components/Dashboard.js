import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animatedImageRef = useRef(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleProfileClick = () => {
    console.log('Navigate to profile settings');
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
          backgroundColor: '#333',
          padding: 10,
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
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Dashboard
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
        <Text>Welcome to the dashboard!</Text>
        <TouchableOpacity onPress={animateImage}>
          <Animatable.View ref={animatedImageRef}>
            <Image source={require('../assets/images/logo.png ')} style={{ width: 150, height: 150, marginTop: 20 }} />
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
            backgroundColor: '#f0f0f0',
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={handleProfileClick}>
            <Text style={{ fontSize: 16, marginBottom: 10, color: '#333' }}>Profile Settings</Text>
          </TouchableOpacity>
          {/* Add more drawer items here */}
        </View>
      )}
    </View>
  );
};

export default Dashboard;
