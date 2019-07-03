var router = require('koa-router')();

var userctl = require('../module/user/userctl');

router.get('/', userctl.getuser);

module.exports = router;