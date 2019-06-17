/**
 * Created by outrun on 9/5/14.
 */
myUtil = require('../../../utils/myUtil')
    , c_beam = require('../../../constants/c_beam')
    , c_spot = require('../../../constants/c_spot')
    , roomsRelativities = require('../../../constants/c_relation_groups').beamRoomRelativities
    , c_sys = require('../../../constants/c_sys')
    , Wind = require('wind')
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

// socket and callback can be null
function notifyUser(retObj, user, cb) {

    var notifiedCount = 0;
    var type = retType.beam.sendTo;
    var sockets;
    var notifyAsync = eval(Wind.compile("async", function () {
        for (var groupKey in user.groups) {
            sockets = user.groups[groupKey].socket;
            // send to all sockets in this user's specific group
            for (var uuid in sockets) {
                myUtil.eSocket(p_send.msg, 200, type, retObj, sockets[uuid]);
                notifiedCount++;
            }
        }
        if (cb) cb(notifiedCount);
    }));
    notifyAsync().start();
}


// need to be extract
function Func(bag) {
    this.bag = bag;
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
        // identify the identity
        var identity = content;

        // join in beam room
        for (var roomName in rooms) {
            if (roomName == identity) {
                socket.join(roomName);
                client.identity = roomName;

                retObj[contents.identify] = roomName;
                retObj[contents.text] = retObj['uuid'];
                type = retType.fusion.identify;

                myUtil.eSocket(p_send.msg, 200, type, retObj, socket);
            }
        }
    }
};
var order = function (bag) {
    with (bag) {
        var orderedMsg = content;
        s_retObj[s_contents.identify] = client.identity;
        s_retObj[s_contents.text] = orderedMsg;
        retObj[contents.identify] = s_retObj[s_contents.identify];
        retObj[contents.text] = s_retObj[s_contents.text];
        type = retType.beam.order;
        // broadcast to corresponding spots by spots 's room
        // ioSpot.to(roomsRelativities[client.identity]).emit('system', retObj);
        myUtil.eSocket(p_send.msg, 200, type, s_retObj, ioSpot.sockets.in(roomsRelativities[client.identity]));
        // return to itself
        myUtil.eSocket(p_send.msg, 200, type, retObj, socket);
    }
};

var sendTo = function (bag) {
    with (bag) {
        function sendPersistence(bag) {
            with (bag) {
                var savObj = myUtil.clone(s_retObj);
                retObj[s_contents.text] = 'user is offline:' + userId + ". but you'll success when he logs in.";

                type = retType.fusion.fail;

                // need to be variational
                savObj['userId'] = userId;
                savObj['text'] = cont;
                // store the offline userId and the undelivered content
                dbBeam.store_nondelivery(pool, savObj);
            }
        }

        // determine permission
        if (client.identity !== rooms.admin) {
            return;
        }

        var userId = content.user;
        var cont = content.cont;
        // determine parameters 's format
        if (!userId || !cont) {
            return;
        } else {
            recObj[contents.text] = 'sys has got your ' + commands.sendTo + ' msg.';
            // send receipt
            myUtil.eSocket(p_send.sys, 200, sys_retType.rec, recObj, socket);
        }

        type = retType.beam.sendTo;

        var user = spot.users[userId];
        // if there is no user all user 's sockets is none, store this user and this content
        if (user) {
            s_retObj[s_contents.text] = cont;
            notifyUser(s_retObj, user, function (notifiedCount) {
                if (notifiedCount == 0) {
                    sendPersistence(bag);
                } else {
                    this.s_retObj = s_retObj;
                }
            });
            retObj[contents.text] = s_retObj[s_contents.text];
        } else {
            sendPersistence(bag);
        }
        myUtil.eSocket(p_send.msg, 200, type, retObj, socket);
    }
};


exports.Func = Func;
exports.notifyUser = notifyUser;