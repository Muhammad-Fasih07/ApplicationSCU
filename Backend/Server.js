const express = require('express');
const app = express();
const port = 5000;
const ConnetDB = require('./config/db');
const bodyparser = require('body-parser');
var cors = require('cors');

app.use(cors());
//Configuring Express Server

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'node is working',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: `Fail`,
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
