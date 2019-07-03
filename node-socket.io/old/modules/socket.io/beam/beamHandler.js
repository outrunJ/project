/**
 * Created by outrun on 17/08/14.
 */

var uuid = require('node-uuid')
    , myUtil = require('../../utils/myUtil')
    , commandHandler = require('./b_commandHandler').commandHandler
    , c_beam = require('../../constants/c_beam')
    , c_spot = require('../../constants/c_spot')
    , c_sys = require('../../constants/c_sys');

var p_send = c_sys.p_send;
var sys_retType = c_sys.retType;
var contents = c_beam.contents;
var s_contents = c_spot.contents;
var p_receive = c_sys.p_receive;

function handle(io, ioSpot, users, spotUsers, spot, pool, dbBeam) {
    io.on('connection', function (socket) {
        socket.emit('open');

        var client = socket.vClient = {
            time: myUtil.getTime(),
            uuid: uuid.v4(),
            color: myUtil.getColor()
        };
        var retObj = {};
        retObj[contents.time] = client.time;
        retObj[contents.color] = client.color;
        retObj[contents.uuid] = client.uuid;

        var recObj = {};
        recObj[contents.time] = retObj[contents.time];
        recObj[contents.color] = c_sys.props.color;
        recObj[contents.uuid] = retObj[contents.uuid];

        var s_retObj = myUtil.clone(retObj);

        var bag = {};

        bag['type'] = '';
        bag['client'] = client;
        bag['socket'] = socket;
        bag['ioSpot'] = ioSpot;
        bag['spot'] = spot;
        bag['pool'] = pool;
        bag['dbBeam'] = dbBeam;
        bag['retObj'] = retObj;
        bag['s_retObj'] = s_retObj;
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
    });
    io.on('disconnect', function () {
        /*var obj = {
         time: myUtil.getTime(),
         color: client.color,
         author: 'System',
         text: client.name,
         type: 'disconnect'
         };

         // 广播用户已退出
         socket.emit('system', obj);
         */
    });
};

exports.handle = handle;