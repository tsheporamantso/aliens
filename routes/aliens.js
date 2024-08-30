const express = require('express');
const {
  getAllAliens,
  getAlien,
  createAlien,
  updateAlien,
  deleteAlien,
} = require('../controllers/aliens');

const router = express.Router();

router.route('/').get(getAllAliens).post(createAlien);
router.route('/:id').get(getAlien).patch(updateAlien).delete(deleteAlien);
module.exports = router;
