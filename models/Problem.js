const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  site: {
    type: String,
    required: true
  },
  siteId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String]
  },
  score: {
    type: Number,
    default: 0
  },
  rate: {
    type: Number,
    default: 0
  },
  totalVotes: {
    type: Number,
    default: 0
  },
  contestId: {
    type: String
  }
}, {
  autoIndex: false
});

module.exports = mongoose.model('Problem', ProblemSchema);