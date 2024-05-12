import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentMethodsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>
      <TouchableOpacity style={styles.paymentOption} onPress={() => navigation.goBack()}>
        <Icon name="attach-money" size={24} color="green" style={styles.icon} />
        <Text style={styles.paymentText}>Cash</Text>
        <Icon name="check" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentOption} onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.addPaymentText}>Add a credit or debit card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    marginRight: 20,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
  },
  addPaymentText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default PaymentMethodsScreen;
