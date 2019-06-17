/**
 * Created by outrun on 10/22/15.
 */


var DemoSvc = require('../svc/DemoSvc'),
  ResHandler = require('../lib/ResHandler');

exports.httpRequest = function (req, res) {

  var params = {
    url: req.body.url,
    methodId: req.body.methodId,
    params: req.body.params,
    headers: req.body.headers,
    cookies: req.body.cookies,
  };
  try {
    DemoSvc.httpRequest(params.url, params.methodId, params.params, params.headers, params.cookies)
      .then(function (data) {
        ResHandler.ok(res, data);
      }, function (err) {
        ResHandler.errBadRequest(res, err);
      });
  } catch (e) {
    ResHandler.errServer(res, e);
  }
};

exports.demoGet = function (req, res) {

  console.log(JSON.stringify(req.query, null, 4));
  res.json(req.query);
};
exports.demoPost = function (req, res) {

  console.log(JSON.stringify(req.body, null, 4));
  res.json(req.body);
};
exports.demoPut = function (req, res) {

  console.log(JSON.stringify(req.body, null, 4));
  res.json(req.body);
};
exports.demoDelete = function (req, res) {

  console.log(JSON.stringify(req.query, null, 4));
  res.json(req.query);
};
exports.saveSnapshot = function (req, res) {
  var params = {
    name: req.body.sceneName,
    state: req.body.state,
    userId: req.cookies.userId
  };

  DemoSvc.saveState(params)
    .then(function (data) {
      ResHandler.ok(res, data);
    }, function (err) {
      ResHandler.errBadRequest(res, err);
    });
};
exports.getAllSnapshot = function (req, res) {
  DemoSvc.getAllSnapshot(req.cookies.userId)
    .then(function (data) {
      ResHandler.ok(res, data);
    }, function (err) {
      ResHandler.errBadRequest(res, err);
    });
};
