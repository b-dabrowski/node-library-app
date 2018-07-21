const express = require('express');
const customErrors = require('./util/customErrors');
const config = require('./config/config');
const logger = require('./util/logger');
const addGlobalMiddleware = require('./middleware/appMiddleware');
const api = require('./api/api');

const app = express();

addGlobalMiddleware(app);

app.use('/api', api);

app.use((err, req, res, next) => {
  if (err.name === customErrors.headers.UnauthorizedError) {
    res.status(401).send(customErrors.messages.invalidToken);
    return;
  }

  logger.error(err);
  res.status(500).send(customErrors.messages.somethingWentWrong);
});

module.exports = app;
