var app = require('./webserver');

var PORT = 9602;

app.listen(PORT);

app.on('error', function (err, ctx) {
  console.log('server error', err, ctx);
});