const fs = require('fs')
const Q = require('q')

exports.dirNames = function (path) {
  return Q.nfcall(fs.readdir, path)
}