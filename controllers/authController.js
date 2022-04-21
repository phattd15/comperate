const User = require('../models/User');
const Problem = require('../models/Problem');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const atcoderPr = require('../util/atcoderProblemsetUpdate');
const userController = require('./userController');
const dotenv = require('dotenv');
const codeforcesProblemsetUpdate = require('../util/codeforcesProblemsetUpdate');
dotenv.config({ path: process.cwd() + '../.env' });

const authController = {
  register: async (req, res) => {
    console.log(req.body);
    try {
      const checkUser = await User.findOne({username: req.body.username}).exec();
      if (checkUser) {
        res.json({
          success: false,
          message: "This user already registered in the database."
        });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      
      const newUser = new User({
        username: req.body.username,
        password: hashedPass
      });
      const user = await newUser.save();
      res.json({
        success: true,
        message: "Registered successfully"
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Your request failed for a random reason"
      });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.body.username
      });
  
      if (!user) {
        res.json({
          success: false,
          message: "User does not exist in the database."
        });
        return;
      }
  
      const validated = await bcrypt.compare(req.body.password, user.password);
  
      if (!validated) {
        res.json({
          success: false,
          message: "Wrong password."
        });
        return;
      }
  
      res.json({
        success: true,
        message: "Logged in successfully",
        user,
        token: jwt.sign({
          username: user.username
        }, process.env.ACCESS_TOKEN_SECRET, {
          'expiresIn': '7d'
        })
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Your request failed for a random reason"
      });
    }
  },


  test: async (req, res) => {
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    // res.json(process.env.ACCESS_TOKEN_SECRET);
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    atcoderPr();//
    codeforcesProblemsetUpdate();
    // await Problem.deleteMany({site: 'AC'}).then(() => {
    //   console.log("DELT");
    // }).catch((err) => {
    //   console.log("err", err);
    // })
  }
}

module.exports = authController;