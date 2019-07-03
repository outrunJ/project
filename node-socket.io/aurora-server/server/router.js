var requiredir = require('require-dir');
var Router = require('koa-router');

var webconf = require('../config/webconf');

var routers = requiredir('./routers');

var router = new Router({
  prefix: webconf.API_ROOT
});


let dirouter;
for (let key in routers) {
  dirouter = routers[key];
  router.use('/' + key, dirouter.routes(), dirouter.allowedMethods())
}

module.exports = router;