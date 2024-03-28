import React, { useState } from 'react';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add payment processing logic here
    alert('Payment successful!');
    // Reset form fields
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setAmount('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h2>Payment Details</h2>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          placeholder="Enter card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input type="submit" value="Pay" />
      </form>
    </div>
  );
};

export default PaymentForm;
