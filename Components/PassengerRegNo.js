import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Text, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PassengerRegNo = ({ navigation, route }) => {
  const [phonenumber, setPhonenumber] = useState('');
  const { params } = route;

  // Check if params and identity exist, otherwise set a default value
  const identity = params?.identity || 'Passenger';

  const handleChange = (value) => {
    setPhonenumber(value);
  };

  const handleSubmit = () => {
    const phoneRegex = /^\d{11}$/;

    if (!phoneRegex.test(phonenumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Pakistani phone number.');
      return;
    }
    navigation.navigate('PassengerRegname', { identity, phonenumber });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Icon name="phone-iphone" size={40} color="#022B42" />
            <Text style={styles.headerText}>Enter Your Phone Number</Text>
            <Text style={styles.subHeaderText}>Enter your phone number to create an account or log in</Text>
          </View>

          <View
            style={[
              styles.phoneInputContainer,
              { borderColor: phonenumber ? '#022B42' : '#D1D5DB' },
            ]}
          >
            <PhoneInput
              defaultValue={phonenumber}
              defaultCode="PK"
              layout="first"
              onChangeText={(text) => handleChange(text)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              withDarkTheme
              withShadow
              autoFocus
              textContainerStyle={styles.phoneInputTextContainer}
              textInputStyle={styles.phoneInputText}
            />
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} activeOpacity={0.8}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    paddingTop: StatusBar.currentHeight || 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#022B42',
    marginTop: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  phoneInputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  phoneInputTextContainer: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  phoneInputText: {
    fontSize: 16,
    color: '#1F2937',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#022B42',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2 },
    flexDirection: 'row',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PassengerRegNo;
