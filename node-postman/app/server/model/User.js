/**
 * Created by outrun on 10/28/15.
 */

var mongoose = require('../lib/db');

var Schema = mongoose.Schema;

var demoStateSchema = new Schema({
  name: {type: String, default: ''},
  state: {type: String, default: ''}
});
var userSchema = new Schema({
  name: {type: String, default: ''},
  pwdMd5: {type: String},
  hostIds: [String],
  demo_states: {type: [demoStateSchema], default: []}
});

var User = module.exports = exports = mongoose.model('User', userSchema);
