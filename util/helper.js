const tagList = [
  "dp", "graphs", "greedy", "math", "constructive algorithms", "data structures", "strings", "trees"
];

// const tagFormat = (tag) => {
//   if (tag === "dynamic-programming" || tag == "dp") {
//     return "dp";
//   }
//   // if (tag === )
// }

const isValidTag = (tag) => {
  for (let tarTag of tagList) {
    if (tag === tarTag) {
      return true;
    }
  }
  return false;
};

const voteWeight = (rating) => {
  if (rating <= 1200) {
    return 1;
  } else if (rating <= 1600) {
    return 2;
  } else if (rating <= 1900) {
    return 3;
  } else if (rating <= 2400) {
    return 4;
  } else {
    return 5;
  }
};

const ratingMapping = (ratingName, rating) => {
  // to be calculated
  if (ratingName == "AC") {
    if (rating <= 646) {
      return Math.floor(1200 * rating / 646);
    } else if (rating <= 910) {
      return 1200 + Math.floor(200 * (rating - 646) / (910 - 646));
    } else if (rating <= 1174) {
      return 1400 + Math.floor(200 * (rating - 910) / (1174 - 910));
    } else if (rating <= 1571) {
      return 1600 + Math.floor(300 * (rating - 1174) / (1571 - 1174));
    } else if (rating <= 1835) {
      return 1900 + Math.floor(200 * (rating - 1571) / (1835 - 1571));
    } else if (rating <= 2232) {
      return 2100 + Math.floor(300 * (rating - 1835) / (2232 - 1835));
    } else if (rating <= 2496) {
      return 2400 + Math.floor(200 * (rating - 2232) / (2496 - 2232));
    } else if (rating <= 3025) {
      return 2600 + Math.floor(200 * (rating - 2496) / (3025 - 2496));
    } else if (rating <= 4082) {
      return 3000 + Math.floor(800 * (rating - 3025) / (4082 - 3025));
    } else {
      return 3850;
    }
  }

  const gapper = (l1, r1, l2, r2, x2) => {
    return l1 + Math.floor((r1 - l1) * (x2 - l2) / (r2 - l2));
  };
  if (ratingName == "CC") {
    if (rating >= 3700) {
      // tourist
      return 3500;
    }
    if (rating <= 3800 && rating >= 3100) {
      return gapper(3000, 3500, 3100, 3700, rating);
    }
    if (rating <= 3100 && rating >= 2800) {
      return gapper(2600, 3000, 2800, 3100, rating);
    }
    if (rating <= 2800 && rating >= 2400) {
      return gapper(2000, 2600, 2400, 2800, rating);
    }
    if (rating <= 2400 && rating >= 2250) {
      return gapper(1800, 2000, 2250, 2400, rating);
    }
    if (rating >= 1800 && rating <= 2250) {
      return gapper(1400, 1800, 1800, 2250, rating);
    }
    if (rating <= 1800) {
      return gapper(500, 1400, 0, 1800, rating);
    }
  }
  if (ratingName === "CCUSER") {
    if (rating >= 3400) {
      // tourist
      return 3800;
    }
    if (rating <= 3100 && rating >= 2800) {
      return gapper(2900, 3400, 2800, 3100, rating);
    }
    if (rating <= 2800 && rating >= 2400) {
      return gapper(2500, 2900, 2400, 2800, rating);
    }
    if (rating <= 2400 && rating >= 2250) {
      return gapper(2100, 2500, 2250, 2400, rating);
    }
    if (rating >= 1800 && rating <= 2250) {
      return gapper(1400, 2100, 1800, 2250, rating);
    }
    if (rating <= 1800) {
      return gapper(500, 1400, 0, 1800, rating);
    }
  }
  // 3700+ -> 
  // 3000-4000 == 2700-3400
  // 2800->2700
  // 2600-> 2300
  // 2200-> 1800

  return rating;
};

const calculatePeakRating = (user) => {
  let ratings = [ratingMapping("AC", user.atcoder.rating), user.codeforces.rating,ratingMapping("CCUSER", user.codechef.rating)];
  ratings.sort((x, y) => (x - y));
  let rating = ratings[2] + Math.floor(50 * ratings[0] / 4000) + Math.floor(50 * ratings[1] / 4000);
  return rating;
};


module.exports = {tagList, isValidTag, voteWeight, calculatePeakRating, ratingMapping};