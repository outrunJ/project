/**
 * Created by outrun on 11/2/15.
 */

var crypto = require('crypto');
var User = require('../model/User'),
  ErrHandler = require('../lib/ErrHandler'),
  BizHelper = require('../lib/BizHelper'),
  toolKit = require('../../../lib/ToolKit');

exports.addUser = function (user) {
  console.log('addUser');
  if (toolKit.isAnyBlank(user))
    throw ErrHandler.getBizErr(1001);
  user.pwdMd5 = crypto.createHash('md5').update(user.pwd).digest('hex');
  delete user.pwd;

  return User.create(user);
};
exports.getUser = function (user) {
  console.log('getUser');
  if (toolKit.isAnyBlank(user))
    throw ErrHandler.getBizErr(1001);
  user.pwdMd5 = crypto.createHash('md5').update(user.pwd).digest('hex');
  delete user.pwd;

  return User.findOne(user).exec();
};
