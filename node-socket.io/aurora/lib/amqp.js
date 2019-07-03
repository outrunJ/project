var amqp = require('amqplib/callback_api')
  ;

var config = require('../config/config')
  ;


amqp.connect(config.AMQP_HOST, function (err, conn) {
  if (!err) {
    conn.createChannel(function (err, ch) {
      var q = 'talkto';

      ch.assertQueue(q, {durable: false});
      ch.consume(q, function (msg) {
        if (msg) {
          console.log(msg.content.toString())
        }
      }, {noAck: true})
    });
  }
});

