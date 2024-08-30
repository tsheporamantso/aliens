const Alien = require('../models/alien');

const getAllAliens = (req, res) => {
  res.status(200).json({ msg: 'Get all aliens' });
};

const createAlien = async (req, res) => {
  try {
    const alien = await Alien.create(req.body);
    res.status(201).json({ alien });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAlien = (req, res) => {
  const { id: alien } = req.params;
  res.status(200).json({ msg: 'Get a single alien', alien });
};

const updateAlien = (req, res) => {
  res.status(200).json({ msg: 'Alien updated' });
};

const deleteAlien = (req, res) => {
  res.status(200).json({ msg: 'Alien deleted' });
};

module.exports = {
  getAllAliens,
  createAlien,
  getAlien,
  updateAlien,
  deleteAlien,
};
