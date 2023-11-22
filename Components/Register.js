import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const handleNameChange = (text) => {
    // Limit character count to 15
    if (text.length <= 20) {
      setName(text);
    }
  };
  
  const handleSubmit = () => {
    navigation.navigate('Password');
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
      <View
        style={{
          alignItems: 'center',
          marginTop: 90,
        }}
      >
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
        <View
          style={{
            width: '80%',
            marginBottom: 20,
            alignItems:'center',
            marginLeft:150
          
          }}
        >
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: 'rgb(24,61,61)',
              borderRadius: 25,
              paddingHorizontal: 90,
              paddingVertical: 12,
              width: '200%',
              marginLeft:7
              
            }}
            placeholder="Type your name here"
            value={name}
            onChangeText={handleNameChange}
            maxLength={20} // Set maximum character length to 20
          />
        </View>
      </View>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Termcondition')}
          style={{
            marginRight: 5,
          }}
        >
          <Text
            style={{
              color: 'rgb(24,61,61)',
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
              color: 'rgb(24,61,61)',
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
            backgroundColor: 'rgb(24,61,61)',
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