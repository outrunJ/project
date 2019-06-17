/**
 * Created by outrun on 2/28/16.
 */

var router = require('express').Router();

var CargoCtl = require('../ctl/CargoCtl');

router.post('/adminMultiPhoto', CargoCtl.addAdminMultiPhoto);
router.get('/multi', CargoCtl.getMulti);
router.delete('/multi', CargoCtl.delMulti);
router.put('/', CargoCtl.upd);

module.exports = router;