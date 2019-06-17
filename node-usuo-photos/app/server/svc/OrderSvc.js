/**
 *
 * Created by outrun on 3/7/16.
 */

var BizHelper = require('../lib/BizHelper'),
  Constants = require('../config/constant'),
  Admin = require('../model/Admin'),
  Order = require('../model/Order'),
  Cargo = require('../model/Cargo');

var thenData = BizHelper.svc.thenData,
  thenMsg = BizHelper.svc.thenMsg;

exports.addAdminOrderCargo = function (data) {
  "use strict";
  var _diy = new Object;
  var admin = this.req.bag.admin;

  return Promise.resolve(data).then(function () {
    _diy.cargo = data.cargo;
    _diy.order = data.order;
  }).then(function (updObj) {
    // order
    return Order.findOne({_id: _diy.order._id, isDeleted: {$ne: true}}).exec()

  }).then(function (order) {

    BizHelper.err.blank(order, 1001);
    // cargo
    var cargo = _diy.cargo;
    cargo.creatorId = admin._id;
    cargo.creatorNickname = admin.nickname || '';
    return Cargo.create(cargo);
  }).then(function (cargo) {
    // admin
    _diy.adminCargoes = new Array;
    _diy.adminCargoes.push({
      cargoId: cargo.id
    });
    _diy.orderCargoes = _diy.adminCargoes;

  }).then(function () {
    return Admin.update({/*isDeleted: {$ne: true},*/ _id: data.adminId}, {
      $addToSet: {
        cargoes: {
          $each: _diy.adminCargoes
        }
      },
    }).exec();
  }).then(function (updObj) {
    return Order.update({/*isDeleted: {$ne: true},*/ _id: _diy.order._id}, {
      $addToSet: {
        cargoes: {
          $each: _diy.orderCargoes
        }
      },
    }).exec();
  }).then(function (updObj) {
    return thenMsg('suc');
  });
};

var createOrder = function (order) {
  "use strict";
  return Order.findByIdAndUpdate(Constants.ORDER_SEQ_ID, {$inc: {orderNo: 1}}).exec().then(function (seq) {
    order.orderNo = seq.orderNo;
    return Order.create(order);
  })
};

exports.create = function (data) {
  "use strict";
  var _diy = new Object;
  return Promise.resolve().then(function () {
    data.source && (_diy.source = data.source);
    data.status && (_diy.status = data.status);
    data.customerId && (_diy.customerId = data.customerId);
    data.customerName && (_diy.customerName = data.customerName);
    data.customerTel && (_diy.customerTel = data.customerTel);
    data.desc && (_diy.desc = data.desc);
  }).then(function () {
    return createOrder({
      source: _diy.source,
      status : _diy.status || 1,
      customerId : _diy.customerId,
      customerName : _diy.customerName,
      customerTel : _diy.customerTel,
      desc: _diy.desc,
    })
  }).then(function (order) {
    BizHelper.err.blank(order, 1001);
    return thenMsg('suc');
  });
};

exports.getMulti  = function (data) {
  "use strict";
  var _diy = new Object;

  return Promise.resolve().then(function () {
    data.timeBegin && (_diy.timeBegin = parseInt(data.timeBegin) );
    data.timeEnd && (_diy.timeEnd = parseInt(data.timeEnd) );
  }).then(function () {
    var finder = {
      _id: {$ne: Constants.ORDER_SEQ_ID}
    };
    if(_diy.timeBegin || _diy.timeEnd) {
      finder.createdAt = {};
    }
    _diy.timeBegin && (finder.createdAt.$gt = _diy.timeBegin);
    _diy.timeEnd && (finder.createdAt.$lt = _diy.timeEnd);
    return Order.find(finder).exec();
  }).then(function (orders) {
    return thenData(orders);
  });
};
