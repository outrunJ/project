/**
 * Created by outrun on 2/26/16.
 */
var config = require('./app/server/config/webConf'),
  app = require('./server');

app.listen(config.PORT);

process.on('uncaughtException', function(err){
  console.log('uncaughtException', err);
});

console.log('app started', config.PORT);
