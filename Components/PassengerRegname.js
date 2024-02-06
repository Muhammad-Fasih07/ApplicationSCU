import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation, route }) => {
  const [Name, setName] = useState('');

    // Access the phonenumber parameter from the route
    // const phonenumber = route.params?.phonenumber || '';
    // console.log(phonenumber);
    // const Name = route.params?.name || '';
    // console.log(Name);
    const {identity,phonenumber} = route.params;
    // console.log(phonenumber);
    // console.log(Name);

  const handleNameChange = (text) => {
    // Allow only alphabets and limit character count to 20
    if (text.length <= 20) {
      // Update the state only if the character is an alphabet or the field is being cleared
      if (/^[a-zA-Z]*$/.test(text) || text === '') {
        setName(text);
      }
    }
  };
  const handleSubmit = () => {
    if (!Name || !/^[A-Za-z]+$/.test(Name)) {
      // Display an error if the name is empty or doesn't meet criteria
      Alert.alert('Invalid Name', 'Please enter a valid name using only alphabets.');
      return;
    }

    navigation.navigate('PassengerPassword',{identity,phonenumber,Name});
    
    // Handle submission logic here
    // console.log('Submitted name:', name);
    // You can add further logic based on your requirements
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
      }}
    >
      

      {/* First View */}
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
          What's Your Name?
        </Text>

        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Please provide your name to help us identify you.
        </Text>
      </View>

      {/* Second View */}
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginRight: 160,
        }}
      >
        <View
          style={{
            width: '80%',
            marginBottom: 20,
            alignItems: 'center',
            marginLeft: 150,
          }}
        >
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: '#022B42',
              borderRadius: 25,
              paddingHorizontal: 70,
              paddingVertical: 12,
              width: '100%',
              marginLeft: 7,
            }}
            placeholder="Type your name here"
            value={Name}
            onChangeText={handleNameChange}
            maxLength={20} // Set maximum character length to 20
          />
        </View>
      </View>

      {/* Agreement and Submit */}
      <View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '400',
          }}
        >
          By creating SCU account you agree with SCU's
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
        {/* Terms & Conditions, Privacy Policy options */}
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
