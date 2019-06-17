/**
 * Authentication middleware
 * Created by outrun on 10/27/15.
 */
var User = require('../model/User');
var acsLevels = require('../config/accessConf').levels;

module.exports = function (opt) {
  opt = opt || {};
  return function (req, res, next) {
    req.bag = req.bag || {};
    // authenticate pass
    var userId = req.cookies.userId;
    if (userId) {
      User.findById(userId).exec().then(function (user) {
        req.bag.user = user;
        req.acsLevel = acsLevels.auth;
        next();
      },function (err) {
        throw err;
      });
    } else {
      next();
    }
  }
};
