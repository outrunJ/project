/**
 * Created by outrun on 2/26/16.
 */

var express = require('express'),
//favicon = require('serve-favicon'),
//serveStatic = require('serve-static'),
//bodyParser = require('body-parser');
  path = require('path'),
  connect = require('connect'),
  xmlparser = require('express-xml-bodyparser'),
  session = require('express-session'),
  swig = require('swig'),
  cookieParser = require('cookie-parser');

var webConf = require('./app/server/config/webConf'),
  router = require('./app/server/router'),
  logConfig = require('./app/server/lib/logger'),
  middlewares = require('./app/server/middleware/index');

var app = express();

app.set('env', process.env.NODE_ENV || 'test')
  .use(connect.static(path.join(__dirname + webConf.CLIENT_DIR)))
  .use(connect.favicon(path.join(__dirname + webConf.ICO_DIR)))
  .use(connect.json())
  .use(connect.urlencoded())
  .use(xmlparser())
  .use(cookieParser())
  .use(logConfig.log4js.connectLogger(logConfig.getLogger(logConfig.categories.WEB), logConfig.configs))

app.set('views', path.join(__dirname + webConf.VIEW_DIR));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

middlewares(app);
router(app);

module.exports = app;
