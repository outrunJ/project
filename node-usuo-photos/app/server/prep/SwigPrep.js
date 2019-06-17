/**
 * Created by outrun on 2/27/16.
 */

var BizHelper = require('../lib/BizHelper');

exports.blank = function (req, res) {
  "use strict";
  var data;
  var topNav = req.query.topNav;
  var subNav = req.query.subNav;
  var bag = req.bag;
  var data = {bag: bag};
  var roles = bag.admin.roles;
  data.nav = BizHelper.pms.roleNav(roles, topNav, subNav);

  switch (topNav) {
    case '0':
      bag['uptoken_url'] = '/api/qiniu/uptoken/photos';
      bag['domain'] = 'http://7xrabw.com1.z0.glb.clouddn.com/';
      break;
    case '2':
      bag['uptoken_url'] = '/api/qiniu/uptoken/avatars';
      bag['domain'] = 'http://7xrcaw.com2.z0.glb.qiniucdn.com/';
      break;
  }
  res.render('blank', data)
};

