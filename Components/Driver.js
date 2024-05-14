import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactScreen = ({ navigation }) => {
  const circleSize = 150; // Defined circleSize here

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#022B42" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Register as</Text>
      </View>

      <View style={styles.content}>
        {/* Car button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('DriverPhonenumber', { identity: 'Driver', vehicleType: 'Car' })}
          style={[styles.circleButton, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
        >
          <Icon name="directions-car" size={50} color="#FDD387" />
          <Text style={styles.circleButtonText}>Car</Text>
        </TouchableOpacity>

        {/* Van button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('DriverPhonenumber', { identity: 'Driver', vehicleType: 'Van' })}
          style={[styles.circleButton, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
        >
          <MaterialCommunityIcons name="van-passenger" size={50} color="#FDD387" />
          <Text style={styles.circleButtonText}>Van</Text>
        </TouchableOpacity>

        {/* Bus button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('DriverPhonenumber', { identity: 'Driver', vehicleType: 'Bus' })}
          style={[styles.circleButton, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
        >
          <Icon name="directions-bus" size={50} color="#FDD387" />
          <Text style={styles.circleButtonText}>Bus</Text>
        </TouchableOpacity>
      </View>

      {/* Empty space at the bottom */}
      <View style={{ height: 10 }}></View>

      {/* Agreement and Submit */}
      <View>
        <Text style={styles.agreementText}>
          By creating an SCU account you agree with SCU's
        </Text>
      </View>
      <View style={styles.termsContainer}>
        {/* Terms & Conditions, Privacy Policy options */}
        <TouchableOpacity onPress={() => navigation.navigate('Termcondition')} style={styles.termsButton}>
          <Text style={styles.termsText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <Text style={styles.dot}>•</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Privacypolicy')} style={styles.termsButton}>
          <Text style={styles.termsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  circleButton: {
    backgroundColor: '#022B42',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  circleButtonText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  agreementText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
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
    fontWeight: '400',
  },
  dot: {
    color: 'black',
  },
});

export default ContactScreen;
