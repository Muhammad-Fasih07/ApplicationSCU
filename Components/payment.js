import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nickname, setNickname] = useState('');

  const handleFormSubmit = () => {
    // Add payment processing logic here
    alert('Card added successfully!');
    // Reset form fields
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setNickname('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Card</Text>

      <TextInput
        style={styles.input}
        placeholder="Card number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Expiry date"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nickname (optional)"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* 
       */}

      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>All payment information is stored securely</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  inputHalf: {
    flex: 1,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardType: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#407bff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default Payment;
