import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    navigation.navigate('RegisterN');
    // Handle submission logic here, e.g., sending the name to a server or saving it locally
    // console.log('Submitted name:', name);
    // You can add further logic based on your requirements
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, // Adjust paddingTop for better alignment
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          padding: 15,
          borderRadius: 50,
          backgroundColor: 'gray',
        }}
      >
        <Ionicons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>

      {/* First View */}
      <View style={{ alignItems: 'flex-start', marginTop: 90,marginRight:40 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          What's Your Name?
        </Text>

        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Please provide your name to help us identify you.
        </Text>
      </View>

      {/* Second View */}
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginRight: 160,
        }}
      >
        <View style={{ width: '80%', marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 12,
              width: '100%',
            }}
            placeholder="Type your name here"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            color: 'rgb(24,61,61)',
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Termcondition')}
          style={{
            marginRight: 5,
          }}
        >
          <Text
            style={{
              color: 'blue',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Terms & Conditions
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: 'black',
          }}
        >
          •
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Privacypolicy')}
          style={{
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              color: 'blue',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: 'blue',
            paddingVertical: 15,
            paddingHorizontal: 150,
            borderRadius: 25,
            width: '150%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
