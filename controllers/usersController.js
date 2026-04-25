const User = require('../models/User');
const CustomError = require('../errors');
const StatusCodes = require('http-status-codes');
const asyncWrapper = require('../middleware/async');
const attachCookiesToResponse = require('../utils/cookies');
const checkPermission = require('../utils/checkPermission');

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
});

const getSingleUser = asyncWrapper(async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select('-password');

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  checkPermission(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
});

const showCurrentUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
});

const updateUser = asyncWrapper(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequestError('Please provide both name and email');
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  const token = user.createJWT();
  attachCookiesToResponse(res, token);

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const updateUserPassword = asyncWrapper(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }

  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Password updated' });
});

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
