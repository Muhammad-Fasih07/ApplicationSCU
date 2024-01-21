const express = require('express');
const axios = require('axios');

// Import bcrypt and saltRounds
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Import your database connection
const connection = require('../config/db');

// This is Register/Signup API
exports.signup = async (req, res) => {
  const bodypassword = req.body.password;
  const encryptedPassword = await bcrypt.hash(bodypassword, saltRounds);

  const signUpquery = 'INSERT INTO `passenger`(`phonenumber`, `name`, `password`) VALUES (?,?,?);';

  let id = req.body.id;
  let phonenumber = req.body.phonenumber;
  let name = req.body.name;
  let password = encryptedPassword;

  if (phonenumber != null && name != null && password != null) {
    // Use Axios to make the POST request to your server
    axios
      .post('http://localhost:5000/passenger/signup', { phonenumber, name, password })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error.' });
      });
  } else {
    res.json({
      status: false,
      Message: 'Some data is missing',
    });
  }
};

exports.login = async (req, res) => {
  const { phonenumber, password } = req.body;

  if (!phonenumber || !password) {
    return res.status(400).json({ status: false, message: 'Please provide both phonenumber and password.' });
  }

  try {
    // Use Axios to make the POST request to your server
    axios
      .post('http://localhost:5000/passenger/login', { phonenumber, password })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error.' });
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};
