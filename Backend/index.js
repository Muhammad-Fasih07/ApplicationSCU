const express = require('express');
const app = express();
const port = 5000;
const connection = require('./config/db');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Configuring Express Server

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

//Routes

const passenger = require('./Routes/passengerRoutes');

app.use('/passenger', passenger);

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
