/**
 * Created by outrun on 10/22/15.
 */
var router = require('express').Router();
var DemoCtl = require('../ctl/DemoCtl');

router.post('/httpRequest', DemoCtl.httpRequest);
router.get('/demo', DemoCtl.demoGet);
router.post('/demo', DemoCtl.demoPost);
router.put('/demo', DemoCtl.demoPut);
router.delete('/demo', DemoCtl.demoDelete);
router.post('/demo/snapshot', DemoCtl.saveSnapshot);
router.get('/demo/snapshot', DemoCtl.getAllSnapshot);

module.exports = exports = router;