/**
 * Created by outrun on 11/2/15.
 */

var ResHandler = require('./ResHandler');

exports.thenData = function (promise) {
  if (!(promise instanceof Promise)) {
    promise = Promise.resolve(promise);
  }
  return promise.then(function (data) {
    if (data) {
      if (JSON.stringify(data) === '{}')
        throw ErrHandler.getBizErr('2001');
      else
        return data;
    }
  }, function (err) {
    throw err;
  })
};

exports.thenResponse = function (res, promise) {
  promise.then(function (data) {
    ResHandler.ok(res, data);
  }, function (err) {
    ResHandler.errServer(res, err);
  });
};