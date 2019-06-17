const util = require('../tool/util')
const _ = require('underscore')
const cons = require('../cons')


let cache = (function cacheFn() {

  let cache = {}

  return {
    getCache () {
      return cache
    },
    setCache (c){
      cache = c
    }
  }
}())


function refresh() {
  let _cache = {}

  return util.dirNames(cons.appDir).then((appNames)=> {
    _cache.o = _.map(appNames, (appName)=> {
      return {
        name: appName,
        url: `${cons.host}/${cons.appDirName}/${appName}`
      }
    })

    cache.setCache(_cache)
  })

}

module.exports.cache = cache.getCache
module.exports.refresh = refresh


