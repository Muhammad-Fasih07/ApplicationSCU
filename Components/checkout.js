import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import axios from 'axios'; // Import axios for making network requests

const Checkout = () => {
  const handleCheckoutPress = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-checkout-session`, {
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ],
      });

      // Handle the response here
      console.log(response.data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleCheckoutPress}>
      <Text>Checkout</Text>
    </TouchableOpacity>
  );
};

export default Checkout;
