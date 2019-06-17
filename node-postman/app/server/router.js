/**
 * Created by outrun on 10/21/15.
 */
var requireDir = require('require-dir');

var webConf = require('./config/webConf');

var routers = requireDir('./routers');

module.exports = function(app){
    for(var key in routers){
        app.use(webConf.API_ROOT, routers[key]);
    }
};