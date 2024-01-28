/* eslint-disable no-shadow */
const redis = require('redis');
const User = require('../models/user');

const client = redis.createClient({ host: 'redis-server' });

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const err = new Error('Authorization required');
    err.statusCode = 401;
    throw err;
  }

  client.lrange('blackListTokens', 0, -1, (err, tokens) => {
    if (err) throw err;
    if (tokens.includes(authorization)) {
      const err = new Error('Authorization required');
      err.statusCode = 401;
      next(err);
    }
  });
  User.getUserFromToken(authorization)
    .then((user) => {
      if (!user) {
        const err = new Error('Un Aurhorized');
        err.statusCode = 401;
        throw err;
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(err);
    });
};
