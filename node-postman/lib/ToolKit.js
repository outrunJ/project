/**
 * Created by outrun on 10/30/15.
 */

exports.engenderObj = function (obj) {
  var retObj = {};
  switch (typeof obj) {
    case 'undefined':
      break;
    case 'object':
      if (obj == null) {
        //
      } else if (obj instanceof Array)
        retObj = paramsArr2Obj(obj);
      else {
        // ext: RegExp, Date, etc..
      }
      break;
    default :
    // ext: number, string
  }
  return retObj;
};

var paramsArr2Obj = exports.paramsArr2Obj = function (arr) {
  var retObj = {};
  if (arr instanceof Array) {
    arr.forEach(function (item) {
      retObj[item.key] = item.val;
    })
  }
  return retObj;
};

exports.isAnyBlank = function (obj) {
  if (!obj)
    return true;
  if (obj instanceof Array) {
    try {
      obj.forEach(function (item) {
        if (arguments.callee(item)) throw new Error('hasBlank');
      });
      return false;
    } catch (e) {
      if (e.message == 'hasBlank')
        return true;
      else
        return false;
    }
  } else if (obj instanceof Object) {
    if (JSON.stringify(obj) === '{}')
      return true;
    for (var key in obj) {
      if (obj.propertyIsEnumerable(key)) {
        if (obj[key] === undefined || obj[key] === null)
          return true;
      }
    }
  }
  return false;
};

exports.genCookiesStr = function (obj) {
  "use strict";
  var retStr = '';
  Object.keys(obj).forEach(function (key) {
    retStr += key + '=' + obj[key] + '; ';
  });
  return retStr.slice(0, -2);
};
