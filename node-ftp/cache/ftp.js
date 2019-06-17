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
  let o = _cache.o = {}
  let dirInfos = _cache.dirInfos = []

  return util.dirNames(cons.resDir).then(function (dirNames) {
    dirNames = _.reject(dirNames, (name)=> {
      return cons.rejectDirNames.indexOf(name) != -1
    })

    let missions = _.map(
      dirNames,
      (dirName) => {
        return util.dirNames(`${cons.resDir}/${dirName}`)
      }
    )


    return Promise.all(missions).then(function (dirsPicNames) {
      dirsPicNames.forEach((picNames, ind)=> {
        let dirName = dirNames[ind]
        let picInfos = o[dirName] = _.map(picNames, (picName)=> {
          return {
            picName: picName,
            name: picName,
            url: `${cons.host}/${dirName}/${picName}`
          }
        })

        dirInfos.push({
          name: dirName,
          cover: picInfos[0] || {
            picName: '',
            name: '',
            url: ''
          }
        })

      })

      cache.setCache(_cache)
    })

  }, function (e) {
    console.log(e)
    // process.exit(1)
  })
}

module.exports.cache = cache.getCache
module.exports.refresh = refresh




