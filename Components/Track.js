// driver.js (Client-side)

const socket = io('http://localhost:3000'); // Connect to the server

const driverId = 'unique_driver_id'; // Unique identifier for the driver

// Register the driver with the server
socket.emit('registerDriver', driverId);

// Simulate driver location updates (in real-world scenario, you'd use the device's GPS)
setInterval(() => {
  const latitude = getRandomNumber(40, 41); // Example latitude range
  const longitude = getRandomNumber(-74, -73); // Example longitude range
  const location = { latitude, longitude };
  
  // Emit the updated location to the server
  socket.emit('driverLocationUpdate', { driverId, location });
}, 5000); // Update every 5 seconds

// Helper function to generate random numbers within a range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
