/**
 * Created by outrun on 10/28/15.
 */

exports.genUrlQuery = function (params) {
  var retStr = '';
  if (!params) {
    //
  } else if (params instanceof Array) {
    if (params.length < 1) {
      //
    } else {
      //
      retStr += '?' + params[0].key + '=' + params[0].val;
      for (var i = 1; i < params.length; i++)
        retStr += '&' + params[i].key + '=' + params[i].val;
    }
  } else if (params instanceof Object) {
    //
    for (var key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key))
        retStr += '&' + key + '=' + params[key];
    }
  }
  return retStr;
};


