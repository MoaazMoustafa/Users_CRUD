const mongoose = require('mongoose');

const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const util = require('util');
// TODO
const jwtVerify = util.promisify(jwt.verify);
const config = require('../config');

const loginHistorySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  loginHistory: [loginHistorySchema],
});

userSchema.pre('save', function () {
  const currentDocument = this;
  if (currentDocument.loginHistory.length > 10) {
    currentDocument.loginHistory.shift();
  }
});

userSchema.statics.getUserFromToken = async function (token) {
  try {
    const User = this;
    const { userId } = await jwtVerify(token, config.JWT_SECRET_KEY);
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    return console.log(err);
  }
};

module.exports = mongoose.model('User', userSchema);
