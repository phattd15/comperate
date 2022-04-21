const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authTk = require('../util/authTk')

// Register
router.post("/updateProfile/", authTk, userController.updateProfile);

router.post("/updateRating/", authTk, userController.updateLatestRating);

router.post("/fetch", authTk, userController.fetchUser)

module.exports = router;