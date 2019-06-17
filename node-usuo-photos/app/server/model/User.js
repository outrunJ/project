/**
 * Created by outrun on 3/9/16.
 */
var mongoose = require('../lib/db').mongoose;

Schema = mongoose.Schema;

var userSchema = new Schema({

  tel: String,
  nickname: String,
  pwd: String,
  avatar: String,
  email: String,
  location: String,

  token: String,
  lastLoginAt: Number,
  sessionInvalidTime: Number,

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
}, {
  collection: 'user'
});

var User = mongoose.model('User', userSchema);

module.exports = User;
