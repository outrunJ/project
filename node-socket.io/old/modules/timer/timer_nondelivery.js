/**
 * Created by outrun on 9/1/14.
 */
var notifyUser = require('../socket.io/beam/func/b_func').notifyUser
    , db_beam = require('../mongodb/db_beam')
    , nondelivery = require('../constants/c_mongodb').nondelivery
    , c_spot = require('../constants/c_spot');

var props = {};
var query = db_beam.query_nondelivery;
var remove = db_beam.remove_nondelivery;
var c_contents = c_spot.contents;


function start(pool, spot, interval) {
    var _id;
    var c_retObj = {};
    var user;

    function callback(doc) {
        _id = doc._id;
        delete doc._id;
        c_retObj[c_contents.uuid] = doc[nondelivery.s_id];
        c_retObj[c_contents.time] = doc[nondelivery.timing];
        c_retObj[c_contents.color] = doc[nondelivery.s_color];
        c_retObj[c_contents.text] = doc[nondelivery.cont];

        user = spot.users[doc[nondelivery.d_id]];
        if (user) {
            notifyUser(c_retObj, user, function (notifiedCount) {
                if (notifiedCount != 0) {
                    // delete this document
                    remove(pool, [_id]);
                }
            });
        }
    };

    props.id = setInterval(function () {
        // select undelivered msg s from db and delivery them
        query(pool, callback);
    }, interval);
}

function stop() {
    clearInterval(props.id);
}

exports.start = start;
exports.stop = stop;