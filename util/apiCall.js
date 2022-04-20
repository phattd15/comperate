const axios = require('axios');
const fetch = require("node-fetch");

const codeforcesCall = async (url) => {
  try {
    let request = await axios.get(url);
    if (request.data.status == 'OK') {
      return request.data.result;
    } else {
      console.log("Codeforces API down");
      return null;
    }
  } catch (err) {
    console.log("Codeforces API down");
    return null;
  }
};

const scrape = async (URL) => {
  return fetch(URL)
       .then((response) => response.text())
       .then((data) => {
          return data;
       });
}

module.exports = {codeforcesCall, scrape};