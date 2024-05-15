import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from '../src/env';  // Adjust the path as necessary

const Register = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const { identity, phonenumber, Name } = route.params;

  const handlePasswordChange = (text) => {
    setPassword(text);
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
        const response = await fetch(`${API_BASE_URL}/api/register`, {
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
          console.log('Data inserted successfully');
          navigation.navigate('Login'); // Replace 'Login' with the actual name of your next page
        } else {
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
            style={[styles.input, isError && styles.inputError]}
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
    backgroundColor: 'white',
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
    marginTop: 10,
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
