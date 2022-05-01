const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const authTk = require('../util/authTk')
const authController = require('../controllers/authController');

router.post("/register", authController.register);

router.post('/login', authController.login);

router.post('/recover', authController.recover);
// Test
// router.post('/test', authController.test);
module.exports = router;