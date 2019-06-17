const cons = require('../cons')
const util = require('../tool/util')
const _ = require('underscore')
const cacheAppVer = require('../cache/appVer')

exports.version = function (ctx, next) {
  ctx.body = {
    ver: cons.version.app,
    urls: cacheAppVer.cache().o
  }
  next()
}

exports.refresh = function (ctx, next) {
  return cacheAppVer.refresh().then(function () {
    ctx.body = 0
    next()
  })
}