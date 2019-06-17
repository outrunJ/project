/**
 * Created by outrun on 11/2/15.
 */

var UserSvc = require('../svc/UserSvc'),
  BizHelper = require('../lib/BizHelper');
exports.addUser = function (req, res) {

  var user = {
    name: req.body.name,
    pwd: req.body.pwd
  };
  BizHelper.thenResponse(res, UserSvc.addUser(user))

};

exports.login = function (req, res) {
  var user = {
    name: req.query.name,
    pwd: req.query.pwd
  };
  BizHelper.thenResponse(res, UserSvc.getUser(user));
};