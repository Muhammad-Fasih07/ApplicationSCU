import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  // Access the phonenumber parameter from the route
  const {identity,phonenumber, Name } = route.params;
  // console.log(phonenumber);
  // console.log(Name);
  // console.log(password);

  const handlePasswordChange = (text) => {
    setPassword(text);

    // Check the regex and update the error state
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
    setIsError(!regex.test(text));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (isError || !password) {
      Alert.alert('Error', 'Please enter a valid password.');
    } else {
      try {
        // Send the registration data to the API
        const response = await fetch('http://192.168.100.15:8082/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identity: identity,
            phonenumber: phonenumber,
            name: Name,
            password: password,
          }),
        });

        if (response.status === 201) {
          // Registration successful
          console.log('Data inserted successfully');
          navigation.navigate('Login'); // Replace 'Login' with the actual name of your next page
        } else {
          // Registration failed
          console.error('Error inserting data into the "passenger" table');
          Alert.alert('Error', 'Internal server error');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50 }}
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
            fontSize: 13,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          "Create a password with uppercase, lowercase, numbers, and special characters (up to 8 characters)."
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
            borderColor: isError ? 'red' : '#022B42',
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

      <View
        style={{
          marginBottom: 10,
          alignItems: 'center',
        }}
      >
        {/* Error message is now removed */}
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
          <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
