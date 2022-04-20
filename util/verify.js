const apiCall = require('./apiCall');
const fetch = require("node-fetch");

const codeforcesVerifyAPI = async (user, codeforcesUsername) => {
  let expectedString = "@#@" + user.username + "@#@";
  let data = await apiCall.codeforcesCall("https://codeforces.com/api/user.info?handles=" + codeforcesUsername);
  if (!data) {
    return false;
  }
  try {
    return data[0]['firstName'] === expectedString;
  } catch (err) {
    return false;
  }
};

const codeforcesVerifyScrape = async (user, username) => {
  const getRawData = (URL) => {
    return fetch(URL)
       .then((response) => response.text())
       .then((data) => {
          return data;
       });
 };
  const data = await getRawData(`https://codeforces.com/profile/${username}`);
  return data.includes("@#@" + user.username + "@#@")
};

const codeforcesVerify = async (user, username) => {
  let verifyAPI = await codeforcesVerifyAPI(user, username);
  if (verifyAPI) {
    return true;
  }
  let verifyScrape = await codeforcesVerifyScrape(user, username);
  return verifyScrape;
}

const atcoderVerify = async (user, username) => {
  const getRawData = (URL) => {
    return fetch(URL)
       .then((response) => response.text())
       .then((data) => {
          return data;
       });
 };
  const data = await getRawData(`https://atcoder.jp/users/${username}?lang=en`);
  return data.includes("@#@" + user.username + "@#@")
};

const codechefVerify = async (user, username) => {
  const getRawData = (URL) => {
    return fetch(URL)
       .then((response) => response.text())
       .then((data) => {
          return data;
       });
 };
  const data = await getRawData(`https://www.codechef.com/users/${username}`);
  return data.includes("@#@" + user.username + "@#@")
};

const verify = async (site, user, username) => {
  if (site == 'AC') {
    return await atcoderVerify(user, username);
  } else if (site == 'CC') {
    return await codechefVerify(user, username);
  } else if (site == 'CF') {
    return await codeforcesVerify(user, username);
  } else {
    return false;
  }
}

module.exports = verify;

