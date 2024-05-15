const mysql = require('mysql');
const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 8082;
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'applicationscu',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define your route handlers and SQL queries here

// Close the MySQL connection when the server stops
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
    }
    console.log('MySQL connection closed');
    process.exit();
  });
});

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());

//JSON Parser
app.use(express.json());

//Parser
app.use(bodyParser.urlencoded({ extended: true }));

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])
app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',  // Make sure this matches your frontend
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.send({ url: fileUrl });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));







// API endpoint to handle Passenger registration
app.post('/api/register', (req, res) => {
  const { identity, phonenumber, name, password } = req.body; // Include identity in the request body
  console.log(req.body); // Log req.body, not reqBody

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
    firstName,
    lastName,
    phoneNumber,
    password,
    gender,
    licenseNumber,
    driverPhoto,
    licensePhoto,
    cnicPhoto,
  } = req.body;

  console.log(req.body); // Log req.body

  if (
    !identity ||
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
    INSERT INTO driver (\`identity\`, \`name\`, \`lastname\`, \`phonenumber\`, \`password\`, \`gender\`,
        \`license-number\`,  \`driverphoto\`,
      \`license-photo\`,  \`cnic-photo\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    identity,
    firstName,
    lastName,
    phoneNumber,
    password,
    gender,
    licenseNumber,
    driverPhoto,
    licensePhoto,
    cnicPhoto,
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
  const driverQuery = `
    SELECT d.*, v.vehicle_number_plate 
    FROM driver d 
    JOIN vehicle v ON d.d_id = v.d_id 
    WHERE d.phonenumber = ? AND d.password = ?
  `;
  const values = [phonenumber, password];

  db.query(passengerQuery, values, (passengerErr, passengerResults) => {
    if (passengerErr) {
      console.error('Error querying passenger database:', passengerErr);
      return res.status(500).json({ message: 'Passenger Internal server error', error: passengerErr.message });
    }

    if (passengerResults.length > 0) {
      const passenger = passengerResults[0];
      const { pid, name, identity, phonenumber, photo /* ... other fields */ } = passenger;
      return res.status(200).json({
        message: 'Passenger login successful',
        user: { pid, name, identity, phonenumber, photo },
        navigateTo: 'Dashboard', 
      });
    }

    db.query(driverQuery, values, (driverErr, driverResults) => {
      if (driverErr) {
        console.error('Error querying driver database:', driverErr);
        return res.status(500).json({ message: 'Driver Internal server error', error: driverErr.message });
      }

      if (driverResults.length > 0) {
        const driver = driverResults[0];
        const { d_id, name, identity, lastname, gender, driverphoto, phonenumber, vehicle_number_plate /* ... other fields */ } = driver;
        return res.status(200).json({
          message: 'Driver login successful',
          user: { d_id, name, identity, lastname, gender, driverphoto, phonenumber, vehicle_number_plate },
          navigateTo: 'DashboardD',
        });
      }

      return res.status(401).json({ message: 'Invalid phone number or password' });
    });
  });
});

// API endpoint to insert a complaint with a passenger ID (pid) field
app.post('/api/complaints', (req, res) => {
  const { name, phonenumber, description, reason, pid } = req.body; // Include the passenger ID

  // Check if all required fields are provided
  if (!pid || !name || !phonenumber || !description || !reason) {
    return res
      .status(400)
      .json({ error: 'Name, phone number, description, reason, and passenger ID are required fields.' });
  }

  // SQL insert query to include the passenger ID
  const insertQuery = 'INSERT INTO usercomplaint (pid, name, phonenumber, description, reason) VALUES (?, ?, ?, ?, ?)';
  const values = [pid, name, phonenumber, description, reason];

  // Execute the query
  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting complaint:', err); // Log the error details
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If the insertion is successful
    return res.status(201).json({ message: 'Complaint inserted successfully' });
  });
});

// API endpoint to insert a complaint with a driver ID (d_id) field
app.post('/api/complaintsD', (req, res) => {
  const { name, phonenumber, description, reason, d_id } = req.body; // Include the passenger ID

  // Check if all required fields are provided
  if (!d_id || !name || !phonenumber || !description || !reason) {
    return res
      .status(400)
      .json({ error: 'Name, phone number, description, reason, and passenger ID are required fields.' });
  }

  // SQL insert query to include the passenger ID
  const insertQuery =
    'INSERT INTO drivercomplaint (d_id, name, phonenumber, description, reason) VALUES (?, ?, ?, ?, ?)';
  const values = [d_id, name, phonenumber, description, reason];

  // Execute the query
  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error inserting complaint:', err); // Log the error details
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
    return res
      .status(400)
      .json({ error: 'All fields (picklocation, droplocation, picktime, droptime, passengercapacity) are required' });
  }

  const insertQuery =
    'INSERT INTO pddriverroutei (picklocation, droplocation, picktime, droptime, passengercapacity) VALUES (?, ?, ?, ?, ?)';
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

  const insertQuery =
    'INSERT INTO pdpassengerrouter (picklocation, droplocation, picktime, droptime) VALUES (?, ?, ?, ?)';
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
    femaleQuantity,
  } = req.body;

  const sql = `
    INSERT INTO carpoolingdriverReq (type, days, startDate, pickLocation, dropLocation, pickTime, dropTime, preference, maleQuantity, femaleQuantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    type,
    JSON.stringify(days),
    startDate,
    pickLocation,
    dropLocation,
    pickTime,
    dropTime,
    preference,
    maleQuantity,
    femaleQuantity,
  ];

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
    femaleQuantity,
  } = req.body;

  const sql = `
    INSERT INTO carpoolingpassengerreq (type, days, startDate, pickLocation, dropLocation, pickTime, dropTime, preference, maleQuantity, femaleQuantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    type,
    JSON.stringify(days),
    startDate,
    pickLocation,
    dropLocation,
    pickTime,
    dropTime,
    preference,
    maleQuantity,
    femaleQuantity,
  ];

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
  const sqlQuery = 'SELECT name, lastname, gender, driverphoto FROM driver WHERE d_id = ?';
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
  const { name, lastname, gender, driverphoto } = req.body;

  if (!name || !lastname || !gender || !driverphoto) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sqlQuery = 'UPDATE driver SET name = ?, lastname = ?, gender = ?, driverphoto = ? WHERE d_id = ?';
  db.query(sqlQuery, [name, lastname, gender, driverphoto, d_id], (err, result) => {
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


//APi end point for vehicle registration of Driver

app.post('/api/vehicles', (req, res) => {
  const { vehicle_brand, vehicle_model,vehicle_type, vehicle_number_plate, vehicle_photo, vehicle_cc, d_id } = req.body;

  if (!vehicle_brand || !vehicle_model || !vehicle_type ||!vehicle_number_plate || !vehicle_photo || !vehicle_cc || !d_id) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const query = 'INSERT INTO vehicle (d_id, vehicle_brand, vehicle_model, vehicle_type, vehicle_number_plate, vehicle_photo, vehicle_cc) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [d_id, vehicle_brand, vehicle_model, vehicle_type, vehicle_number_plate, vehicle_photo, vehicle_cc];

  db.query(query, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Driver has already submitted vehicle data.' });
      }
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
    res.status(201).json({ message: 'Vehicle registered successfully' });
  });
});


//API end point for fetching Vehicle Details
app.get('/api/vehicles', (req, res) => {
  const query = 'SELECT * FROM vehicle';

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error retrieving vehicle data:', err);
          return res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'No vehicle records found.' });
      }

      res.status(200).json({
          message: 'Vehicle records retrieved successfully',
          data: results
      });
  });
});





// Endpoint to create a new route
app.post('/pickdroproutes', (req, res) => {
  const {
    source,
    destination,
    pickupPoints,
    dropoffPoints,
    pickupTime,
    dropoffTime,
    d_id,
    name,
    phonenumber,
    vehicle_number_plate,
  } = req.body;

  if (!source || !destination || !d_id || !name || !phonenumber || !vehicle_number_plate) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const query = `INSERT INTO pickdroproute (source, destination, pickupPoints, dropoffPoints, pickupTime, dropoffTime, d_id, name, phonenumber, vehicle_number_plate)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    source,
    destination,
    JSON.stringify(pickupPoints),
    JSON.stringify(dropoffPoints),
    pickupTime,
    dropoffTime,
    d_id,
    name,
    phonenumber,
    vehicle_number_plate,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting into pickdroproute:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'Route created successfully', data: results });
  });
});

const safeParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
};

app.get('/pickdroproute', (req, res) => {
  const query = 'SELECT * FROM pickdroproute';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const routes = results.map(route => ({
      ...route,
      pickuppoints: safeParse(route.pickuppoints),
      dropoffpoints: safeParse(route.dropoffpoints)
    }));

    res.json(routes);
  });
});



// Endpoint to save pick&Drop booking
app.post('/api/bookings', (req, res) => {
  const { pickupPoint, dropOffPoint, seats, fare, pid, pname, phonenumberp, d_id, dname, phonenumberd, vehicle_number_plate } = req.body;

  if (!pickupPoint || !dropOffPoint || !seats || !fare || !pid || !pname || !phonenumberp || !d_id || !dname || !phonenumberd || !vehicle_number_plate) {
    res.status(400).send('Missing required fields');
    return;
  }

  const query = 'INSERT INTO bookings (pickupPoint, dropOffPoint, seats, fare, pid, pname, phonenumberp, status, d_id, dname, phonenumberd, vehicle_number_plate) VALUES (?, ?, ?, ?, ?, ?, ?, "pending", ?, ?, ?, ?)';

  db.query(query, [pickupPoint, dropOffPoint, seats, fare, pid, pname, phonenumberp, d_id, dname, phonenumberd, vehicle_number_plate], (err, result) => {
    if (err) {
      console.error('Error saving booking:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Booking saved successfully');
  });
});



app.get('/api/bookings/pending', (req, res) => {
  const query = 'SELECT id, pickupPoint, dropOffPoint, seats, fare, pname,dname,phonenumberd,vehicle_number_plate, phonenumberp FROM bookings WHERE status = "pending"';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pending bookings:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).json(results);
  });
});

app.put('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE bookings SET status = ? WHERE id = ?';

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating booking status:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Booking status updated successfully');
  });
});

app.get('/api/bookings', (req, res) => {
  let { pid, status } = req.query;

  // Log the entire req.query object
  console.log('Received query parameters:', req.query);

  // Set default pid for testing if not provided
  if (!pid) {
    console.log('No pid provided, setting default pid for testing.');
    
  } else {
    // Ensure pid is a number
    pid = parseInt(pid, 10);
    if (isNaN(pid)) {
      console.error('Invalid pid value:', pid);
      return res.status(400).send('Invalid pid value');
    }
  }

  const query = 'SELECT * FROM bookings WHERE pid = ? AND status = ?';
  console.log(`Executing query: ${query} with values [${pid}, ${status}]`);

  db.query(query, [pid, status], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).send('Server error');
    }
    console.log('Query results:', results);
    return res.status(200).json(results);
  });
});


app.get('/api/booking', (req, res) => {
  let { d_id, status } = req.query;

  // Log the entire req.query object
  console.log('Received query parameters:', req.query);

  if (!d_id) {
    console.error('No d_id provided');
    return res.status(400).send('No d_id provided');
  }

  d_id = parseInt(d_id, 10);
  if (isNaN(d_id)) {
    console.error('Invalid d_id value:', d_id);
    return res.status(400).send('Invalid d_id value');
  }

  const query = 'SELECT * FROM bookings WHERE d_id = ? AND status = ?';
  console.log(`Executing query: ${query} with values [${d_id}, ${status}]`);

  db.query(query, [d_id, status], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).send('Server error');
    }
    console.log('Query results:', results); // Log results
    return res.status(200).json(results);
  });
});







// Fetch all messages
app.get('/api/chat', (req, res) => {
  const sql = `
    SELECT m.id, m.message, m.created_at, u.name as userName
    FROM messages m
    JOIN users u ON m.userId = u.id
    ORDER BY m.created_at ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Error fetching messages' });
    }
    res.json(results);
  });
});

// Add a new message
app.post('/api/chat', (req, res) => {
  const { userId, message } = req.body;

  // Validate input
  if (!userId || !message) {
    return res.status(400).json({ error: 'User ID and message are required' });
  }

  const sql = 'INSERT INTO messages (userId, message) VALUES (?, ?)';
  db.query(sql, [userId, message], (err, result) => {
    if (err) {
      console.error('Error inserting message:', err);
      return res.status(500).json({ error: 'Error inserting message' });
    }
    res.status(201).json({ id: result.insertId });
  });
});



// API to handle route request submission
app.post('/api/route-request', (req, res) => {
  const { pickuplocation, dropofflocation } = req.body;

  if (!pickuplocation || !dropofflocation) {
    return res.status(400).send('Missing required fields');
  }

  const query = 'INSERT INTO routerequest (pickuplocation, dropofflocation) VALUES (?, ?)';
  db.query(query, [pickuplocation, dropofflocation], (err, result) => {
    if (err) {
      console.error('Error saving route request:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Route request saved successfully');
  });
});

app.get('/', (re, res) => {
  return res.json('scu app running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
