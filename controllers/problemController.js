const User = require('../models/User');
const Problem = require('../models/Problem');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('../util/helper');
const codeforcesProblemsetUpdate = require('../util/codeforcesProblemsetUpdate');

const problemController = {
  getProblems: async (req, res) => {
    try {
      let upperBound = req.body.upperBound || 9999;
      let lowerBound = req.body.lowerBound || 0;
      let pageSize = req.body.pageSize || 50;
      let page = req.body.page || 1;
      let sortedBy = req.body.sortedBy || "";
      if (page < 1) {
        page = 1;
      }
      let filter = { rating: {$gte: lowerBound, $lte: upperBound}};
      if (req.body.site) {
        filter.site = req.body.site;
      }
      Problem
        .find(filter)
        .sort(sortedBy)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, docs) => {
          if (err) {
            res.status(200).json({
              success: false,
              message: err
            });
          } else {
            res.status(200).json({
              success: true,
              message: "Problem successfully fetched",
              data: docs
            });
          }
      })
    } catch(err) {
      res.status(200).json({
        success: false,
        message: err
      })
    }
  },
  
  vote: async (req, res) => {
    const {username, site, siteId, score} = req.body;
    let user = await User.findOne({username}).exec();

    if (!user) {
      res.status(200).json({
        success: false,
        message: "User does not exist"
      });
      return;
    }
    try {
      let problem = await Problem.findOne({ siteId }).exec();
      if (!problem) {
        res.status(200).json({
          success: false,
          message: "No such problem found in the database"
        });
        return; 
      }
      let problemCode = siteId;
      if (user.votes.has(problemCode)) {
        let oldScore = user.votes.get(problemCode);
        problem.score += (score - oldScore) * helper.voteWeight(user.rating);
        problem.rate = problem.score / problem.totalVotes;

        user.votes.set(problemCode, score);
      } else {
        user.votes.set(problemCode, score);
        user.totalVotes++;

        problem.totalVotes += helper.voteWeight(user.rating);
        problem.score += score * helper.voteWeight(user.rating);
        problem.rate = problem.score / problem.totalVotes;
      }
      
      let resUser = await user.save();
      let resProb = await problem.save();

      res.status(200).json({
        success: true,
        message: "Successfully updated",
        user: resUser,
        problem: resProb
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: err
      });
    }
  },

  getVotedList: async (req, res) => {
    try {
      const {username} = req.body;
      let user = await User.findOne({username}).exec();

      if (!user) {
        res.status(200).json({
          success: false,
          message: "User does not exist"
        });
        return;
      }

      res.status(200).json({
        success: true,
        voted: user.votes
      });
    } catch(err) {
      res.status(200).json({
        success: false,
        message: err
      })
    }
  }
}


module.exports = problemController;
