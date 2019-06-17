/**
 *
 * Created by outrun on 3/7/16.
 */
var router = require('express').Router();

var OrderCtl = require('../ctl/OrderCtl');

router.post('/adminOrderCargo', OrderCtl.addAdminOrderCargo);
router.post('/', OrderCtl.create);
router.get('/multi', OrderCtl.getMulti)

module.exports = router;
