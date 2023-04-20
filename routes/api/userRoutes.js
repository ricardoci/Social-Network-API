const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  deleteUser,
  getFriend,
  addFriend,
  deleteFriend,

} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends').get(getFriend).post(addFriend);
router.route('/:userId/friends/:friendsId').delete(deleteFriend);


module.exports = router;
