/**
 *
 * Created by outrun on 2/26/16.
 */

var router = require('express').Router();
var AdminCtl = require('../ctl/AdminCtl');

router.post('/register', AdminCtl.register);
router.post('/login', AdminCtl.login);
router.get('/logout', AdminCtl.logout);
router.put('/', AdminCtl.updAdmin);
router.get('/count', AdminCtl.count)

module.exports = router;
