/**
 * Created by outrun on 2/26/16.
 */
var router = require('express').Router();
var QiniuCtl = require('../ctl/QiniuCtl');

router.get('/uptoken/photos', QiniuCtl.uptokenPhotos);
router.get('/uptoken/avatars', QiniuCtl.uptokenAvatars);

module.exports = router;