const apiCall = require('./apiCall');

const fetchRatingCodeforcesAPI = async (username) => {
  let data = await apiCall.codeforcesCall("https://codeforces.com/api/user.info?handles=" + username);

  if (!data) {
    return null;
  }

  return data[0]['rating'] || 0;
}

const fetchRatingCodeforcesScrape = async (username) => {
  let data = await apiCall.scrape("https://codeforces.com/profile/" + username);
  console.log(data);
}

const fetchRatingAtcoder = async (username) => {
  try {
    let data = await apiCall.scrape(`https://atcoder.jp/users/${username}?contestType=algo&lang=en`);
    let idx = data.indexOf('<th class="no-break">Rating</th>'); 
    if (idx == -1) {
      return 0;
    }
    // console.log(data.slice(idx, idx + 48));
    idx += 48;
    while (true) {
      if (data[idx] == '>') {
        idx++;
        break;
      }
      idx++;
    }
    let idx2 = idx;
    while (data[idx2] !== '<') {
      idx2++;
    } 
    return Number(data.slice(idx, idx2));
  } catch(err) {
    return null;
  }
}

const fetchRatingCodechef = async (username) => {
  try {
    let data = await apiCall.scrape(`https://www.codechef.com/users/${username}`);
    let idx = data.indexOf('<div class="rating-number">'); 
    if (idx == -1) {
      return 0;
    }
    idx += 27;
    let idx2 = idx;
    while (data[idx2] !== '<') {
      idx2++;
    } 
    return Number(data.slice(idx, idx2));
  } catch(err) {
    return null;
  }
}

const fetchRating = async (site, username) => {
  // with the premise that the data is correct
  if (site == 'AC') {
    return await fetchRatingAtcoder(username);
  }
  if (site == 'CC') {
    return await fetchRatingCodechef(username);
  }
  if (site == 'CF') {
    return await fetchRatingCodeforcesAPI(username);
  }
};

module.exports = fetchRating;
