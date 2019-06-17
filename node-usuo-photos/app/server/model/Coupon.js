/**
 * Created by outrun on 3/9/16.
 */
var mongoose = require('../lib/db').mongoose;

Schema = mongoose.Schema;

var couponSchema = new Schema({

  rmb: {type: Number, default: 0},
  code: String,
  isConsumed: {type:Boolean, default: false}, // 是否已被消费过
  isOccupied: {type: Boolean, default: false}, // 是否被订单占用

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
}, {
  collection: 'coupon'
});

var Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
