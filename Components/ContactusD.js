import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactusD = ({ navigation,route}) => {

  
  const phoneNumber = '03117443034'; // Replace with your phone number

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const { user } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          height: 60,
          width: '100%',
          backgroundColor: '#022B42',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 24 }}>Contact Us</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
        <TouchableOpacity
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: '#022B42',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: { height: 1 },
          }}
          onPress={handleCallPress}
        >
          <Icon name="call" size={50} color="#FDD387" />
          <Text style={{ color: '#fff', fontSize: 18, marginTop: 8, textAlign: 'center' }}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ComplaintD',{ user: user })}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: '#022B42',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: { height: 1 },
          }}
        >
          <Icon name="person" size={50} color="#FDD387" />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            Your Complaints
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactusD;
