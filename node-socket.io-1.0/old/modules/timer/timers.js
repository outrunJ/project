/**
 * Created by outrun on 9/1/14.
 */
var c_timer = require('../constants/c_timer')
    , nondelivery = require('./timer_nondelivery');

var settings = c_timer.settings;

function start(pool, spot){
    nondelivery.start(pool, spot, settings.interval * 1000);
}
function stop(){}

exports.start = start;
exports.stop = stop;