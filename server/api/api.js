const router = require('express').Router();
const categoryRouter = require('./category/categoryRoutes');
const authorRouter = require('./author/authorRoutes');
const bookRouter = require('./book/bookRoutes');

router.use('/categories', categoryRouter);
router.use('/authors', authorRouter);
router.use('/books', bookRouter);

module.exports = router;
