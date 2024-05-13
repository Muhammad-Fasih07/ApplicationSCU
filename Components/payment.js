import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const Payment = () => {
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPress = async () => {
    setIsProcessing(true);
    if (!cardDetails?.complete) {
      Alert.alert("Incomplete Card Details", "Please enter complete card details.");
      setIsProcessing(false);
      return;
    }

    try {
      const clientSecret = await fetchPaymentIntentClientSecret();
      if (!clientSecret) {
        setIsProcessing(false);
        return;
      }

      const { error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: {},
      });

      setIsProcessing(false);
      if (error) {
        Alert.alert("Payment Failed", `Payment failed: ${error.message}`);
      } else {
        Alert.alert("Payment Successful", "Payment successful");
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      setIsProcessing(false);
      Alert.alert("Error", "An error occurred while processing payment. Please try again later.");
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch('http://192.168.100.8:8082/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as required
        },
        body: JSON.stringify({
          // Add any parameters required for fetching client secret
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch client secret');
      }

      const data = await response.json();
      return data.clientSecret; // Assuming your server responds with 'clientSecret' field
    } catch (error) {
      console.error('Error fetching client secret:', error);
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Pay with Card</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderRadius: 8,
          fontSize: 16,
          placeholderColor: '#9e9e9e',
        }}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayPress} disabled={isProcessing}>
        {isProcessing ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Pay Now</Text>
        )}
      </TouchableOpacity>
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
  cardContainer: {
    height: 50,
    marginVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  button: {
    backgroundColor: '#407bff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Payment;
