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
  Dimensions,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import { API_BASE_URL } from '../src/env';  // Adjust the path as necessary

const { width } = Dimensions.get('window');

const getFontSize = (size) => {
  if (width < 360) {
    return size - 2;
  } else if (width > 600) {
    return size + 2;
  }
  return size;
};

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await Axios.post(`${API_BASE_URL}/api/login`, {
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
        handleErrorResponse(error.response);
      } else if (error.request) {
        showAlert('No response from the server. Please check your network connection.', 'Login Error');
      } else {
        showAlert('Error: please check your credentials. Please try again.', 'Login Error');
      }
    }
  };

  const handleErrorResponse = (response) => {
    const errorMessage =
      response.data && response.data.error
        ? response.data.error
        : 'Error: please check your credentials. Please try again.';
    setPhoneNumber('');
    setPassword('');
    showAlert(errorMessage, 'Login Error');
  };

  const showAlert = (message, title) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image
              source={require('../assets/logoscu.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.welcomeText}>Welcome back, you've been missed!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email/Phone Number"
            placeholderTextColor="#6b6b6b"
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#6b6b6b"
              secureTextEntry={!showPassword}
              style={styles.textInputPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#6b6b6b" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Forgetpassword')}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Selection')} style={styles.createAccountButton}>
          <View style={styles.createAccountButtonBackground}>
            <Text style={styles.createAccountText}>Create new account</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.socialLoginContainer}>
          <Text style={styles.continueWithText}>Or continue with</Text>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background color for modern look
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Center content vertically
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40, // Space between logo and inputs
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#022B42',
    elevation: 5,
  },
  logo: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  welcomeText: {
    fontWeight: '600',
    fontSize: getFontSize(20),
    color: '#022B42',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20, // Space between inputs and forget password text
  },
  textInput: {
    fontSize: getFontSize(16),
    padding: 15,
    backgroundColor: '#fff', // White background for inputs
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2,
    height: 50, // Fixed height
  },
  textInputPassword: {
    flex: 1,
    fontSize: getFontSize(16),
    padding: 15,
    backgroundColor: '#fff', // White background for inputs
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    height: 50, // Fixed height
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2,
    height: 50, // Fixed height
  },
  showPasswordIcon: {
    padding: 10,
  },
  forgotPasswordText: {
    fontWeight: '400',
    color: '#022B42',
    alignSelf: 'flex-end',
    marginBottom: 20, // Space between forget password text and sign in button
  },
  signInButton: {
    padding: 15,
    backgroundColor: '#022B42',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20, // Space between sign in button and create account text
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: getFontSize(18),
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginBottom: 20,
  },
  createAccountButtonBackground: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDD387',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  createAccountText: {
    color: '#022B42',
    textAlign: 'center',
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    marginTop: 30,
  },
  continueWithText: {
    color: '#022B42',
    textAlign: 'center',
    fontSize: getFontSize(16),
    fontWeight: '400',
    marginBottom: 10, // Space between continue with text and social buttons
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    padding: 10,
    backgroundColor: '#022B42',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default Login;
