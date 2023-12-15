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
// app.use("/uploads",express.static('uploads'));

// //Routes

// const admin = require('./Routes/adminRoutes')
// const chat =require('./Routes/chatRoutes')
// const nursery=require('./Routes/nurseryRoutes')
// const order=require('./Routes/orderRoutes')
// const payment=require('./Routes/paymentsRoutes')
// const plant=require('./Routes/plantRoutes')
// const user=require('./Routes/userRoutes')
// const Dasboard=require('./Controllers/DashboardController')
// const Cart =require('./Routes/Cart')

//Routes Trackttps://www.thunderclient.com/welcome

// app.use('/admin',admin)
// app.use('/chat', chat)
// app.use('/nursery',nursery)
// app.use('/order',order)
// app.use('/payment', payment)
// app.use('/plant',plant)
// app.use('/dashboard',Dasboard)
// app.use('/cart',Cart)

// app.use('/user',user)

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
