const getAllAliens = (req, res) => {
  res.status(200).json({ msg: 'Get all aliens' });
};

const createAlien = (req, res) => {
  const alien = req.body;
  res.status(200).json({ alien });
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
