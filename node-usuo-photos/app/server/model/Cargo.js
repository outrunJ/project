/**
 * Created by outrun on 2/26/16.
 */

var mongoose = require('../lib/db').mongoose;

Schema = mongoose.Schema;

var photoSchema = new Schema({
  url: String,
  genre: Number,  // 1 证件照, 2 文艺照 , 3 形象照 , 4 头像照 , 5 登记照 , 6 萌宠照 , 7 全家福
  name: String,
  desc: String,

  urlRevised: String,
});

var cargoSchema = new Schema({

  type: {type: Number, default: 0}, // 1 photo
  genre: Number,  // photo 同上
  creatorId: String,
  creatorNickname: String,

  orderNo: String,  // 订单id

  title: String,
  desc: String,

  photos: [photoSchema],

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
}, {
  collection: 'cargo'
});

var Cargo = mongoose.model('cargo', cargoSchema);

module.exports = Cargo;
