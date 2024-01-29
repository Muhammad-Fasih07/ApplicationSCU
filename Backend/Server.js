
const mysql = require("mysql");
const express = require('express');
const bodyParser = require( "body-parser");
const app = express();
const port = 8082;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scu_transportation",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define your route handlers and SQL queries here

// Close the MySQL connection when the server stops
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection:", err);
    }
    console.log("MySQL connection closed");
    process.exit();
  });
});


// Middleware to parse JSON
app.use(bodyParser.json());

//JSON Parser
app.use(express.json());

//Parser
app.use(bodyParser.urlencoded({ extended: true }));
// API endpoint to handle Passenger registration
app.post('/api/register', (req, res) => {
  const { phonenumber, name, password } = req.body;  // Use req.body instead of reqBody
  console.log(req.body);  // Log req.body, not reqBody

  if (!phonenumber || !name || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const query = 'INSERT INTO passenger (phonenumber, name, password) VALUES (?, ?, ?)';
  const values = [phonenumber, name, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting passenger:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log('Passenger registered successfully');
    res.status(201).json({ message: 'Passenger registered successfully' });
  });
});


// API endpoint to handle driver registration
app.post('/api/registerDriver', (req, res) => {
  const {
    identity,
    type,
    firstName,
    lastName,
    phoneNumber,
    password,
    gender,
    vehicleBrand,
    vehicleModel,
    licenseNumber,
    vehicleNumberPlate,
    driverPhoto,
    licensePhoto,
    vehiclePhoto,
    cnicPhoto
  } = req.body;

  console.log(req.body); // Log req.body

  if (
    !identity ||
    !type ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !password ||
    !gender ||
    !vehicleBrand ||
    !vehicleModel ||
    !licenseNumber ||
    !vehicleNumberPlate ||
    !driverPhoto ||
    !licensePhoto ||
    !vehiclePhoto ||
    !cnicPhoto
  ) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const query =
    'INSERT INTO driver (`identity`,`type, `firste`-name`, `last-name`, `phone-number`, `password`, `gender`, `vehicle-brand`, `vehicle-model`, `license-number`, `vehicle-number-plate`, `driver-photo`, `license-photo`, `vehicle-photo`, `cnic-photo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    identity,
    type,
    firstName,
    lastName,
    phoneNumber,
    password,
    gender,
    vehicleBrand,
    vehicleModel,
    licenseNumber,
    vehicleNumberPlate,
    driverPhoto,
    licensePhoto,
    vehiclePhoto,
    cnicPhoto,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting driver:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log('Driver registered successfully');
    res.status(201).json({ message: 'Driver registered successfully', driverId: result.insertId });
  });
});







// Login API endpoint
app.post('/api/login', (req, res) => {
  const { phonenumber, password } = req.body;

  if (!phonenumber || !password) {
    return res.status(400).json({ message: 'Phone number and password are required.' });
  }

  const query = 'SELECT * FROM passenger WHERE phonenumber = ? AND password = ?';
  const values = [phonenumber, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // User login successful, extract user details
      const user = results[0];
      const { name /* ... add other fields as needed */ } = user;

      // Return user details along with success message
      res.status(200).json({
        message: 'Login successful',
        user: {
          name,
          // ... add other fields as needed
        },
      });
    } else {
      // User login failed
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  });
});



// API endpoint to insert a complaint
app.post('/api/complaints', (req, res) => {
  const { name, email, description } = req.body;

  if (!name || !email || !description) {
    return res.status(400).json({ error: 'Name, email, and description are required fields' });
  }

  const insertQuery = 'INSERT INTO complaints (name, email, description) VALUES (?, ?, ?)';
  const values = [name, email, description];

  connection.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting complaint:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ message: 'Complaint inserted successfully' });
  });
});

app.get('/' , (re, res) =>{
  return res.json("scu app running")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
