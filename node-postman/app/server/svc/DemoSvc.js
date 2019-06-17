/**
 * Created by outrun on 10/28/15.
 */

var Q = require('q');
var SafeRequest = require('../lib/SafeRequest'),
  ErrHandler = require('../lib/ErrHandler'),
  HttpUtil = require('../../../lib/HttpUtil'),
  User = require('../model/User');
var request = require('request');

exports.httpRequest = function (url, methodId, params, headers, cookies) {
  _convertType = function (params) {
    if (params instanceof Array) {

      Array.prototype.forEach.call(params, function (item) {
        console.log(item);
      });
      params.forEach(function (item) {
        if (item.type.id === 2)
          item.val = parseInt(item.val);
      });
    }
  };
  _convertType(params);

  if (!url || methodId == undefined)
    throw ErrHandler.getBizErr(1001);

  var deferred = Q.defer();
  var method;

  switch (methodId) {
    case 1:
      method = 'get';
      break;
    case 2:
      method = 'post';
      break;
    case 3:
      method = 'put';
      break;
    case 4:
      method = 'delete';
      break;
    default:
      method = 'get';
  }
  SafeRequest({
    url: url,
    method: method,
    queries: params,
    headers: headers,
    cookies: cookies,
    success: function (err, res, body) {
      deferred.resolve(body);
    },
    error: function (err, res, body) {
      //deferred.reject(err);
      deferred.resolve(err);
    }
  });

  return deferred.promise;

};
exports.saveState = function (data) {
  var state = JSON.stringify(data.state);
  return User.findById(data.userId).exec().then(function (user) {
    var states = user.demo_states = user.demo_states || [],
      isSet = false;
    for(var ind = 0; ind < states.length; ind++) {
        if (data.name === states[ind].name){
          states[ind].state = state;
          isSet = true;
        }
    }
    if(!isSet){
      user.demo_states.push({
        name: data.name,
        state: state
      })
    }

    return user.save();
  });
};
exports.getAllSnapshot = function (userId) {
  return User.findById(userId).exec().then(function (user) {
    return user.demo_states;
  })
};