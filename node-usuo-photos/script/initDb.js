/**
 *
 * Created by outrun on 3/11/16.
 */

var fs = require('fs'),
  Q = require('q'),
  mongoose = require('mongoose');

var OrderSvc = require('../app/server/svc/OrderSvc'),
  Admin = require('../app/server/model/Admin'),
  Order = require('../app/server/model/Order'),
  diyUtil = require('../app/server/lib/diyUtil');

var md5 = diyUtil.encrypt.md5;

var dynamicConstants = {};

var pass = false;

Order.findOne({seq: 100000}).exec().then(function (order) {
  "use strict";
  // order seq
  if (order === null) {
    return Order.create({
      seq: 100000,
      orderNo: 100001,
    })
  } else {
    pass = true;
    return order;
  }

}).then(function (order) {
  dynamicConstants.ORDER_SEQ_ID = order.id;
  "use strict";
  if (pass) return;
  // admin No.1
  return Admin.create({
    tel: '15610121016',
    pwd: md5(md5('asdfasdf')),
    nickname: 'yjy',
    roles: ['super']
  })

}).then(function (admin) {
  "use strict";
  if (pass) return;
  // order No.1
  return Order.create({
    source: 'admin',
    status: 1,
    orderNo: 100000,
    customerId: admin._id,
    customerName: admin.nickname,
    customerTel: admin.tel,
    desc: '过渡订单'
  })

}).then(function (result) {
  "use strict";
  Q.nfcall(fs.writeFile, __dirname + '/../app/server/data/dynamicConstants.json', JSON.stringify(dynamicConstants, null, 4)).then(function (data) {
    console.log(data);
  }, function (err) {
    console.log(err);
  })
});

