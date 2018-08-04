const router = require('express').Router();
const categoryRouter = require('./category/categoryRoutes');
const authorRouter = require('./author/authorRoutes');
const bookRouter = require('./book/bookRoutes');
const userRouter = require('./user/userRoutes');

router.use('/categories', categoryRouter);
router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/users', userRouter);

module.exports = router;
