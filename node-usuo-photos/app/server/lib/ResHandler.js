/**
 * Created by outrun on 10/28/15.
 */

var ErrHandler = require('./ErrHandler'),
  diyUtil = require('./diyUtil');

var MyErr = ErrHandler.MyErr;

var resHander = module.exports = new Object();
resHander['DEFAULT_CODE'] = '0000';

var _data = {
  errDef: {
    badRequest: 400,
    forbidden: 403,
    notFound: 404,
    timeout: 408,
    server: 500
  }
  ,
  passDef: {
    ok: 200,
    created: 201,
    accepted: 202
  }
};

var _Helper = {
  response: function (res, status, json) {
    res.status(status)
      // .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .json(json)
  },
  genMethodErr: function (status) {
    return function (res, err) {
      if (err instanceof MyErr)
        _Helper.response(res, /*status*/200, {code: err.code, msg: err.msg});
      else if (err instanceof Error)
        _Helper.response(res, status, {code: ErrHandler.DEFAULT_CODE, msg: err.message})
    }
  },
  genMethodSuc: function (status) {
    return function (res, json) {
      _Helper.response(res, status, json);
    }
  }
};

Object.keys(_data.errDef).forEach(function (key) {
  var name = 'err' + diyUtil.str.toTitle(key);
  resHander[name] = _Helper.genMethodErr(_data.errDef[key]);
});
Object.keys(_data.passDef).forEach(function (key) {
  resHander[key] = _Helper.genMethodSuc(_data.passDef[key]);
});

