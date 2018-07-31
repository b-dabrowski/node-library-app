const router = require('express').Router();
const categoryRouter = require('./category/categoryRoutes');
const authorRouter = require('./author/authorRoutes');

router.use('/categories', categoryRouter);
router.use('/authors', authorRouter);

module.exports = router;
