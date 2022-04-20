const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');

// Register
router.post("/updateProfile/", userController.updateProfile);

router.post("/updateRating/", userController.updateLatestRating);

module.exports = router;