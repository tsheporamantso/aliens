const Alien = require('../models/alien');
const asyncWrapper = require('../middleware/async');
const StatusCodes = require('http-status-codes');
const NotFoundError = require('../errors/not-found');

const getAllAliens = asyncWrapper(async (req, res) => {
  const aliens = await Alien.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ aliens });
});

const createAlien = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const alien = await Alien.create(req.body);

  res.status(StatusCodes.CREATED).json({ alien });
});

const getAlien = asyncWrapper(async (req, res) => {
  const { id: alienId } = req.params;

  const alien = await Alien.findOne({
    _id: alienId,
    createdBy: req.user.userId,
  });

  if (!alien) {
    throw new NotFoundError(`No alien with id: ${alienId}`);
  }
  res.status(StatusCodes.OK).json({ alien });
});

const updateAlien = asyncWrapper(async (req, res) => {
  const { id: alienId } = req.params;

  const alien = await Alien.findOneAndUpdate(
    { _id: alienId, createdBy: req.user.userId },
    req.body,
    { returnDocument: 'after', runValidators: true },
  );

  if (!alien) {
    throw new NotFoundError(`No alien with id ${alienId}`);
  }

  res.status(StatusCodes.OK).json({ alien });
});

const deleteAlien = asyncWrapper(async (req, res) => {
  const { id: alienId } = req.params;

  const alien = await Alien.findOneAndDelete({
    _id: alienId,
    createdBy: req.user.userId,
  });

  if (!alien) {
    throw new NotFoundError(`No alien with id ${alienId}`);
  }

  res.status(StatusCodes.OK).json({
    msg: 'Alien deleted successfully.',
  });
});

module.exports = {
  getAllAliens,
  createAlien,
  getAlien,
  updateAlien,
  deleteAlien,
};
