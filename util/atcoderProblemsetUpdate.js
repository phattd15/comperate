const axios = require('axios');
const Problem = require('../models/Problem');
const helper = require('./helper');

const fetch = require("node-fetch");

function correctLowerRating(rating) {
  if (rating >= 400) return rating;
  return Math.floor(400 / Math.exp((400 - rating) / 400));
}

async function updateAtcoderProblemset() {
  let probDiff = await (await fetch('https://kenkoooo.com/atcoder/resources/problem-models.json')).json();
  let probData = await (await fetch('https://kenkoooo.com/atcoder/resources/problems.json')).json(); 
  // console.log(obj.keys())
  let cnt = 0;
  let allProblem = await Problem.find({site: 'AC'}).exec();
  let problemExist = new Map();
  for (let problem of allProblem) {
    problemExist[problem.siteId] = true;
  }
  for (let k of probData) {
    if (probDiff[k.id]) {
      if (probDiff[k.id].is_experimental === false && probDiff[k.id].difficulty !== undefined) {
        if (problemExist[k.id]) {
          continue;
        }
        // LGTM
        // if (threshold !== -1) {
        //   let existProb = Problem.findOne({siteId: k.id}).exec();
        // }
        let problem = new Problem({
          site: 'AC',
          siteId: k.id,
          name: k.name,
          contestId: k.contest_id,
          rating: helper.ratingMapping('AC', correctLowerRating(probDiff[k.id].difficulty))
        });
        cnt++;
        let prb = await problem.save();
        console.log(`Updated ${cnt} atcoder records`);
      }
    }
  }
  // console.log(obj['axs']);

};

module.exports = updateAtcoderProblemset;