const router = require('express').Router();
const postRoutes = require('./postRoutes');
const tagRoutes = require('./tagRoutes');
const userRoutes = require('./userRoutes');

router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);
router.use('/users', userRoutes);

module.exports = router;
