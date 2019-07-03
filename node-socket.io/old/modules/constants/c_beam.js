/**
 * Created by outrun on 25/08/14.
 */
var c_bs = require('./c_bs');
var bs_retType = c_bs.retType;

var beamRooms = {
    tobacco: 'tobacco',
    rtms: 'rtms',
    android: 'android',
    admin: 'admin'
};
var beamCommands = {
    identify: 'identify',
    order: 'order',
    sayTo: 'say to',
    sendTo: 'send to'
};
var contents = {
    uuid: 'uuid',
    identify: 'identify',
    time: 'time',
    color: 'color',
    text: 'text'
};

exports.beamRooms = beamRooms;
exports.beamCommands = beamCommands;
exports.contents = contents;