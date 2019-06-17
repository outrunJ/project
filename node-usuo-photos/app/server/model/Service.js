/**
 *
 * Created by outrun on 3/9/16.
 */

var mongoose = require('../lib/db').mongoose;

Schema = mongoose.Schema;

var serviceSchema = new Schema({

  name: String,
  price: {type: Number, default: 0},
  desc: String,

  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
}, {
  collection: 'service'
});

var Service = mongoose.model('Service', serviceSchema);

module.exports = Service ;
