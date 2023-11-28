import React, { useState, useRef } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Text } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 20,
          paddingTop: StatusBar.currentHeight || 0,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              position: 'absolute',
              top: 40,
              left: 8,
              padding: 15,
              borderRadius: 40,
              backgroundColor: 'gray',
            }}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <View
            style={{
              marginTop: 120,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '400',
                marginBottom: 10,
              }}
            >
              Enter your phone number
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 20,
                color: 'gray',
              }}
            >
              Enter your phone number, to create an account or log in
            </Text>
          </View>

          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            style={{
              marginTop: 20,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            textContainerStyle={{
              fontSize: 16,
            }}
            textInputStyle={{
              fontSize: 16,
              color: '#333',
            }}
          />
           {showMessage && (
            <View
              style={{
                padding: 10,
                backgroundColor: '#eee',
                marginTop: 20,
                borderRadius: 5,
              }}
            >
              <Text>Value: {value}</Text>
              <Text>Formatted Value: {formattedValue}</Text>
              <Text>Valid: {valid ? 'true' : 'false'}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
               navigation.navigate('Register')
            }}
            style={{
              marginTop: 265,
              backgroundColor:'rgb(24,61,61)',
              padding: 13.5,
              borderRadius: 25,
              alignItems: 'center',
              width:'100%'
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>Submit</Text>
          </TouchableOpacity>
         
        </SafeAreaView>
      </View>
    </>
  );
};

export default App;
