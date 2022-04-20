const Problem = require('../models/Problem');

const problemController = require('../controllers/problemController');

const router = require('express').Router();

router.get('/all', problemController.getProblems);
router.post('/vote', problemController.vote);
router.get('/voted', problemController.getVotedList);

module.exports = router;