/**
 *
 * Created by outrun on 2/26/16.
 */


var request = require('request'),
  fs = require('fs'),
  http = require('http');
var url = 'http://www.haimati.cn/';

/**
 *  request
 */
request(url, function (err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  }
});
request({
  method: 'GET',
  uri: url,
  //url: url,
  gzip: true,
  headers: {
    'User-Agent': 'request'
  }
}, function (err, response, body) {
}).on('response', function (response) {
}).on('data', function (data) {
}).on('error', function (err) {
});

/**
 * request file
 */
request({
  method: 'PUT',
  uri: url,
  multipart: [{
    'content-type': 'application/json',
    body: JSON.stringify({
      foo: 'bar',
      _attachments: {
        'message.txt': {
          follows: true,
          length: 18,
          'content_type': 'text/plain'
        }
      }
    })
  }, {
    body: 'I am an attachment'
  }, {
    body: fs.createReadStream('image.png')
  }]
});

/**
 * pipe
 */
request(url).pipe(fs.createWriteStream('file'));
fs.createReadStream('file').pipe(request.put(url))
request(url).pipe(request.put(url));
http.createServer(function (req, res) {
  if (req.url === 'file.png') {
    if (req.method === 'PUT') {
      req.pipe(fs.createWriteStream('file'));
    } else if (req. method === 'GET' || req.method === 'HEAD') {
      request.get(url).pipe(res);
    }
  }
});

var cookie = request.cookie('key1=value1');
var j = request.jar();
j.setCookie(cookie, url);
request({
  url: url,
  jar: j
}, function () {
  var cookie_string = j.getCookieString(url);
  var cookies = j.getCookies(url);
});


/**
 * get
 */
request.get({
  url: url,
  qs: {
    key: 1
  },
  json: true
});
request.get(url, {
  timeout: 1500
}, function (err, response, body) {
}).
request.get(url);

/**
 * post
 */
request.post(url, {
  form: {
    key: 1
  }
});
request.post(url).form({
  key: 1
});
request.post({
  url: url,
  form: {
    key: 1
  }
}, function (err, response, body) {
});
request.post({
  url: url,
  formData: {
    file: fs.createReadStream('file')
  }
}, function (err, response, body) {
});
var form = request.post(url, function (err, response, body) {
}).form();
form.append('file', fs.createReadStream('file'))

/**
 * others
 */
request.put(url);
request.patch(url);
request.head(url);
request.del(url);

