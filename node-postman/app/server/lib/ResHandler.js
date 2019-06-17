/**
 * Created by outrun on 10/28/15.
 */

var ErrHandler = require('./ErrHandler');

var resHander = module.exports = new Object();
var MyErr = ErrHandler.MyErr;
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
  genMethodErr: function (def) {
    return function (res, err) {
      if (err instanceof MyErr)
        _Helper.response(res, def, {code: err.code, msg: err.msg});
      else if (err instanceof Error)
        _Helper.response(res, def, {code: ErrHandler.DEFAULT_CODE, msg: err.message})
    }
  },
  genMethodSuc: function (def) {
    return function (res, json) {
      _Helper.response(res, def, json);
    }
  }
};

for (var key in _data.errDef) {
  var name = 'err' + key.charAt(0).toUpperCase() + key.substr(1);
  //if (_data.errDef.hasOwnProperty(name))
  if (Object.prototype.hasOwnProperty.call(_data.errDef, key))
    resHander[name] = _Helper.genMethodErr(_data.errDef[key]);
}
Object.keys(_data.passDef).forEach(function (key) {
  resHander[key] = _Helper.genMethodSuc(_data.passDef[key]);
});

