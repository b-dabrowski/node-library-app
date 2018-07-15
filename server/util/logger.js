require('colors');
// const _ = require('lodash');
const config = require('../config/config');

const dontLog = function () {};
const consoleLog = config.logging ? console.log.bind(console) : dontLog;

const logger = {
  log(...args) {
    const tag = '[LOG]'.green;
    const logMsg = args
      .map((arg) => {
        if (typeof arg === 'object') {
          const jsonObjToLog = JSON.stringify(arg, null, 2);
          return `${tag} ${jsonObjToLog.cyan}\n`;
        }
        return `${tag} ${arg.cyan}\n`;
      });

    consoleLog.apply(console, logMsg);
  },
  error(...args) {
    const errorMsg = args
      .map((error) => {
        const errorInfo = error.stack || error;
        const name = errorInfo.name || '[ERROR]';
        const err = `${name.yellow} ${errorInfo.red}`;
        return err;
      });

    consoleLog.apply(console, errorMsg);
  },
};

module.exports = logger;
