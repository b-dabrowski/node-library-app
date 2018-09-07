const express = require('express');
const customErrors = require('./util/customErrors');
const config = require('./config/config');
const logger = require('./util/logger');
const addGlobalMiddleware = require('./middleware/appMiddleware');
const api = require('./api/api');
const auth = require('./auth/authRoutes');
const mongoose = require('mongoose');

const dbPromise = mongoose.connect(config.db.url, {
  useMongoClient: true,
});

dbPromise.then((db) => {
  db.model();
});

if (config.seed) {
  require('./util/seed');
}

const app = express();

addGlobalMiddleware(app);

app.use(express.static(`${__dirname}/client`));
app.use('/api', api);
app.use('/auth', auth);

app.use((err, req, res, next) => {
  if (err.name === customErrors.headers.UnauthorizedError) {
    res.status(401).send(customErrors.messages.invalidToken);
    return;
  }

  logger.error(err);
  res.status(500).json({
    errors: {
        'error': [customErrors.messages.somethingWentWrong]
    }
  });
});

module.exports = app;
