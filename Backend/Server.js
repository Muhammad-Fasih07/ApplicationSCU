
const mysql = require("mysql");
const express = require('express');
const bodyParser = require( "body-parser");
const app = express();
const port = 8082;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "applicationscu",
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
  const { identity, phonenumber, name, password } = req.body;  // Include identity in the request body
  console.log(req.body);  // Log req.body, not reqBody

  if (!identity || !phonenumber || !name || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const query = 'INSERT INTO passenger (identity, phonenumber, name, password) VALUES (?, ?, ?, ?)';
  const values = [identity, phonenumber, name, password];

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
    licenseNumber,
    driverPhoto,
    licensePhoto,
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
    !licenseNumber ||
    !driverPhoto ||
    !licensePhoto ||
    !cnicPhoto
  ) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const query = `
    INSERT INTO driver (\`identity\`, \`type\`, \`name\`, \`lastname\`, \`phonenumber\`, \`password\`, \`gender\`,
        \`license-number\`,  \`driverphoto\`,
      \`license-photo\`,  \`cnic-photo\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const values = [
    identity,
    type,
    firstName,
    lastName,
    phoneNumber,
    password,
    gender,
    licenseNumber,
    driverPhoto,
    licensePhoto,
    cnicPhoto
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting driver:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log('Driver registered successfully');
    res.status(201).json({ message: 'Driver registered successfully', p_id: result.insertId });
  });
});





// Login API endpoint
app.post('/api/login', (req, res) => {
  const { phonenumber, password } = req.body;

  if (!phonenumber || !password) {
    return res.status(400).json({ message: 'Phone number and password are required.' });
  }

  const passengerQuery = 'SELECT * FROM passenger WHERE phonenumber = ? AND password = ?';
  const driverQuery = 'SELECT * FROM driver WHERE phonenumber = ? AND password = ?'; // Update the column name
  const values = [phonenumber, password];

  // Log the query and values for debugging
  console.log('Passenger Query:', passengerQuery, 'Values:', values);

  db.query(passengerQuery, values, (passengerErr, passengerResults) => {
    if (passengerErr) {
      console.error('Error querying passenger database:', passengerErr);
      return res.status(500).json({ message: 'Passenger Internal server error', error: passengerErr.message });
    }

    if (passengerResults.length > 0) {
      const passenger = passengerResults[0];
      const { pid,name, identity,phonenumber,photo /* ... other fields */ } = passenger;

      // Return passenger details along with success message and navigate to dashboard1
      return res.status(200).json({
        message: 'Passenger login successful',
        user: { pid,name, identity,phonenumber,photo },
        navigateTo: 'Dashboard', // Modify the dashboard name as needed
      });
    }

    // If passenger login failed, check the driver table
    // Log the query and values for debugging
    console.log('Driver Query:', driverQuery, 'Values:', values);

    db.query(driverQuery, values, (driverErr, driverResults) => {
      if (driverErr) {
        console.error('Error querying driver database:', driverErr);
        return res.status(500).json({ message: 'Driver Internal server error', error: driverErr.message });
      }

      if (driverResults.length > 0) {
        const driver = driverResults[0];
        const { d_id,name, identity,lastname,gender,driverphoto,phonenumber /* ... other fields */ } = driver;

        // Return driver details along with success message and navigate to dashboard2
        return res.status(200).json({
          message: 'Driver login successful',
          user: {d_id,name, identity,lastname,gender,driverphoto,phonenumber },
          navigateTo: 'DashboardD', // Modify the dashboard name as needed
        });
      }

      // If neither passenger nor driver login is successful
      return res.status(401).json({ message: 'Invalid phone number or password' });
    });
  });
});












 



// API endpoint to insert a complaint with a passenger ID (pid) field
app.post('/api/complaints', (req, res) => {
  const { name, phonenumber, description, reason, pid } = req.body;  // Include the passenger ID

  // Check if all required fields are provided
  if (!pid || !name || !phonenumber || !description || !reason) {
    return res.status(400).json({ error: 'Name, phone number, description, reason, and passenger ID are required fields.' });
  }

  // SQL insert query to include the passenger ID
  const insertQuery = 'INSERT INTO usercomplaint (pid, name, phonenumber, description, reason) VALUES (?, ?, ?, ?, ?)';
  const values = [pid, name, phonenumber, description, reason];

  // Execute the query
  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting complaint:', err);  // Log the error details
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If the insertion is successful
    return res.status(201).json({ message: 'Complaint inserted successfully' });
  });
});


// API endpoint to insert a complaint with a driver ID (d_id) field
app.post('/api/complaintsD', (req, res) => {
  const { name, phonenumber, description, reason, d_id } = req.body;  // Include the passenger ID

  // Check if all required fields are provided
  if (!d_id || !name || !phonenumber || !description || !reason) {
    return res.status(400).json({ error: 'Name, phone number, description, reason, and passenger ID are required fields.' });
  }

  // SQL insert query to include the passenger ID
  const insertQuery = 'INSERT INTO drivercomplaint (d_id, name, phonenumber, description, reason) VALUES (?, ?, ?, ?, ?)';
const values = [d_id, name, phonenumber, description, reason];


  // Execute the query
  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting complaint:', err);  // Log the error details
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If the insertion is successful
    return res.status(201).json({ message: 'Complaint inserted successfully' });
  });
});



// Api for route entering for driver
app.post('/api/routes', (req, res) => {
  const { picklocation, droplocation, picktime, droptime, passengercapacity } = req.body;

  if (!picklocation || !droplocation || !picktime || !droptime || !passengercapacity) {
    return res.status(400).json({ error: 'All fields (picklocation, droplocation, picktime, droptime, passengercapacity) are required' });
  }

  const insertQuery = 'INSERT INTO pddriverroutei (picklocation, droplocation, picktime, droptime, passengercapacity) VALUES (?, ?, ?, ?, ?)';
  const values = [picklocation, droplocation, picktime, droptime, passengercapacity];

  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting route:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ message: 'Route inserted successfully' });
  });
});



// Api for route entering for Passenger
app.post('/api/passengerroutes', (req, res) => {
  const { picklocation, droplocation, picktime, droptime } = req.body;

  if (!picklocation || !droplocation || !picktime || !droptime) {
    return res.status(400).json({ error: 'All fields (picklocation, droplocation, picktime, droptime) are required' });
  }

  const insertQuery = 'INSERT INTO pdpassengerrouter (picklocation, droplocation, picktime, droptime) VALUES (?, ?, ?, ?)';
  const values = [picklocation, droplocation, picktime, droptime];

  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting route:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ message: 'Route inserted successfully' });
  });
});


 

app.get('/api/passengerrouterequest', (req, res) => {
  const selectQuery = 'SELECT * FROM pdpassengerrouter';

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching routes:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json(results);
  });
});



app.get('/api/routes', (req, res) => {
  const selectQuery = 'SELECT * FROM pddriverroutei';

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching routes:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json(results);
  });
});




// Create carpooling driver request

app.post('/api/carpooling', (req, res) => {
  const {
    type,
    days,
    startDate,
    pickLocation,
    dropLocation,
    pickTime,
    dropTime,
    preference,
    maleQuantity,
    femaleQuantity
  } = req.body;

  const sql = `
    INSERT INTO carpoolingdriverReq (type, days, startDate, pickLocation, dropLocation, pickTime, dropTime, preference, maleQuantity, femaleQuantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [type, JSON.stringify(days), startDate, pickLocation, dropLocation, pickTime, dropTime, preference, maleQuantity, femaleQuantity];

  // Replace 'connection' with 'db'
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    console.log('New carpooling request added:', result);
    res.status(201).json({ message: 'Carpooling request added successfully' });
  });
});




// Create carpooling passenger request
app.post('/api/carpoolingp', (req, res) => {
  const {
    type,
    days,
    startDate,
    pickLocation,
    dropLocation,
    pickTime,
    dropTime,
    preference,
    maleQuantity,
    femaleQuantity
  } = req.body;

  const sql = `
    INSERT INTO carpoolingpassengerreq (type, days, startDate, pickLocation, dropLocation, pickTime, dropTime, preference, maleQuantity, femaleQuantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [type, JSON.stringify(days), startDate, pickLocation, dropLocation, pickTime, dropTime, preference, maleQuantity, femaleQuantity];

  // Replace 'connection' with 'db'
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    console.log('New carpooling request added:', result);
    res.status(201).json({ message: 'Carpooling request added successfully' });
  });
});

app.get('/api/carpoolingp', (req, res) => {
  const selectQuery = 'SELECT * FROM carpoolingpassengerreq';

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching routes:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json(results);
  });
});



// API endpoint to fetch driver data by ID
app.get('/driver/:d_id', (req, res) => {
  const { d_id } = req.params;
  const sqlQuery = 'SELECT name, lastname, type, gender, driverphoto FROM driver WHERE d_id = ?';
  
  db.query(sqlQuery, [d_id], (err, result) => {
    if (err) {
      console.error('Error fetching driver:', err);
      return res.status(500).json({ message: 'Error fetching driver data', error: err });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  });
});


// API endpoint to update driver data by ID
app.put('/driver/:d_id', (req, res) => {
  const { d_id } = req.params;
  const { name, lastname, type, gender, driverphoto } = req.body;

  if (!name || !lastname || !type || !gender || !driverphoto) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sqlQuery = 'UPDATE driver SET name = ?, lastname = ?, type = ?, gender = ?, driverphoto = ? WHERE d_id = ?';

  db.query(sqlQuery, [name, lastname, type, gender, d_id, driverphoto], (err, result) => {
    if (err) {
      console.error('Error updating driver:', err);
      return res.status(500).json({ message: 'Error updating driver data', error: err });
    }
    if (result.affectedRows > 0) {
      res.json({ message: 'Driver updated successfully' });
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  });
});


// API endpoint to fetch passenger data by ID
app.get('/passenger/:pid', (req, res) => {
  const { pid } = req.params;
  const sqlQuery = 'SELECT name, identity, photo FROM passenger WHERE pid = ?';
  
  db.query(sqlQuery, [pid], (err, result) => {
    if (err) {
      console.error('Error fetching passenger:', err);
      return res.status(500).json({ message: 'Error fetching driver data', error: err });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'passenger not found' });
    }
  });
});



// API endpoint to update passenger data by ID
app.put('/passenger/:pid', (req, res) => {
  const { pid } = req.params;
  const { name, identity, photo } = req.body;

  if (!name || !identity || !photo) {
    console.error('Missing fields:', { name, identity, photo });
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sqlQuery = 'UPDATE passenger SET name = ?, identity = ?, photo = ? WHERE pid = ?';
  db.query(sqlQuery, [name, identity, photo, pid], (err, result) => {
    if (err) {
      console.error('Error updating passenger:', err);
      return res.status(500).json({ message: 'Error updating passenger data', error: err });
    }
    if (result.affectedRows > 0) {
      res.json({ message: 'Passenger updated successfully' });
    } else {
      res.status(404).json({ message: 'Passenger not found' });
    }
  });
});


app.post('/api/vehicles', (req, res) => {
  const { vehicle_brand, vehicle_model, vehicle_number_plate, vehicle_photo, d_id } = req.body;

  if (!vehicle_brand || !vehicle_model || !vehicle_number_plate || !vehicle_photo || !d_id) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const query = 'INSERT INTO vehicle (d_id, vehicle_brand, vehicle_model, vehicle_number_plate, vehicle_photo) VALUES (?, ?, ?, ?, ?)';
  const values = [d_id, vehicle_brand, vehicle_model, vehicle_number_plate, vehicle_photo];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting vehicle:', err.message); // Log more specific error message
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  
    console.log('Vehicle registered successfully');
    res.status(201).json({ message: 'Vehicle registered successfully' });
  });
  
});





app.get('/' , (re, res) =>{
  return res.json("scu app running")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


