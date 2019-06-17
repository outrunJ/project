/**
 * Created by outrun on 11/2/15.
 */

var router = require('express').Router();
var UserCtl = require('../ctl/UserCtl');

router.post('/user', UserCtl.addUser);
router.get('/user', UserCtl.login);

module.exports = exports = router;
