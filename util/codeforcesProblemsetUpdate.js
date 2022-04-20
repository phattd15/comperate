const axios = require('axios');
const Problem = require('../models/Problem');
const helper = require('./helper');
// const ratingFetcher = (username, site) => {

// }

async function codeforcesProblemsetUpdate(threshold = -1){
  let request = await axios.get(`https://codeforces.com/api/problemset.problems`);
  
  let data = request.data;
  if (data.status !== 'OK') {
    console.log("Codeforces API is down.");
    return;
  }
  let prob = data.result.problems;
  if (threshold == -1 || threshold > prob.length) {
    threshold = prob.length;
  }
  let updatedCount = 0;
  for (let i = 0; i < threshold; i++) {
    if ('rating' in prob[i] && prob[i].type == 'PROGRAMMING') {
      // check index
      if (!isNaN(prob[i].index)) {
        continue;
      }
      try {
        let tags = [], drop = false;
        for (let tag of prob[i].tags) {
          if (helper.isValidTag(tag)) {
            tags.push(tag);
            if (tag == "*special") {
              drop = true;
              break;
            }
          }
        }
        if (!drop) {
          const oldProblem = await Problem.findOne({siteId: String(prob[i].contestId) + prob[i].index}).exec();
          if (oldProblem) {
            // started hitting old problems
            break;
          }
          const newProblem = new Problem({
            site: 'CF',
            siteId: String(prob[i].contestId) + prob[i].index,
            name: prob[i].name,
            rating: prob[i].rating,
            tags: tags
          });
          // console.log(tags);
          const problem = await newProblem.save();
          console.log(problem);
          updatedCount++;
          console.log(`Updated ${updatedCount}th record.`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  console.log(`Finished updating on Codeforces. ${updatedCount} records.`);
};

module.exports = codeforcesProblemsetUpdate;