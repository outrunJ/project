/**
 * Created by outrun on 10/27/15.
 */

var log4js = require('log4js');

var delimiter = ' - ';

log4js.configure({
  appenders: [
    {type: 'console'}
  ],
  replaceConsole: true,
  levels: {
    console: 'INFO'
  }
});

var categories = {
  DEFAULT: 'default',
  WEB: 'web',
  MONGODB: 'mongodb'
};

module.exports = {
  categories: categories,
  log4js: log4js,
  // trace, debug, info, warn, error, fatal, error
  getLogger: function (category) {
    return log4js.getLogger(category || categories.DEFAULT);
  },
  configs: {
    level: log4js.levels.INFO,
    format: ':remote-addr' + delimiter + ':method' + delimiter + ':url',
    delimiter: delimiter
  }
};