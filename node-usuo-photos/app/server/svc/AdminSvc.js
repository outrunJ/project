/**
 * Created by outrun on 2/26/16.
 */

var Q = require('q');
var Admin = require('../model/Admin'),
  diyUtil = require('../lib/diyUtil'),
  BizHelper = require('../lib/BizHelper'),
  constants = require('../config/constant');

var thenData = BizHelper.svc.thenData,
  thenMsg = BizHelper.svc.thenMsg;

exports.login = function (data) {
  "use strict";
  var self = this;
  return Admin.findOne({
    isDeleted: {$ne: true},
    tel: data.tel,
    pwd: diyUtil.encrypt.md5(data.pwd)
  }).then(function (admin) {
    BizHelper.err.blank(admin, 3001);
    var now = Date.now();
    admin.lastLoginAt = now;
    admin.sessionInvalidTime = constants.DAY_TIME + now;
    admin.token = diyUtil.encrypt.md5(admin.id + now);
    return Q.nfcall(admin.save).then(function (results) {
      var admin = results[0];
      BizHelper.err.blank(admin, 2001);
      // cookies
      var maxAge = 3600000; // ms
      self.res.cookie('adminId', admin.id, {maxAge: maxAge, path: '/'});
      self.res.cookie('token', admin.token, {maxAge: maxAge, path: '/'});
      return thenMsg('suc');
    });
  })
};

exports.register = function (data) {
  "use strict";
  return Admin.findOne({tel: data.tel}).then(function (admin) {
    BizHelper.err.notBlank(admin, 3002);
    return Admin.create({
      tel: data.tel,
      pwd: diyUtil.encrypt.md5(data.pwd)
    }).then(function () {
      return thenMsg('suc');
    })
  })
};

exports.updAdmin = function (data) {
  "use strict";
  return Promise.resolve(data).then(function () {
    var updater = new Object;
    data['nickname'] && (updater['nickname'] = data['nickname']);
    data['pwd'] && (updater['pwd'] = diyUtil.md5(data['pwd']));
    data['avatar'] && (updater['avatar'] = data['avatar']);
    data['location'] && (updater['location'] = data['location']);
    data['about'] && (updater['about'] = data['about']);
    data['email'] && (updater['email'] = data['email']);

    return Admin.update({
      isDeleted: {$ne: true},
      _id: data.adminId
    }, updater).exec();
  }).then(function (updObj) {
    return thenMsg('suc');
  })
};

exports.count = function (data) {
  "use strict";
  return Promise.resolve().then(function () {
    return Admin.count({isDeleted: {$ne: true}})
  }).then(function (num) {
    return thenData(num);
  })
};
