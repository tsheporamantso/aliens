const asyncWrapper = require('../middleware/async');
const StatusCodes = require('http-status-codes');

const register = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'register user' });
});

const login = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'login user' });
});

module.exports = {
  register,
  login,
};
