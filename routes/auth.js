const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = require('../controllers/authController');

// Register
router.post("/register", authController.register);

// Login
router.post('/login', authController.login);

// Test
router.post('/test', authController.test);
module.exports = router;