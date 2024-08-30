const Alien = require('../models/alien');
const asyncWrapper = require('../middleware/async');

const getAllAliens = asyncWrapper(async (req, res) => {
  const aliens = await Alien.find({});
  res.status(200).json({ aliens });
});

const createAlien = asyncWrapper(async (req, res) => {
  const alien = await Alien.create(req.body);
  res.status(201).json({ alien });
});

const getAlien = asyncWrapper(async (req, res) => {
  const { id: alienID } = req.params;
  const alien = await Alien.findOne({ _id: alienID });
  if (alien) {
    res.status(200).json({ alien });
  } else {
    res.status(404).json({ msg: `No alien with id: ${alienID}` });
  }
});

const updateAlien = asyncWrapper(async (req, res) => {
  const { id: alienID } = req.params;
  const { body } = req;
  const alien = await Alien.findOneAndUpdate({ _id: alienID }, body, {
    new: true,
    runValidators: true,
  });
  if (alien) {
    res.status(200).json({ alien });
  } else {
    res.status(404).json({ msg: `No alien with id: ${alienID}` });
  }
});

const deleteAlien = asyncWrapper(async (req, res) => {
  const { id: alienID } = req.params;
  const alien = await Alien.findOneAndDelete({ _id: alienID });
  if (alien) {
    res.status(200).json({ alien });
  } else {
    res.status(404).json({ msg: `No alien with id: ${alienID}` });
  }
});

module.exports = {
  getAllAliens,
  createAlien,
  getAlien,
  updateAlien,
  deleteAlien,
};
