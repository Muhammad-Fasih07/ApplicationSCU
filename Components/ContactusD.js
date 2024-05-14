import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use MaterialIcons

const ContactusD = ({ navigation, route }) => {
  const { user } = route.params;
  const phoneNumber = '03117443034'; // Replace with your phone number

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contact Us</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleCallPress}>
          <Icon name="call" size={50} color='#022B42' />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ComplaintD', { user })}
          style={styles.button}
        >
          <Icon name="person" size={50} color='#022B42' />
          <Text style={styles.buttonText}>Your Complaints</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022B42', // Primary color background
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(94, 147, 177)', // Secondary color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FDD387', // Accent color
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { height: 2 },
  },
  buttonText: {
    color: '#022B42',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
});

export default ContactusD;
