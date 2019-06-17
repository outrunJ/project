/**
 * Created by outrun on 2/26/16.
 */

var BizHelper = require('../lib/BizHelper'),
  QiniuSvc = require('../svc/QiniuSvc');

exports.uptokenPhotos = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, null, QiniuSvc.uptokenPhotos);
};

exports.uptokenAvatars = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, null, QiniuSvc.uptokenAvatars);
};
