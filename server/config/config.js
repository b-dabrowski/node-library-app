const _ = require('lodash');
const devConfigProps = require('./development');
const testConfigProps = require('./testing');
const prodConfigProps = require('./production');

let envConfig = {};
const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'testSecret',
  },
  env: '',
  logging: true,
  seed: true,
  db: {
    url: 'mongodb://localhost:27017/nodelibrary',
  },
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

switch (config.env) {
  case config.dev:
    envConfig = devConfigProps;
    break;

  case config.test:
    envConfig = testConfigProps;
    break;

  case config.prod:
    envConfig = prodConfigProps;
    break;

  default:
    envConfig = devConfigProps;
    break;
}

module.exports = _.merge(config, envConfig);
