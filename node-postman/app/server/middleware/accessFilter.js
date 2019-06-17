var //url = require('url'),
  async = require('async'),
  acsConf = require('../config/accessConf'),
  webConf = require('../config/webConf');
var acsMappings = acsConf.mappings,
  acsLevels = acsConf.levels,
  acsPRGrps = acsConf.prefixesGroups;
var staticResReg = /\.(js|css|jpg|swf|gif|png)$/,
  ERR_FOUNDED_BREAK = 'has founded.';

module.exports = function (opt) {

  opt = opt || {};

  return function (req, res, next) {

    var pathname = req.originalUrl;

    if (typeof  pathname != 'string')
      next();
    // static resources
    else if (staticResReg.test(pathname))
      next();
    // access validate
    else {
      var usrLevel = req.acsLevel || acsLevels.guest,
      // specific path come first
        curLevel = acsMappings[pathname];
      // prefixes group follows
      if (!curLevel)
        async.eachSeries(Object.keys(acsPRGrps), function (group, cb) {
          if (pathname.indexOf(group) != -1) {
            curLevel = acsPRGrps[group];
            cb(ERR_FOUNDED_BREAK);
          } else
            cb();
        }, function (err) {
          if (err && err != ERR_FOUNDED_BREAK)
            console.error('accessFilter access groups\' loop err: ', err);
        });
      // if the match not found , then set the default value
      curLevel = curLevel || acsLevels.guest;

      //console.log('pathname: ', pathname);
      //console.log('curLevel: ', curLevel);
      //console.log('usrLevel: ', usrLevel);

      if (usrLevel >= curLevel)
        next();
      else
        deny();
    }

    function deny() {
      res.redirect(webConf.HOST + ':' + webConf.HOST + webConf.urls.login);
    }
  }
};