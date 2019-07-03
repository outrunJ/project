/**
 * Created by outrun on 9/1/14.
 */
var info = {
    db: 'aurora',
    host: 'localhost',
    user: 'admin',
    pwd: 'admin'
};
var collections = {
    nondelivery: 'nondelivery'
};
var keys = {
    _id: '_id'
};
var nondelivery = {
    s_id: "s_id",
    s_color: "s_color",
    timing: "timing",
    d_id: "d_id",
    cont: "cont"
};

exports.info = info;
exports.collections = collections;
exports.keys = keys;
exports.nondelivery = nondelivery;