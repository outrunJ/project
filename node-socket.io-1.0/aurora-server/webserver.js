var koa = require('koa'),
  views = require('koa-views'),
  serve = require('koa-static');

var router = require('./server/router');

var app = new koa();

app.use(serve('client/static'));

app.use(views(__dirname + 'client/views', {
  map: {
    html: 'underscore'
  }
}));

app.use(router.routes());

module.exports = app;
