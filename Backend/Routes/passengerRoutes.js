const express = require('express');
const axios = require('axios');

const router = express.Router();

const logMiddleware = (req, res, next) => {
  console.log('Request received');
  next(); // Proceed to the next middleware or route handler
};
router.use(logMiddleware);

const { login, signup } = require('../Controllers/passengercontroller');

// Use Axios for handling POST requests
router.post('/login', (req, res) => {
  axios
    .post('http://localhost:5000/passenger/login', req.body) // Replace with your server's URL
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: false, message: 'Internal server error.' });
    });
});

router.post('/signup', (req, res) => {
  axios
    .post('http://localhost:5000/passenger/signup', req.body) // Replace with your server's URL
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: false, message: 'Internal server error.' });
    });
});

module.exports = router;
