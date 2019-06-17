
var usersvc = require('./usersvc');

exports.getuser = function *() {
  var user = yield usersvc.getuser();
  this.body = user;
};