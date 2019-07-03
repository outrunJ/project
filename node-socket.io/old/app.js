/**
 * Created by outrun on 16/08/14.
 */
// ignore the ip issue temporarily
// probably, we can identify single user by ip

var express = require('express')
    , path = require('path')
    , uuid = require('node-uuid')
    , http = require('http')
    , io = require('socket.io')
    , ioBeamHande = require('./modules/socket.io/beam/beamHandler').handle
    , ioSpotHande = require('./modules/socket.io/spot/spotHandler').handle
    , appBeam = express()
    , appSpot = express()
    , serverBeam = http.createServer(appBeam)
    , serverSpot = http.createServer(appSpot)
    , ioBeam = io.listen(serverBeam)
    , ioSpot = io.listen(serverSpot)
    , Spot = require('./modules/entity/spot').Spot
    , pool = require('./modules/mongodb/dbPool')
    , Wind = require('wind')
    , dbBeam = require('./modules/mongodb/db_beam')
    , timers = require('./modules/timer/timers');

// test codes


// initialize
var spot = new Spot();
var beamUsers = {};
var spotUsers = {};
if (!pool) {
    err = 'no db collections';
    throw err;
}
timers.start(pool, spot);

// logical codes
ioBeamHande(ioBeam, ioSpot, beamUsers, spotUsers, spot, pool, dbBeam);
ioSpotHande(ioSpot, ioBeam, spotUsers, beamUsers, spot);

// set express
appBeam.set('port', process.env.PORT || 2012);
appBeam.set('views', __dirname + '/views/beam');
appBeam.use(express.favicon());
appBeam.use(express.logger('dev'));
appBeam.use(express.bodyParser());
appBeam.use(express.methodOverride());
appBeam.use(appBeam.router);
appBeam.use(express.static(path.join(__dirname, 'public')));
if('d54evelopment' == appBeam.get('env')){
    appBeam.use(express.errorHandler());
}
appBeam.get('/', function (req, res) {
    res.sendfile(appBeam.get('views') + '/index.html');
});
serverBeam.listen(appBeam.get('port'), function () {
    console.log("Beam server on port +" + appBeam.get('port') + " has started.");
});


// log level
ioBeam.set('log level', 1);
ioSpot.set('log level', 1);

appSpot.set('port', process.env.PORT || 2014);
appSpot.set('views', __dirname + '/views/spots');
appSpot.use(express.favicon());
appSpot.use(express.logger('dev'));
appSpot.use(express.bodyParser());
appSpot.use(express.methodOverride());
appSpot.use(appSpot.router);
appSpot.use(express.static(path.join(__dirname, 'public')));
if('d54evelopment' == appSpot.get('env')){
    appSpot.use(express.errorHandler());
}
appSpot.get('/', function (req, res) {
    res.sendfile(appSpot.get('views') + '/tobacco.html');
});
appSpot.get('/tobacco', function (req, res) {
    res.sendfile(appSpot.get('views') + '/tobacco.html');
});
appSpot.get('/rtms', function (req, res) {
    res.sendfile(appSpot.get('views') + '/rtms.html');
});
appSpot.get('/android', function (req, res) {
    res.sendfile(appSpot.get('views') + '/android.html');
});
appSpot.get('/chart', function (req, res) {
    res.sendfile(appSpot.get('views') + '/chart.html');
});
serverSpot.listen(appSpot.get('port'), function () {
    console.log("Spot server on port +" + appSpot.get('port') + " has started.");
});