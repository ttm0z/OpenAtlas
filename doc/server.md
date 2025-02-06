2. File-by-File Breakdown
server.js

This file is responsible for setting up the server and listening on a specific port.

js

const app = require('./app');
const config = require('./config/config');

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.js

This is the core of the Express app. It sets up middleware, routes, error handling, etc.

js

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middleware for parsing request bodies
app.use(express.json());

// Middleware for authentication (example)
app.use(authMiddleware);

// Mount routes
app.use('/api/users', userRoutes);

// Error handling middleware (global)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

config/config.js

Configuration settings, such as environment variables or database connection settings.

js

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
};

routes/userRoutes.js

This file handles routing for the user-related endpoints, separating concerns from the main app logic.

js

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define routes for user operations
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);

module.exports = router;

controllers/userController.js

Controllers handle request and response logic, interacting with services for business logic.

js

const userService = require('../services/userService');

// Controller for user registration
exports.register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Controller for user login
exports.login = async (req, res, next) => {
  try {
    const token = await userService.authenticateUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Controller for fetching user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

services/userService.js

Services handle business logic and communicate with the database models. These are separated from the controller to keep the logic reusable and modular.

js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = new User({ ...userData, password: hashedPassword });
  return user.save();
};

// Authenticate user and return JWT token
exports.authenticateUser = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });
  if (!user || !await bcrypt.compare(loginData.password, user.password)) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Fetch user by ID
exports.getUserById = async (userId) => {
  return User.findById(userId);
};

middlewares/authMiddleware.js

Middleware can be used for tasks such as user authentication, request validation, or logging.

js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;

models/userModel.js

Models handle database interactions, representing the structure of the data.

js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);