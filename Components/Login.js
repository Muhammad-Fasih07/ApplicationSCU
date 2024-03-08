import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await Axios.post('http://172.17.243.179:8082/api/login', {
        phonenumber: phoneNumber,
        password: password,
      });
  
      if (response.status === 200) {
        const { user, navigateTo } = response.data;
  
        if (user && navigateTo) {
          switch (navigateTo) {
            case 'Dashboard':
              navigation.navigate('Dashboard', { user });
              break;
            case 'Dashboard2':
              navigation.navigate('Dashboard2', { user });
              break;
            default:
              Alert.alert('Login Failed', 'Invalid identity.', [{ text: 'OK' }]);
          }
        } else {
          Alert.alert('Login Failed', 'Invalid response from server.', [{ text: 'OK' }]);
        }
      } else {
        // Check for specific error messages
        if (response.data && response.data.error) {
          const { error } = response.data;
          if (error === 'InvalidPhoneNumber') {
            setErrorMessage('Invalid phone number. Please check and try again.');
          } else if (error === 'InvalidPassword') {
            setErrorMessage('Invalid password. Please check and try again.');
          } else {
            setErrorMessage('Invalid phone number or password. Please check and try again.');
          }
        } else {
          setErrorMessage('Invalid phone number or password.');
        }
  
        // Clear input fields
        setPhoneNumber('');
        setPassword('');
  
        // Show the error message
        showAlert();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during login.');
  
      // Clear input fields
      setPhoneNumber('');
      setPassword('');
  
      // Show the error message
      showAlert();
    }
  };
  

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
          marginTop: 40,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/logoscu.png')}
            style={{
              width: '30%',
              height: 80,
              marginBottom: 20,
              borderRadius: 20,
              backgroundColor: 'rgb(24,61,61)',
            }}
          />

          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              maxWidth: '60%',
              textAlign: 'center',
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: 30,
            marginTop: 40,
          }}
        >
          <TextInput
            placeholder="Email/Phonenumber"
            placeholderTextColor={Colors.darkText}
            style={{
              fontSize: 15,
              padding: 20,
              backgroundColor: 'rgba(207,216,220,1.0)',
              borderRadius: 5,
              marginVertical: 5,
            }}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.darkText}
            secureTextEntry
            style={{
              fontSize: 15,
              padding: 20,
              backgroundColor: 'rgba(207,216,220,1.0)',
              borderRadius: 5,
              marginVertical: 5,
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
            <Text
              style={{
                fontWeight: '400',
                color: 'black',
                alignSelf: 'flex-end',
              }}
            >
              Forget your password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            padding: 15,
            backgroundColor: '#022B42',
            marginVertical: 30,
            borderRadius: 5,
            shadowColor: 'rgb(147, 177, 166)',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.3,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Selection')}
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 30,
          }}
        >
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '400',
            }}
          >
            Or continue with
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#022B42',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-google" color={Colors.white} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#022B42',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-apple" color={Colors.white} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#022B42',
                borderRadius: 20,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-facebook" color={Colors.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
