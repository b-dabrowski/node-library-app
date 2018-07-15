const morgan = require('morgan');
const bodyParser = require('body-parser');
const override = require('method-override');

module.exports = function (app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(override());
};
