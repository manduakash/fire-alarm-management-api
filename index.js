const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 9828;
require('dotenv').config();
const dns = require('dns');
// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const apiRoutes = require('./src/routes/api');
const panelRoutes = require('./src/routes/panelRoutes');

app.get('/dns-test', (req, res) => {
  dns.resolveSrv('_mongodb._tcp.cluster0.mongodb.net', (err, addresses) => {
    if (err) {
      res.status(500).send(`DNS resolution error: ${err.message}`);
    } else {
      res.send(`DNS resolution successful: ${JSON.stringify(addresses)}`);
    }
  });
});
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
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
