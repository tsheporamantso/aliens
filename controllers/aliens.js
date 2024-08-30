const Alien = require('../models/alien');

const getAllAliens = async (req, res) => {
  try {
    const aliens = await Alien.find({});
    res.status(200).json({ aliens });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createAlien = async (req, res) => {
  try {
    const alien = await Alien.create(req.body);
    res.status(201).json({ alien });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAlien = async (req, res) => {
  try {
    const { id: alienID } = req.params;
    const alien = await Alien.findOne({ _id: alienID });
    if (alien) {
      res.status(201).json({ alien });
    } else {
      res.status(404).json({ msg: `No alien with id: ${alienID}` });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateAlien = async (req, res) => {
  try {
    const { id: alienID } = req.params;
    const { body } = req;
    const alien = await Alien.findOneAndUpdate({ _id: alienID }, body, {
      new: true,
      runValidators: true,
    });
    if (alien) {
      res.status(201).json({ alien });
    } else {
      res.status(404).json({ msg: `No alien with id: ${alienID}` });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteAlien = async (req, res) => {
  try {
    const { id: alienID } = req.params;
    const alien = await Alien.findOneAndDelete({ _id: alienID });
    if (alien) {
      res.status(201).json({ alien });
    } else {
      res.status(404).json({ msg: `No alien with id: ${alienID}` });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllAliens,
  createAlien,
  getAlien,
  updateAlien,
  deleteAlien,
};
