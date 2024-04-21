import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
const { width, height } = Dimensions.get('window');

// This function adjusts font size based on screen size
const getFontSize = (size) => {
  if (width < 360) {
    return size - 2; // smaller screen, smaller font size
  } else if (width > 600) {
    return size + 2; // larger screen, larger font size
  }
  return size; // default size for average screens
};


const Login = ({ navigation }) => {

  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

 
  const handleLogin = async () => {
    try {
      const response = await Axios.post('http://172.17.242.86:8082/api/login', {
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
            case 'DashboardD':
              navigation.navigate('DashboardD', { user });
              break;
            default:
              showAlert('Invalid identity.', 'Login Failed');
          }
        } else {
          showAlert('Invalid response from server.', 'Login Failed');
        }
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        handleErrorResponse(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        showAlert('No response from the server. Please check your network connection.', 'Login Error');
      } else {
        // Something happened in setting up the request that triggered an error
        showAlert('Error: please check your Credentials. Please try again.', 'Login Error');
      }
    }
  };
  
  const handleErrorResponse = (response) => {
    // Assuming the server response contains an error field for specific error messages
    const errorMessage = response.data && response.data.error 
                         ? response.data.error 
                         : 'Error: please check your Credentials. Please try again.';
    showAlert(errorMessage, 'Login Error');
  };
  
  const showAlert = (message, title) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };
  

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, padding: width < 360 ? 10 : 15, marginTop: width < 360 ? 0 : 0 }}
    >
      <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
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
          <Text style={{ fontWeight: 'bold', fontSize: getFontSize(15), marginBottom: 15, maxWidth: '60%', textAlign: 'center' }}>
            Welcome back you've been missed!
          </Text>
        </View>
        <View style={{ marginVertical: 30, marginTop: 40 }}>
          <TextInput
            placeholder="Email/Phonenumber"
            placeholderTextColor={Colors.dark}
            style={{
              fontSize: getFontSize(15),
              padding: 20,
              backgroundColor: 'rgba(207,216,220,1.0)',
              borderRadius: 5,
              marginVertical: 5,
            }}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(207,216,220,1.0)', borderRadius: 5, marginVertical: 5 }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.dark}
              secureTextEntry={!showPassword}
              style={{ fontSize: getFontSize(15), padding: 20, backgroundColor: 'rgba(207,216,220,1.0)', borderRadius: 15, flex: 1, }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
            <Text style={{ fontWeight: '400', color: 'black', alignSelf: 'flex-end' }}>Forget your password?</Text>
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
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: getFontSize(20), fontWeight: 'bold' }}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Selection')} style={{ padding: 15 }}>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: getFontSize(15), fontWeight: '400' }}>Create new account</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: getFontSize(15), fontWeight: '400' }}>Or continue with</Text>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#022B42', borderRadius: 20, marginHorizontal: 10 }}>
              <Ionicons name="logo-google" color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#022B42', borderRadius: 20, marginHorizontal: 10 }}>
              <Ionicons name="logo-apple" color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#022B42', borderRadius: 20, marginHorizontal: 10 }}>
              <Ionicons name="logo-facebook" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
