const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verify(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("No token provided !");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json("Invalid token !");
    }
    req.user = decoded;
    console.log(req.user);
    next();
  });
}

module.exports = verify;
