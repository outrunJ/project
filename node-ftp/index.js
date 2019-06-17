require('babel-core/register')
require('babel-polyfill')

const Koa = require('koa')
const serve = require('koa-static')
const jcwMdw = require('./mdw/jsonCodeWrapper')
const logMdw = require('./mdw/log')
const jnrMdw = require('./mdw/jsonNoResult')
const router = require('./router')
const cacheFtp = require('./cache/ftp')
const cacheAppVer = require('./cache/appVer')
const cons = require('./cons')

const app = new Koa()

function init() {
  return Promise.resolve().then(()=> {
    return cacheFtp.refresh()
  }).then(()=>{
    return cacheAppVer.refresh()
  }).then(()=> {
    app.use(router.middleware())
    app.use(jcwMdw)
    app.use(logMdw)
    app.use(serve(cons.resDir))
    app.use(jnrMdw)

    app.listen(3000)
  })
}

init()

