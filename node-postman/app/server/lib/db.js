/**
 * Created by outrun on 10/30/15.
 */

var mongoose = require('mongoose');

var config = require('../config/webConf').mongodb,
  logger = require('./logger');

mongoose.set('debug', true);
mongoose.connect(config.url);
var conn = mongoose.connection;

conn.on('error', function (err) {
  logger.getLogger(logger.categories.MONGODB).error('mongodb err: ', err);
});
conn.once('open', function () {
  logger.getLogger(logger.categories.MONGODB).info('mongodb connected');
});

module.exports = exports = mongoose;
