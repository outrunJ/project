/**
 * Created by outrun on 3/7/16.
 */

var mongoose = require('../lib/db').mongoose;

Schema = mongoose.Schema;

var CargoSchema = new Schema({

  cargoId: String,

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
});

var orderSchema = new Schema({
  seq: Number,
  orderNo: {
    type: Number,
    default: 100000,
    required: true,
    index: {unique: true},
  },

  source: {type: String, default: 'site'}, // admin, site
  status: {type: Number, default: 0}, // 1 已预约 2 已到店 3 已付款 4 已交付

  // snapshot
  customerId: String,
  customerName: String,
  customerTel: String,
  desc: String,

  cargoes: [CargoSchema],

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
}, {
  collection: 'order'
});

var Order = mongoose.model('order', orderSchema);

module.exports = Order;
