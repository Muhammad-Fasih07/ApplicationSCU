import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Register = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { phonenumber,identity } = route.params;

  const handlePasswordChange = (text) => {
    setPassword(text);

    // Check the regex and update the error state
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
    setErrorMessage(!regex.test(text) ? 'Password must meet the criteria.' : '');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (!password || errorMessage) {
      Alert.alert('Error', 'Please correct the errors before submitting.');
    } else {
      console.log('Driver:', identity);
      console.log('Phone Number:', phonenumber);
      console.log('password:', password);
      
     
      // Password is valid, navigate to the next page
      navigation.navigate('Driverdetails', { identity,phonenumber, password });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: '#F5F5DC',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          marginTop: 70,
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
          width: '50%',
          marginBottom: 20,
          alignItems: 'center',
          marginBottom: 290,
        }}
      >
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: errorMessage ? 'red' : '#022B42',
            borderRadius: 25,
            paddingHorizontal: 75,
            paddingVertical: 12,
            width: '200%',
            marginLeft: 7,
          }}
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={{
            position: 'absolute',
            right: -60,
            top: 15,
          }}
        >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
        </TouchableOpacity>
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
              color: '#022B42',
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
              color: '#022B42',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10, alignItems: 'center' }}>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      </View>

      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: '#022B42',
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
