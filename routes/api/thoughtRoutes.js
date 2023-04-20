const router = require('express').Router();
const {
  getSingleThought,
  getThought,
  createThought,
  deleteThought,
  deleteReaction,
  getReaction,
  addReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

router.route('/:thoughtId/reactions').get(getReaction).post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;

