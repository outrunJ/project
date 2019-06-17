/**
 *
 * Created by outrun on 2/26/16.
 */

var AdminSvc = require('../svc/AdminSvc'),
  diyUtil = require('../lib/diyUtil'),
  BizHelper = require('../lib/BizHelper');

exports.register = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [['tel', 'pwd']], AdminSvc.register)
};

exports.login = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [['tel', 'pwd']], AdminSvc.login);
};

exports.logout = function (req, res) {
  "use strict";
  res.redirect('/bluemoon/login.html')
};

exports.updAdmin = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [null, ['nickname', 'pwd', 'avatar', 'email', 'location', 'about']], AdminSvc.updAdmin );
};

exports.count = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, null, AdminSvc.count)
};
