/**
 * Created by outrun on 17/08/14.
 */
var uuid = require('node-uuid')
    , myUtil = require('../../utils/myUtil')
    , groups_s = require('../../entity/group_s')
    , commandHandler = require('./s_commandHandler').commandHandler
    , c_spot = require('../../constants/c_spot')
    , c_sys = require('../../constants/c_sys')
    , c_beam = require('../../constants/c_beam');

// initialize
var p_send = c_sys.p_send;
var contents = c_spot.contents;
var sys_retType = c_sys.retType;
var p_receive = c_sys.p_receive;

function handle(io, ioBeam, users, beamUsers, spot) {
    io.on('connection', function (socket) {
        socket.emit(p_send.open);

        var iUuid = uuid.v4();
        var client = socket.vClient = {
            uuid: iUuid,
            time: myUtil.getTime(),
            color: myUtil.getColor(),
            socket: socket
        };
        users[iUuid] = client;

        var retObj = {};
        retObj[contents.time] = client.time;
        retObj[contents.color] = client.color;
        retObj[contents.uuid] = client.uuid;
        var recObj = {};
        recObj[contents.time] = retObj[contents.time];
        recObj[contents.color] = c_sys.props.color;
        recObj[contents.uuid] = retObj[contents.uuid];

        var b_retObj = myUtil.clone(retObj);

        var bag = {};
        bag['type'] = '';
        bag['client'] = client;
        bag['socket'] = socket;
        bag['ioBeam'] = ioBeam;
        bag['spot'] = spot;
        bag['retObj'] = retObj;
        bag['b_retObj'] = b_retObj;
        bag['recObj'] = recObj;

        socket.on('message', function (msg) {
            if (msg != null) {
                try {
                    msg = JSON.parse(msg);
                    bag['command'] = msg[p_receive.com];
                    bag['content'] = msg[p_receive.cont];
                    commandHandler(bag);
                } catch (e) {
                    recObj[contents.text] = e.message;
                    type = sys_retType.err;

                    myUtil.eSocket(p_send.sys, 422, type, recObj, socket);
                    console.log(e);
                }
            }
        });
        socket.on('disconnect', function () {
            var user = spot.users[client.userId];
            if (!user) return;
            var group = user.groups[client.identity];
            if (!group) return;
            var sockets = group.socket;
            // delete the group relationships with this socket
            if (spot.users[client.userId]) {
                delete sockets[client.uuid];
                // delete the group if it is null
                if (Object.keys(sockets).length == 0) {
                    delete user.groups[client.identity];
                }
                // delete the user if it is null
                if (Object.keys(user.groups).length == 0) {
                    delete spot.users[client.userId];
                }
            }
        });
    });
    io.on('disconnect', function () {
    });
};

exports.handle = handle;