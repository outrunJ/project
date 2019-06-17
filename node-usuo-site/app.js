/**
 *
 * Created by outrun on 3/7/16.
 */

var config = require('./app/server/config/webConf'),
  app = require('./server');

app.listen(config.PORT);

process.on('uncaughtException', function (err) {
  console.log('uncaughtException', err);
});

console.log('app started at', config.PORT);