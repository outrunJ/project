/**
 * Created by outrun on 9/1/14.
 */
var retType = {
    err: 'err',
    // receipt
    rec: 'rec'
};
var p_send = {
    open: 'open',
    sys: 'sys',
    _sys: {
        code: 'code',
        res: 'res',
        _res: {
            type: 'type',
            cont: 'cont'
        }
    },
    msg: 'msg',
    _msg: {
        code: 'code',
        res: 'res',
        _res: {
            type: 'type',
            cont: 'cont'
        }
    }
};
var p_receive = {
    com: 'com',
    cont: 'cont'
};

var props = {
    color: 'LawnGreen'
};

exports.retType = retType;
exports.p_send = p_send;
exports.p_receive = p_receive;
exports.props = props;
