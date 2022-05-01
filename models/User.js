const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: "x@y.z"
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  atcoder: {
    username: {
      type: String,
      default: "Not added"
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  codeforces: {
    username: {
      type: String,
      default: "Not added"
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  codechef: {
    username: {
      type: String,
      default: "Not added"
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  votes: {
    type: Map,
    of: Number,
    default: {}
  },
  totalVotes: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
}, {
  autoIndex: false
});

module.exports = mongoose.model('User', UserSchema);