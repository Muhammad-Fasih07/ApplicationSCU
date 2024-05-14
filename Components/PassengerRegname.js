import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation, route }) => {
  const [Name, setName] = useState('');
  const { identity, phonenumber } = route.params;

  const handleNameChange = (text) => {
    if (text.length <= 20) {
      if (/^[a-zA-Z]*$/.test(text) || text === '') {
        setName(text);
      }
    }
  };

  const handleSubmit = () => {
    if (!Name || !/^[A-Za-z]+$/.test(Name)) {
      Alert.alert('Invalid Name', 'Please enter a valid name using only alphabets.');
      return;
    }

    navigation.navigate('PassengerPassword', { identity, phonenumber, Name });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#022B42" />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>What's Your Name?</Text>
        <Text style={styles.subHeaderText}>
          Please provide your name to help us identify you.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Type your name here"
          value={Name}
          onChangeText={handleNameChange}
          maxLength={20}
        />
      </View>

      {/* Terms and Conditions */}
      <View style={styles.agreementContainer}>
        <Text style={styles.agreementText}>
          By creating SCU account you agree with SCU's
        </Text>
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Termcondition')}>
            <Text style={styles.termsText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.dot}>•</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Privacypolicy')}>
            <Text style={styles.termsText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20, // Increased spacing
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#022B42',
    marginTop: 10, // Increased spacing
    textAlign: 'center',
  },
  subHeaderText: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10, // Increased spacing
    marginBottom: 40, // Increased spacing
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 80, // Increased spacing
  },
  input: {
    borderWidth: 1,
    borderColor: '#022B42',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    marginBottom: 80, // Increased spacing
  },
  agreementContainer: {
    alignItems: 'center',
    marginBottom: 20, // Increased spacing
    marginTop: 20, // Increased spacing
  },
  agreementText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
    marginTop: 70,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    color: '#022B42',
    fontSize: 15,
    fontWeight: '500',
  },
  dot: {
    color: 'black',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#022B42',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 60, // Increased spacing
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Register;
