// Dashboard.js

import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Dashboard = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#B5C99A',
      }}
    >
      {/* Header */}
      <View
        style={{
          padding: 20,
          borderBottomWidth: 2,
          borderBottomColor: '#718355',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
          }}
        >
          SCU
        </Text>
      </View>

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Your dashboard content goes here */}
        <Text>Welcome to SCU Dashboard</Text>
      </View>
    </View>
  );
};

export default Dashboard;
