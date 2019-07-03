/**
 * Created by outrun on 17/08/14.
 */
var c_sys = require('../constants/c_sys');
var p_send = c_sys.p_send;

function nextFrag(progr, strIn) {
    if (strIn != null && '' != strIn) {
        var last = strIn.indexOf(' ', progr);
        if (last === -1) {
            return strIn.substring(progr);
            ;
        }
        return strIn.substring(progr, last);
    }
    return strIn;
};
function getTime() {
    var date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function getColor() {
    var colors = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'pink', 'red', 'green',
        'orange', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function clone(obj) {
    if (typeof(obj) != 'object' || obj == null) return obj;
    var retObj = new Object();
    for (var i in obj) {
        retObj[i] = clone(obj[i]);
    }
    return retObj;
}

function eSocket(option, code, type, retObj, socket) {
    var emitObj = {};
    var c_obj;
    var sub_emitObj;
    var sub_c_obj;
    if (option === p_send.msg) {
        c_obj = p_send._msg;
        sub_c_obj = c_obj._res;
        sub_emitObj = emitObj[c_obj.res] = {};

        emitObj[c_obj.code] = code;
        sub_emitObj[sub_c_obj.type] = type;
        sub_emitObj[sub_c_obj.cont] = retObj;

    } else if (option === p_send.sys) {
        c_obj = p_send._sys;
        sub_c_obj = c_obj._res;
        sub_emitObj = emitObj[c_obj.res] = {};

        emitObj[c_obj.code] = code;
        sub_emitObj[sub_c_obj.type] = type;
        sub_emitObj[sub_c_obj.cont] = retObj;
    } else {
        return;
    }
    // emit
    socket.emit(option, emitObj);
}

exports.nextFrag = nextFrag;
exports.getTime = getTime;
exports.getColor = getColor;
exports.clone = clone;
exports.eSocket = eSocket;