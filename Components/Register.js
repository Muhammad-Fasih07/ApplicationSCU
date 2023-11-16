import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          padding: 15,
          backgroundColor: 'gray',
          borderRadius: 50,
        }}
      >
        <Ionicons name="arrow-back" color={Colors.text} size={20} />
      </TouchableOpacity>

      <View
        style={{
          marginTop: -520,
          marginRight: 130,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: '400',
          }}
        >
          What's your name?
        </Text>
      </View>

      
      <Text
        style={{
          marginHorizontal: 25,
          marginTop: 10,
          color: 'gray',
          fontSize: 17,
        }}
      >
        Your name helps captains to confirm who they're picking up
      </Text>
      
    



    </View>
  );
};

export default Register;
