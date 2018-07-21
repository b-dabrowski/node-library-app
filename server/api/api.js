const router = require('express').Router();
const categoryRouter = require('./category/categoryRoutes');

router.use('/categories', categoryRouter);

module.exports = router;
