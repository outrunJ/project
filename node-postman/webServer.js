/**
 * Created by outrun on 10/21/15.
 */
var express = require('express'),
//favicon = require('serve-favicon'),
//serveStatic = require('serve-static'),
//bodyParser = require('body-parser');
  path = require('path'),
  connect = require('connect'),
  xmlparser = require('express-xml-bodyparser'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session),
  cookieParser = require('cookie-parser');

var webConf = require('./app/server/config/webConf'),
  router = require('./app/server/router'),
  logConfig = require('./app/server/lib/logger'),
  middlewares = require('./app/server/middleware/index');

//var jsonParser = bodyParser.json();
var app = express();

// execute
//bodyParser.urlencoded({extended: true});
//app.use(serveStatic(__dirname + webConf.CLIENT_DIR));
//app.use(favicon(__dirname + webConf.ICO_DIR));
//app.use(jsonParser);
app.set('env', process.env.NODE_ENV || 'test')
  .use(connect.static(path.join(__dirname + webConf.CLIENT_DIR)))
  .use(connect.favicon(path.join(__dirname + webConf.ICO_DIR)))
  .use(connect.json())
  .use(connect.urlencoded())
  .use(xmlparser())
  .use(cookieParser())
  .use(logConfig.log4js.connectLogger(logConfig.getLogger(logConfig.categories.WEB), logConfig.configs))
  //.use(session({
  //  store: new RedisStore({
  //    host: 'localhost',
  //    port: 6379,
  //    ttl: 2592000
  //  }),
  //  secret: 'keyboard cat',
  //  cookie: {maxAge: 600000},
  //  resave: true,
  //  saveUninitialized: true
  //}));

middlewares(app);
router(app);

module.exports = app;
