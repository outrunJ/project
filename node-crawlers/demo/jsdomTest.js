/**
 * Created by outrun on 2/26/16.
 */

var jsdom = require('jsdom');

var url = 'http://www.haimati.cn/';

jsdom.env({
  url: url,
  scripts: ['http://code.jquery.com/jquery.js'],
  done: function (err, window) {
    var $ = window.$;
  }
});
