/*
 *@Description基础请求类
 *@Date 2015-04-06
 *@Author yuanzhijia@jikexueyuan.com
 */
var request = require('request');
var webConfig = require('../config/webConf'),
  encryptTools = require('./AuthCode').encryptTools,
  ToolKit = require('../../../lib/ToolKit');

var generateUrlParams = encryptTools.generateUrlParams,
  encryptParams = encryptTools.encryptParams;

request = request.defaults({jar: true});

// FIXME build a factory to produce diverse request method
var _safeFactory = function (params) {
  // request settings
  var isEncrypt = params['encrypt'] && true || false,
    method = params['method'],
    queries = params['queries'],
    headers = params['headers'],
    cookies = params['cookies'],
    options = {
      url: params.url,
      // well parse the escaped string. eg: \" to "
      json: true,
      timeout: webConfig.request.INT_SERVICE_REQ_TIMEOUT
    },
    callback = params['success'],
    errCallback = params['error'];

  queries = ToolKit.engenderObj(queries);
  headers = ToolKit.engenderObj(headers);
  cookies = ToolKit.engenderObj(cookies);

  // headers
  options.headers = headers;

  // methods
  switch (method) {
    case 'get':
      options.qs = queries;
      break;
    case 'post':
      // multipart/form-data
      // options.formData = paramsObj;
      // application/x-www-form-urlencoded
      options.form = queries;
      break;
    case 'put':
      options.form = queries;
      break;
    case 'delete':
      options.qs = queries;
      break;
    default :
      method = 'get';
      options.qs = queries;
  }
  options.method = method.toUpperCase();

  // cookies
  //var j = request.jar();
  //var cookie = request.cookie('');
  //j.setCookie(cookie, options.url);
  //request.jar = j;
  options.headers['Cookie'] = ToolKit.genCookiesStr(cookies);

  // encrypt
  if (isEncrypt) {
    if (options.qs)
      options.qs = encryptParams(options.qs);
    if (options.form)
      options.form = encryptParams(options.form);
  }

  // callback
  var requestCallback = function (err, res, body) {
    if (err) {
      var reqInfo = JSON.stringify(options, null, 4);
      if (err.code === 'ETIMEDOUT') {
        console.error(err + ', timeout, fail to request api: ' + reqInfo);
      } else {
        console.error(err + ', fail to request api: ' + reqInfo);
      }
      errCallback && errCallback(err, res, body);
    } else if (!body) {
      console.warn('Http no error, no body, statusCode: ' + res.statusCode);
    } else if (body instanceof String) {
      //console.timeEnd(reqOptions.url);
      try {
        callback(err, res, JSON.parse(body));
      } catch (e) {
        //console.timeEnd(reqOptions.url);
        console.error('Request Callback Error: ' + options.url, e);
        errCallback && errCallback(e, res, body);
      }
    } else {
      callback(err, res, body);
    }
  };

  // send the request
  //console.time(options.url);
  request(options, requestCallback);
};

module.exports = _safeFactory;