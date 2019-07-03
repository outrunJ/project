/**
 * Created by outrun on 25/08/14.
 */
var c_bs = require('./c_bs');

var bs_retType = c_bs.retType;

var spotsRooms = {
    tobacco: 'tobacco',
    rtms: 'rtms',
    android: 'android'
};

var spotsCommands = {
    identify: 'identify',
    report: 'report',
    user: 'user'
};
var group_s = {
    socket: 'socket'
};
var contents = {
    uuid: 'uuid',
    identify: 'identify',
    time: 'time',
    color: 'color',
    text: 'text',
    sendTo: 'sendTo'
};

exports.group_s = group_s;
exports.spotsRooms = spotsRooms;
exports.spotsCommands = spotsCommands;
exports.contents = contents;