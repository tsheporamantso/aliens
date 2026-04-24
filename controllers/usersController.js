const StatusCodes = require('http-status-codes');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');
const asyncWrapper = require('../middleware/async');

const getAllUsers = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json('get all users');
});

const getSingleUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json('get a single users');
});

const showCurrentUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json('show current users');
});

const updateUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json('update user');
});

const updateUserPassword = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json('update user password');
});

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
