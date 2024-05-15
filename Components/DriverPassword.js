import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { phonenumber, identity } = route.params;

  const handlePasswordChange = (text) => {
    setPassword(text);
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
      console.log('Password:', password);
      navigation.navigate('Driverdetails', { identity, phonenumber, password });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="key-outline" size={100} color="#022B42" />
        <Text style={styles.headerText}>Create a Password</Text>
        <Text style={styles.subHeaderText}>
        Create a password with uppercase, lowercase, numbers, and special characters (up to 8 characters).
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} color="#022B42" style={styles.icon} />
          <TextInput
            style={[styles.input, errorMessage && styles.inputError]}
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <Text style={styles.agreementText}>
        By creating an account, you agree to our Terms & Conditions
      </Text>

      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Termcondition')} style={styles.termsButton}>
          <Text style={styles.termsText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <Text style={styles.dot}>•</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Privacypolicy')} style={styles.termsButton}>
          <Text style={styles.termsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#022B42',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeaderText: {
    color: 'gray',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 225,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#022B42',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '80%',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  agreementText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 30,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  termsButton: {
    marginHorizontal: 5,
  },
  termsText: {
    color: '#022B42',
    fontSize: 15,
    fontWeight: '500',
  },
  dot: {
    color: 'black',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#022B42',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Register;
