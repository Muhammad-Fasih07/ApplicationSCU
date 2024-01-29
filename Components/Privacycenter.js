import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactScreen = ({ navigation }) => {
  // Determine the size of the circle here so that you can adjust it easily
  const circleSize = 200; // This is both the height and width of the circle

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center', // Center children horizontally
      }}
    >
      <StatusBar backgroundColor="rgb(138, 174, 224)" barStyle="light-content" />
      <View
        style={{
          backgroundColor: '#022B42',
          height: 65,
          alignSelf: 'stretch', // Stretch to the full width of the screen
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
          Privacy Center
        </Text>
      </View>

      {/* Student button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Privacypolicy')}
        style={{
          backgroundColor: '#022B42',
          borderRadius: circleSize / 2, // Half of the width/height to make it a circle
          marginVertical: 100, // Vertical margin
          width: circleSize, // Width of the circle
          height: circleSize, // Height of the circle
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="privacy-tip" size={50} color="#FDD387" />
        <Text
          style={{
            color: '#fff',
            marginTop: 8,
            fontSize: 16,
          }}
        >
          Privacy Policy
        </Text>
      </TouchableOpacity>
      {/* Driver button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Termcondition')}
        style={{
          backgroundColor: '#022B42',
          borderRadius: circleSize / 2,
          marginVertical: 20,
          width: circleSize,
          height: circleSize,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="description" size={50} color="#FDD387" />
        <Text
          style={{
            color: '#fff',
            marginTop: 8,
            fontSize: 16,
          }}
        >
          Term & Condition
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactScreen;
