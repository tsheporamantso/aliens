const StatusCodes = require('http-status-codes');
const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');
const attachCookiesToResponse = require('../utils/cookies');

const register = asyncWrapper(async (req, res) => {
  // first registered user will be admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ ...req.body, role });
  const token = user.createJWT();

  attachCookiesToResponse(res, token);

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name.charAt(0).toUpperCase() + user.name.slice(1),
      role: user.role,
    },
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid credential');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credential');
  }

  const token = user.createJWT();

  attachCookiesToResponse(res, token);

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, role: user.role } });
});

module.exports = {
  register,
  login,
};
