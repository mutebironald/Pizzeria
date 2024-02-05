const jwt = require("jsonwebtoken");
const redis = require('redis');

const config = process.env;
const redisClient = require('./redis')

const verifyToken = async(req, res, next) => {

  try {
    const token =
    req.body.authorization || req.query.authorization ||req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(token, config.SECRET_KEY);

    const isTokenValid = await checkTokenInRedis(decoded.userId, token);

    if(!isTokenValid){
      return res.status(401).send("Invalid Token");
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("A valid Token is required");
  }
  return next();
};

const checkTokenInRedis = async(userId, token) => {
  return new Promise((resolve, reject) => {
    redisClient.get(userId.toString(), (err, storedToken) => {
      if(err){
        reject(err);
      } else{
        resolve(token === storedToken)
      }

    })
  })
};

module.exports = verifyToken;
