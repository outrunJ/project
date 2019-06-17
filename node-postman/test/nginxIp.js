/**
 * Created by outrun on 1/29/16.
 */

var request = require('request');

var requsetHost = () => {
  request('http://192.168.56.101', (err, response, body) => {
    if (err) {
      console.log('err: ', err);
    } else {
      if(/hello/.test(body)) {
        console.log('pass');
      } else {
        console.log('denied');
      }
    }
  });
};

var run = () => {
  "use strict";
  test1();
};

var test1 = () => {
  "use strict";
  for (var i = 0; i < 7; i++) {
    requsetHost();
  }
};
var test2 = () => {
  "use strict";
  setInterval(requsetHost, 1000/30);
};

run();
