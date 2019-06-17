/**
 * Authentication middleware
 * Created by outrun on 10/27/15.
 */
var Admin = require('../model/Admin');
var acsLevels = require('../config/accessConf').levels,
  acConf = require('../config/acConf'),
  webConf = require('../config/webConf'),
  BizHelper = require('../lib/BizHelper');

module.exports = function (opt) {
  opt = opt || {};
  return function (req, res, next) {
    var uri = req.url;
    console.log('requested url:', uri);
    console.log('requested params: ', JSON.stringify(BizHelper.ctl.paramsJoin(req), null, 4));

    req.bag = req.bag || {};

    // authenticate pass
    var token = req.cookies.token;
    var adminId = req.cookies.adminId;
    if (-1 != acConf.escapedUris.indexOf(uri)){
      next();
    } else if (adminId){
      Admin.findOne({_id: adminId, token: token}).exec().then(function (admin) {
        if (admin) {
          req.bag.admin = admin;
          req.acsLevel = acsLevels.auth;
        }
        next();
      }, function (err) {
        throw err;
      });

    } else {
      deny();
    }

    function deny () {
      "use strict";
      if (uri.startsWith('/api')) {
        res.json({code: '0003', msg: 'ac denied.'})
      } else {
        res.redirect(webConf.urls.login);
      }
    }
  }
};
