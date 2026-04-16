const asyncWrapper = require('../middleware/async');
const StatusCodes = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
});

const login = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'login user' });
});

module.exports = {
  register,
  login,
};
