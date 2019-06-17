/**
 * Created by outrun on 10/27/15.
 */

var app = require('./webServer'),
  webConf = require('./app/server/config/webConf');

app.listen(webConf.PORT);
console.log('server listening on ', webConf.PORT);

process.on('uncaughtException', function(err){
  console.log('uncaughtException', err);
});

console.log('NODE_ENV: ', process.env['NODE_ENV']);
