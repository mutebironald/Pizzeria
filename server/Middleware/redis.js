const redis = require('redis');
require('dotenv').config({path: '../.env'});

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'local',
  port: process.env.REDIS_PORT || 6379
})

module.exports = redisClient
