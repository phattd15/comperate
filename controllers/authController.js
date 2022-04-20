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
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      
      const newUser = new User({
        username: req.body.username,
        password: hashedPass
      });
      const user = await newUser.save();
      res.status(200).json({
        success: true,
        message: "Logged in successfully"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err
      });
    }
  },

  login: async (req, res) => {
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
  
      const validated = await bcrypt.compare(req.body.password, user.password);
  
      if (!validated) {
        res.status(400).json({
          success:false,
          message: "Wrong password."
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err
      });
    }
  },

  test: async (req, res) => {
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    // res.status(200).json(process.env.ACCESS_TOKEN_SECRET);
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