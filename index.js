const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 9828;
require('dotenv').config();
const dns = require('dns');
const jwt = require('jsonwebtoken');
const User = require("./src/models/userModel");

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
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

// Middleware to authenticate user
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({status: 1, message: 'You are unauthorized', data: null });
  }
};

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/panel', panelRoutes);
app.use('/api/user', auth, userRoutes);

// Define a route
app.get('/', (req, res) => {
  res.send('Fire Alarm Management System is Online...!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});