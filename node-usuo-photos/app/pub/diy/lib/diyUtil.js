/**
 * Created by outrun on 2/28/16.
 */

window.diyUtil = {
  isTel: function (tel) {
    "use strict";
    var reg = /^(13|15|18|17)[0-9]{9}$/;
    return reg.test(tel);
  },
  isEmail: function (email) {
    "use strict";
    var reg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    return reg.test(email);
  },
  paramsStr: function (params) {
    "use strict";
    var retStr = '?';
    for (var key in params) {
      retStr += key + '=' + params[key] + '&';
    }
    if (retStr.length > 0) retStr = retStr.slice(0, -1);
    return retStr;
  },
  urlCutOffParams: function (url) {
    "use strict";
    if (url === undefined || url === null) {
      return '';
    } else {
      var index = url.indexOf('?');
      if (index == -1) {
        return url
      } else {
        return url.substring(0, index);
      }
    }
  }
};
