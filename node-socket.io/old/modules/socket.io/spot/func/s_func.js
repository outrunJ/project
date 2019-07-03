/**
 * Created by outrun on 9/5/14.
 */

var myUtil = require('../../../utils/myUtil')
    , c_beam = require('../../../constants/c_beam')
    , c_spot = require('../../../constants/c_spot')
    , roomsRelativities = require('../../../constants/c_relation_groups').beamRoomRelativities
    , c_sys = require('../../../constants/c_sys')
    , User = require('../../../entity/user').User
    , Group = require('../../../entity/group_s').Group_s
    , myUtil = require('../../../utils/myUtil')
    , c_bs = require('../../../constants/c_bs');

// init
var commands = c_beam.beamCommands;
var rooms = c_beam.beamRooms;
var sys_retType = c_sys.retType;
var p_send = c_sys.p_send;
var contents = c_beam.contents;
var s_contents = c_spot.contents;
var retType = c_bs.retType;

function Func(bag) {
    this.bag = bag;
    /*if (typeof Func._initialized == 'undefined') {
     Func._initialized = true;
     }*/
}
Func.invoke = Func.prototype.invoke = function (enfunc) {
    Func_s.exec(enfunc, this.bag);
};
// static methods for dynamic proxy
function Func_s() {
}
Func_s.exec = function (target, bag) {

    eval(target + '(bag);');
};

var identify = function (bag) {
    with (bag) {
        // var identity = myUtil.nextFrag(progress, msg);
        // progress += identity.length + 1;
        var identity = content;

        // join in spots room
        for (var roomName in rooms) {
            if (roomName == identity) {
                socket.join(roomName);
                client.identity = roomName;

                retObj[contents.identify] = roomName;
                retObj[contents.text] = client.uuid;
                type = retType.fusion.identify;

                myUtil.eSocket(p_send.msg, 200, type, retObj, socket);
            }
        }
    }
};

var report = function (bag) {
    with (bag) {
        // spot wish to advice just one of the beam client, but we just test broadcast here　temporarily
        var reportedMsg = content;
        b_retObj[contents.identify] = client.identity;
        b_retObj[contents.text] = reportedMsg;
        retObj[contents.identify] = b_retObj[contents.identify];
        retObj[contents.text] = b_retObj[contents.text]
        type = retType.spot.report;

        // broadcast to corresponding spots by spots 's room
        // ioBeam.to(roomsRelativities[client.identity]).emit('system', retObj);
        myUtil.eSocket(p_send.msg, 200, type, b_retObj, ioBeam.sockets.in(roomsRelativities[client.identity]));
        // return to itself
        myUtil.eSocket(p_send.msg, 200, type, retObj, socket);
    }
};

var user = function (bag) {
    with (bag) {
        // identify the user, add user to spot object and register socket to group_s
        if (client.userId || !client.identity) {
            return;
        }
        var userId = content;
        var user;
        var group;
        if (!spot.users[userId]) {
            // attach user
            user = new User();
            spot.users[userId] = user;
        } else {
            user = spot.users[userId];
        }
        if (!user.groups[client.identity]) {
            group = new Group();
            user.groups[client.identity] = group;
        } else {
            group = user.groups[client.identity];
        }
        group.socket[client.uuid] = socket;
        client.userId = userId;

        // emit data back
        retObj[contents.identify] = client.identity;
        retObj[contents.text] = userId;
        type = retType.spot.user;

        myUtil.eSocket(p_send.msg, 200, type, retObj, socket);
    }
};

exports.Func = Func;