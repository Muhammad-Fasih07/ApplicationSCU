import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (text) => {
    // Validate password with only numbers and characters and a maximum length of 8
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(text) && text.length <= 8) {
      setPassword(text);
    }
  };

  const getPlaceholder = () => {
    if (password.length === 0) {
      return 'Enter your password (max 8 characters, only numbers and characters)';
    } else {
      return '•'.repeat(Math.min(password.length, 8)) + ' ' + 'Enter your password (max 8 characters, only numbers and characters)';
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Dashboard');
    // Handle submission logic here, e.g., validate password, etc.
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
        onPress={() => navigation.navigate('Register')}
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
          Create a Password
        </Text>

        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Set a password with only numbers and characters (max 8 characters)
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginRight: 160,
        }}
      >
        <View style={{ width: '80%', marginBottom: 20, alignItems: 'center', marginLeft: 150 }}>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: 'rgb(24,61,61)',
              borderRadius: 25,
              paddingHorizontal: 75,
              paddingVertical: 12,
              width: '200%',
              marginLeft: 7,
            }}
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={true} // Hide the entered text for passwords
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
          By creating an account, you agree to our Terms & Conditions
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
          onPress={() => navigation.navigate('Dashboard')}
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
