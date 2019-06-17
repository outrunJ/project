/**
 * Created by outrun on 3/7/16.
 */

var OrderSvc = require('../svc/OrderSvc'),
  BizHelper = require('../lib/BizHelper');

exports.addAdminOrderCargo = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [['cargo', 'order']], OrderSvc.addAdminOrderCargo);
};

exports.create = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [null,
    ['source', 'status', 'customerId', 'customerName', 'customerTel', 'desc']
  ], OrderSvc.create);
};

exports.getMulti = function (req, res) {
  "use strict";
  BizHelper.ctl.response(req, res, [null,
    ['timeBegin', 'timeEnd']
  ], OrderSvc.getMulti);

};