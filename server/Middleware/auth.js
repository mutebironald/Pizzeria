const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

  try {
    const token =
    req.body.authorization || req.query.authorization ||req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("A valid Token is required");
  }
  return next();
};

module.exports = verifyToken;
