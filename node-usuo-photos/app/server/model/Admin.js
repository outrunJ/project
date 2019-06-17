/**
 * Created by outrun on 2/26/16.
 */

var mongoose = require('../lib/db').mongoose;

Schema = mongoose.Schema;

var CargoSchema = new Schema({

  cargoId: String,

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
});

var adminSchema = new Schema({

  tel: String,
  nickname: String,
  pwd: String,
  avatar: String,
  email: String,
  location: String,
  about: String,

  token: String,
  lastLoginAt: Number,
  sessionInvalidTime: Number,

  roles: [String],  // super normal

  cargoes: [CargoSchema],

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
}, {
  collection: 'admin'
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
