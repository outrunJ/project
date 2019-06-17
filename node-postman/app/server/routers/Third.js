/**
 * Created by outrun on 5/2/16.
 */
var router = require('express').Router();
var DemoCtl = require('../ctl/DemoCtl');

router.get('/rssCNN', DemoCtl.demoGet);

module.exports = exports = router;