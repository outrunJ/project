const cons = require('../cons')
const util = require('../tool/util')
const _ = require('underscore')
const cacheFtp = require('../cache/ftp')

exports.dirNames = function (ctx, next) {
  ctx.body = cacheFtp.cache().dirInfos
  next()
}

exports.dirNameUrls = function (ctx, next) {
  let dirName = ctx.query.dirName

  if (dirName) {
    ctx.body = cacheFtp.cache().o[dirName]
  }
  next()
}

exports.refresh = function (ctx, next) {
  return cacheFtp.refresh().then(function () {
    ctx.body = 0
    next()
  })
}