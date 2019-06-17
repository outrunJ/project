/**
 * Created by outrun on 2/26/16.
 */

var requireDir = require('require-dir'),
  router = require('express').Router();

var config = require('./config/webConf');

var apiRouters = requireDir('./router_api'),
  viewRouters = requireDir('./router_view');


router.get('/', function (req, res) {
  "use strict";
  res.redirect('/view/?topNav=0&subNav=1#/upload/admin');
});


module.exports = function (app) {
  app.use(router);
  for (var key in apiRouters ) {
    app.use(config.API_ROOT + '/' + key, apiRouters[key]);
  }
  for (var key in viewRouters ) {
    app.use(config.VIEW_ROOT, viewRouters[key]);
  }
};
