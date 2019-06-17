/**
 * Created by outrun on 3/7/16.
 */

var express = require('express'),
  path = require('path'),
  connect = require('connect'),
  xmlparser = require('express-xml-bodyparser'),
  session = require('express-session'),
  swig = require('swig'),
  cookieParser = require('cookie-parser');
var webConf = require('./app/server/config/webConf'),
  router = require('./app/server/router');

var app = express();

app.set('env', process.env.NODE_ENV || 'test')
.use(connect.static(path.join(__dirname + webConf.CLIENT_DIR)))
.use(connect.json());

router(app);

module.exports = app;