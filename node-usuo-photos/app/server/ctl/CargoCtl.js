/**
 * Created by outrun on 2/28/16.
 */

var CargoSvc = require('../svc/CargoSvc'),
  BizHelper = require('../lib/BizHelper');

exports.addAdminMultiPhoto = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [['cargoes']], CargoSvc.addAdminMultiPhoto);
};

exports.getMulti = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [null, ['creatorId', 'type', 'genre', 'createdAt', 'content', 'timeBegin', 'timeEnd', 'inlineGenre', 'adminIds']], CargoSvc.getMulti);
};

exports.delMulti = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [['cargoIds']], CargoSvc.delMulti);
};

exports.upd = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [['_id'], ['photoId', 'photoUrlRevised']], CargoSvc.upd)
};
