const User = require('../models/User');
const Problem = require('../models/Problem');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('../util/helper');
const codeforcesProblemsetUpdate = require('../util/codeforcesProblemsetUpdate');
const verify = require('../util/verify');
const fetchRating = require('../util/fetchRating');

const userController = {
  updateProfile: async (req, res) => {
    try {
      let site = req.body.site;
      let target = req.body.target;

      const user = await User.findOne({
        username: req.body.username
      });
  
      if (!user) {
        res.status(400).json({
          success: false,
          message: "User does not exist in the database."
        });
        return;
      }

      let result = await verify(site, user, target);
      let newRating = await fetchRating(site, target);

      if (result && newRating !== null) {
        if (site == 'AC') {
          user.atcoder.username = target;
          user.atcoder.rating = newRating;
        }
        if (site == 'CF') {
          user.codeforces.username = target;
          user.codeforces.rating = newRating;
        }
        if (site == 'CC') {
          user.codechef.username = target;
          user.codechef.rating = newRating;
        }
        let newPeak = helper.calculatePeakRating(user);
        // THIS ASONBFKJLAS
        if (user.rating !== newPeak) {
          if (helper.voteWeight(user.rating) !== helper.voteWeight(newPeak)) {
            let delta = helper.voteWeight(newPeak) - helper.voteWeight(user.rating);
            for (let key of user.votes.keys()) {
              let site = key.slice(0, 2);
              let siteId = key.slice(2, key.length);
              let problem = await Problem.findOne({site, siteId});
              problem.score += delta * user.votes.get(key);
              await problem.save();
            }
          }
          user.rating = newPeak;
        }
        // HOOLASGOFASOIPK
        let resUser = await user.save();
        res.status(200).json({
          success: true,
          message: "User updated",
          user: resUser
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Fail to verify the account"
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err
      });
    }
  },

  updateLatestRating: async (req, res) => {
    try {

      const user = await User.findOne({
        username: req.body.username
      });
  
      if (!user) {
        res.status(400).json({
          success: false,
          message: "User does not exist in the database."
        });
        return;
      }
      
      if (user.atcoder.username !== "Not added") {
        let siteRating = await fetchRating("AC", user.atcoder.username);
        if (siteRating !== null) {
          user.atcoder.rating = siteRating;
        }
      }

      if (user.codeforces.username !== "Not added") {
        let siteRating = await fetchRating("CF", user.codeforces.username);
        if (siteRating !== null) {
          user.codeforces.rating = siteRating;
        }
      }

      if (user.codechef.username !== "Not added") {
        let siteRating = await fetchRating("CC", user.codechef.username);
        if (siteRating !== null) {
          user.codechef.rating = siteRating;
        }
      }


      let newPeak = helper.calculatePeakRating(user);
      // THIS ASONBFKJLAS
      if (user.rating !== newPeak) {
        console.log(helper.voteWeight(user.rating), helper.voteWeight(newPeak))
        if (helper.voteWeight(user.rating) !== helper.voteWeight(newPeak)) {
          let delta = helper.voteWeight(newPeak) - helper.voteWeight(user.rating);
          for (let key of user.votes.keys()) {
            let site = key.slice(0, 2);
            let siteId = key.slice(2, key.length);
            let problem = await Problem.findOne({site, siteId});
            problem.score += delta * user.votes.get(key);
            await problem.save();
          }
        }
        user.rating = newPeak;
      }
      let resUser = await user.save();
      res.status(200).json({
        success: true,
        message: "User updated",
        user: resUser
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err
      });
    }
  }
};

module.exports = userController;