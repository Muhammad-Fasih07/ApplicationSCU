// Assuming you have a form with an id 'payment-form'
const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { token, error } = await stripe.createToken(card);

  if (error) {
    console.error(error);
  } else {
    // Send the token to your server
    fetch('/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token.id }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Payment successful:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});
