/**
 *
 * Created by outrun on 2/27/16.
 */
"use strict";
var crypto = require('crypto');

var str = {
  toTitle: function (str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
  },
  randomCode: function (len) {
    //随机数
    var source = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
      "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
      "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
      "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
      "Y", "Z"
    ];
    len = len || 5;
    var code = "";
    for (var i = 0; i < num; i++) {
      code += source[Math.round(Math.random() * 61)];
    }
    return code;
  },
};

var _obj = {
  isBlank: function (obj) {
    return obj === undefined || obj === null ||
      obj.toString() === '' || obj.toString() === '{}' || obj.toString() === '[]';
  },
  isPromise: function (obj) {
    return (obj instanceof Promise)
  },
  toPromise: function (obj) {
    return _obj.isPromise(obj) ? obj : Promise.resolve(obj);
  },
  deepCopy: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};

var encrypt = {
  md5: function (data) {
    return crypto.createHash('md5').update(data).digest('hex');
  },
};

module.exports = exports = {
  str: str,
  obj: _obj,
  encrypt: encrypt,
};
