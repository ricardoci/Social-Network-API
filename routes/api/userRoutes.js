const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;
