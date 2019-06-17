/**
 * Created by outrun on 2/26/16.
 */

var mongoose = require('mongoose'),
  config = require('../config/webConf');

mongoose.connect(config.MONGO_URL);
var conn = mongoose.connection;

conn.on('error', function (err) {
  console.log('mongoose err: ', err);
});

conn.once('open', function () {
  console.log('mongoose opened');
});

mongoose.set('debug', true);

module.exports = {
  mongoose: mongoose
};
