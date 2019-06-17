/**
 * Created by outrun on 10/28/15.
 */

var errors = require('../data/errors');

var ErrHandler = function () {};
//ErrHandler.prototype.constructor = ErrHandler;

var MyErr = function (msg, code) {
  this.msg = msg;
  this.code = code;
};
MyErr.prototype = new Error();

var SysErr = function () {
  MyErr.apply(this, arguments);
};
var BizErr = function () {
  MyErr.apply(this, arguments);
};

SysErr.prototype = new MyErr();
BizErr.prototype = new MyErr();
SysErr.prototype.constructor = SysErr;
BizErr.prototype.constructor = BizErr;

ErrHandler.prototype.getSysErr = function (code) {
  if(!errors.hasOwnProperty(code))
    return new SysErr(code, code);
  else {
    var error = errors[code];
    return new SysErr(error.sysMsg, code)
  }
};
ErrHandler.prototype.getBizErr = function (code) {
  if(!errors.hasOwnProperty(code))
    return new BizErr(code, code);
  else {
    var error = errors[code];
    return new BizErr(error.bizMsg, code)
  }
};
ErrHandler.prototype.diyErr = function (code, msg) {
  return new MyErr(msg, code);
};

var errHandler = module.exports = new ErrHandler();
errHandler['MyErr'] = MyErr;
errHandler['DEFAULT_CODE'] = '1000';
