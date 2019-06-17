/**
 *
 * Created by outrun on 2/26/16.
 */

var router = require('express').Router();
var UserCtl = require('../ctl/UserCtl');

router.post('/login', UserCtl.login);

module.exports = router;
