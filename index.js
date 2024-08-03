const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 9828;
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const apiRoutes = require('./src/routes/api');
const panelRoutes = require('./src/routes/panelRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/akash-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Use routes
app.use('/api', apiRoutes);
app.use('/api/panel', panelRoutes);

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
