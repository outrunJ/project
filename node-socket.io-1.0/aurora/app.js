var Server = require('socket.io');
require('./lib/amqp');

var io = new Server();


var PORT = 9601;

io.sockets.emit('sent to all');
io.emit('send to all again');
io.on('connection', function (socket) {
  console.log('connencted one.');
  socket.on('event', function (id, msg) {
    socket.emit('event', {data: 'data'});
  });
  socket.emit('connected', {some: 'data'})
});

io.listen(PORT);