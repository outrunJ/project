(function () {

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  var ObjProto = Object.prototype,
    ArrayProto = Array.prototype;

  var toString = ObjProto.toString,
    slice = ArrayProto.slice,
    hasOwnProperty = ObjProto.hasOwnProperty;

  function property(key) {
    return function (obj) {
      return obj == null ? void 0 : obj[key];
    }
  }

  var getLength = property('length');

  function isArrayLike(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
  }

  function createAssigner(keysFunc) {
    return function (obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;

      var index;
      var source, keys, keysLen;
      for (index = 1; index < length; index++) {
        source = arguments[index];
        keys = keysFunc(source);
        keysLen = keys.length;
        
        for (var i = 0; i < keysLen; i++) {
          var key = keys[i];
          obj[key] = source[key];
        }
      }
      return obj;
    }
  }

  var cache = {
    // (url+sorted data) cache
    ajaxGet: {},
    // (url+sorted data) cache
    ajaxPost: {}
  };

  function ajaxCacheKey(url, data) {
    return url + '+' + _.toSortedString(data);
  }

  function getCache(type, params) {
    switch (type) {
      // method, url, data
      case 'ajax':
        var url = params.url;
        var data = params.data;
        switch (params.method) {
          case 'GET':
            return cache.ajaxGet[ajaxCacheKey(url, data)];
            break;
          case 'POST':
            return cache.ajaxPost[ajaxCacheKey(url, data)];
            break;
          default:
            return undefined;
        }
        break;
      default:
        return undefined;
    }
  }

  function flushCache(type, params, mass) {
    switch (type) {
      case 'ajax':
        var url = params.url;
        var data = params.data;
        switch (params.method) {
          case 'GET':
            cache.ajaxGet[ajaxCacheKey(url, data)] = mass;
            break;
          case 'POST':
            cache.ajaxPost[ajaxCacheKey(url, data)] = mass;
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }
  }

  var _ = window.NeatUtil = {
    identity: function (value) {
      return value;
    },
    keys: function (object) {
      var keys = [];
      for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
          keys.push(key);
        }
      }

      return keys;
    },
    values: function (object) {
      var values = [];
      for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
          values.push(object[key]);
        }
      }

      return values;
    },
    each: function (list, fn) {
      if (list.forEach) {
        list.forEach(fn);
      }
    },
    map: function (list, fn) {
      var len = list.length;
      var mapList = Array(len);
      for (var index = 0; index < len; index++) {
        mapList[index] = fn(list[index]);
      }
    },
    mapcat: function (list, fn) {

    },
    isArray: function (obj) {
      return Array.isArray || toString.call(obj) === '[object Array]';
    },
    isObject: function (obj) {
      var type = typeof obj;
      return type === 'function' || (type === 'object' && !!obj);
    },
    toArray: function (obj) {
      if (!obj) return [];
      if (_.isArray(obj)) return slice.call(obj);
      if (isArrayLike(obj)) return _.map(obj, _.identity);
      return _.values(obj);
    },
    allKeys: function (obj) {
      if (!_.isObject(obj)) return [];
      var keys = [];
      for (var key in obj) {
        keys.push(key);
      }
      return keys;
    },
    extend: createAssigner(_.allKeys),
    partial: function (f) {
      var _args = _.toArray(_.rest(arguments));
      return function () {
        var args = _.toArray(arguments);
        return f.apply(f, Array.prototype.concat.call(_args, args));
      }
    },
    partialT: function (f) {
      var _args = _.toArray(_.rest(arguments));
      return function () {
        var args = _.toArray(arguments);
        return f.apply(f, Array.prototype.concat.call(args, _args));
      }
    },
    fakeGUID: function (len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        for (i = 0; i < len; i++) {
          uuid[i] = chars[Math.random() * radix];
        }
      }
      else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = Math.random() * 16;
            uuid[i] = chars[
              (i == 19) ? (r & 0x3) | 0x8 : r
              ];
          }
        }
      }

      return uuid.join('');
    },
    toSortedString: function (obj) {
      if (obj instanceof Array) {
        return obj.sort().toString()
      } else if (obj instanceof Object) {
        var keys = _.keys(obj).sort();

        var index, len = keys.length;
        var strAry = Array[len + 2];
        strAry[0] = '{';
        strAry[len + 1] = '}';
        for (index = 0; index < len; index++) {
          strAry[index + 1] = '"' + keys[index] + '"' + ':' + obj[keys[index]];
        }
        return strAry.join('');
      }
    },
    ajax: function (method, url, data, settings) {
      var TYPE = 'ajax';
      var cb = settings.callback;
      var useCache = settings.useCache || false;
      if (useCache) {
        var cache = getCache(TYPE, {method: method, url: url, data: data});
        if (cache !== undefined) {
          cb(200, cache);
        }
      }

      var xmlhttp = new window.XMLHttpRequest();
      xmlhttp.open(method, url, true);
      if (method === 'POST') {
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
      xmlhttp.send(data);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          switch (xmlhttp.status) {
            case 404:
              url = 'notfound';
              break;
            case 200:
              if (useCache) {
                flushCache(TYPE, {method: method, url: url, data: data}, xmlhttp.responseText);
              }
              break;
            default:
          }
          cb(xmlhttp.status, xmlhttp.responseText);
        }
      }

    },
    ajaxUseCache: function (method, url, data, settings) {
      settings.useCache = true;
      return ajax(method, url, data, settings);
    },
    ajaxGet: _.partial(_.ajax, 'GET'),
    ajaxPost: _.partial(_.ajax, 'POST'),
    ajaxPostUseCache: _.partial(_.ajaxUseCache, 'POST'),
    ajaxPostUseCache: _.partial(_.ajaxUseCache, 'POST'),
  }
}());
