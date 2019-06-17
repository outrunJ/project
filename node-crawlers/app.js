/**
 *
 * Created by outrun on 2/26/16.
 */

var request = require('request'),
  fs = require('fs'),
  http = require('http');
var url = 'http://www.haimati.cn/';

request(url, function (err, response, body) {
  console.log(body);
});
