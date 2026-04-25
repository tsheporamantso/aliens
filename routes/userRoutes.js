const express = require('express');
const { authenticateUser } = require('../middleware/authentication');
const authorizePermission = require('../middleware/authorizePermissions');

const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/usersController');

router
  .route('/')
  .get(authenticateUser, authorizePermission('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
