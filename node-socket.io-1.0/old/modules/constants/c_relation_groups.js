/**
 * Created by outrun on 25/08/14.
 */
var beamRooms = require('./c_beam').beamRooms;
var spotsRooms = require('./c_spot').spotsRooms;

var beamRoomRelativities = {};

var spotsRoomRelativities = {};

beamRoomRelativities[beamRooms.tobacco] = spotsRooms.tobacco;
beamRoomRelativities[beamRooms.rtms] = spotsRooms.rtms;
beamRoomRelativities[beamRooms.android] = spotsRooms.android;
spotsRoomRelativities[spotsRooms.tobacco] = beamRooms.tobacco;
spotsRoomRelativities[spotsRooms.rtms] = beamRooms.rtms;
spotsRoomRelativities[spotsRooms.android] = beamRooms.android;

exports.beamRoomRelativities = beamRoomRelativities;
exports.spotsRoomRelativities = spotsRoomRelativities;