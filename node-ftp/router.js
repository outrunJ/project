const Router = require('koa-better-router')
const resCtl = require('./ctl/res')
const infoCtl = require('./ctl/info')
var router = Router().loadMethods()


router.get('/res/dirNames', resCtl.dirNames)
router.get('/res/dirName/urls', resCtl.dirNameUrls)
router.get('/res/refresh', resCtl.refresh)
router.get('/info/version', infoCtl.version)
router.get('/info/refresh', infoCtl.refresh)

module.exports = router

