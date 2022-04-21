const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.body.token;
  console.log(token, process.env.ACCESS_TOKEN_SECRET);
  try {
    let decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decode);
    if (decode.username) {
      req.body.username = decode.username;
      next();
    } else {
      res.json({
        success: false,
        message: "Invalid token"
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Invalid token"
    });
  }
}

module.exports = authenticateToken;