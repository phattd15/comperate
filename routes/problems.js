const Problem = require('../models/Problem');

const problemController = require('../controllers/problemController');
const authController = require('../controllers/authController');
const authTk = require('../util/authTk')

const router = require('express').Router();

router.post('/all', problemController.getProblems);
router.post('/vote', authTk, problemController.vote);

module.exports = router;