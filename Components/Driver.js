// ContactScreen.jsx

import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactScreen = ({ navigation, route }) => {
  const circleSize = 150;
  
 


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50,
      }}
    >
      <StatusBar backgroundColor="rgb(138, 174, 224)" barStyle="light-content" />
      {/* Header */}
      <View
        style={{
          backgroundColor: '#022B42',
          height: 65,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Register as
        </Text>
      </View>
      {/* Car button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('DriverPhonenumber', { identity: 'Driver',vehicleType: 'Car' })}
        style={{
          backgroundColor: '#022B42',
          borderRadius: circleSize / 2,
          width: circleSize,
          height: circleSize,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="directions-car" size={50} color="#FDD387" />
        <Text style={{ color: '#fff', marginTop: 8, fontSize: 16 }}>Car</Text>
      </TouchableOpacity>
      {/* Van button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('DriverPhonenumber', {identity: 'Driver' ,vehicleType: 'Van' })}
        style={{
          backgroundColor: '#022B42',
          borderRadius: circleSize / 2,
          width: circleSize,
          height: circleSize,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialCommunityIcons name="van-passenger" size={50} color="#FDD387" style={{ marginRight: 10 }} />
        <Text style={{ color: '#fff', marginTop: 8, fontSize: 16 }}>Van</Text>
      </TouchableOpacity>
      {/* Bus button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('DriverPhonenumber', { identity: 'Driver' ,vehicleType: 'Bus' })}
        style={{
          backgroundColor: '#022B42',
          borderRadius: circleSize / 2,
          width: circleSize,
          height: circleSize,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="directions-bus" size={50} color="#FDD387" />
        <Text style={{ color: '#fff', marginTop: 8, fontSize: 16 }}>Bus</Text>
      </TouchableOpacity>
      {/* Empty space at the bottom */}
      <View style={{ height: 10 }}></View>
      {/* Agreement and Submit */}
      <View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '400',
          }}
        >
          By creating SCU account you agree with SCU's
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {/* Terms & Conditions, Privacy Policy options */}
        <TouchableOpacity onPress={() => navigation.navigate('Termcondition')} style={{ marginRight: 5 }}>
          <Text
            style={{
              color: '#022B42',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <Text style={{ color: 'black' }}>•</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Privacypolicy')} style={{ marginLeft: 5 }}>
          <Text
            style={{
              color: '#022B42',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactScreen;
