/**
 * Created by outrun on 3/9/16.
 */
var mongoose = require('../lib/db').mongoose;

Schema = mongoose.Schema;

var franchiseeSchema = new Schema({

  name: String,
  tel: String,
  location: String,

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
}, {
  collection: 'franchisee'
});

var Admin = mongoose.model('Franchisee', franchiseeSchema);

module.exports = Admin;
