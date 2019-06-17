/**
 * Created by outrun on 2/26/16.
 */

var QiniuLib = require('../lib/QiniuLib'),
  BizHelper = require('../lib/BizHelper');

var thenData = BizHelper.svc.thenData,
  thenMsg = BizHelper.svc.thenMsg;

exports.uptokenPhotos = function (data) {
  "use strict";
  return Promise.resolve({
    uptoken: QiniuLib.uptoken('photos'),
    domain: 'http://7xrabw.com1.z0.glb.clouddn.com/',
  });
};

exports.uptokenAvatars = function (data) {
  "use strict";
  return Promise.resolve({
    uptoken: QiniuLib.uptoken('avatars'),
    domain: 'http://7xrabw.com1.z0.glb.clouddn.com/',
  });
};