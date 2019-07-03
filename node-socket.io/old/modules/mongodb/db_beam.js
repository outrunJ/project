/**
 * Created by outrun on 9/1/14.
 */
var c_mongodb = require('../constants/c_mongodb')
    , model = require('./db_model')
    , async = require('async')
    , c_db = require('../constants/c_mongodb');

var collection = c_mongodb.collections.nondelivery;
var nondelivery = c_mongodb.nondelivery;
var acquire = model.model_pool_acquire;
// var pooled = model.model_pool_pooled;

var store_nondelivery = function (pool, savObj, cb) {
    acquire(pool, exec);

    function exec(db) {
        var mem2save = {};
        mem2save[nondelivery.s_id] = savObj.uuid;
        mem2save[nondelivery.s_color] = savObj.color;
        mem2save[nondelivery.timing] = savObj.time;
        mem2save[nondelivery.d_id] = savObj.userId;
        mem2save[nondelivery.cont] = savObj.text;

        db.collection(collection).save(mem2save, function (err, result) {
        });
        if (cb) cb();
    }
};

var query_nondelivery = function (pool, cb) {
    acquire(pool, exec);

    function exec(db) {
        db.collection(collection).find().toArray(function (err, docs) {
            if (err) {
                console.log(err);
            } else {

                async.each(docs, function(doc){
                    cb(doc);
                });
                /* need to be async
                docs.forEach(function (doc) {
                    cb(doc);
                });*/
            }
        });
    }
};

var remove_nondelivery = function (pool, _ids, cb) {
    var removeObj = {};

    acquire(pool, exec);

    function exec(db) {

        async.each(_ids, function (_id) {
            removeObj[c_mongodb.keys._id] = _id;
            db.collection(collection).remove(removeObj, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }, function (err) {
            if (err) {
                console.log(err);
            } else {
                if (cb) cb();
            }
        });

        /* need to be async
         _ids.forEach(function (_id) {
         removeObj[c_mongodb.keys._id] = _id;
         db.collection(collection).remove(removeObj, function (err) {
         if (err) {
         console.log(err);
         }
         })
         });
         if (cb) cb();
         */
    }
};

exports.store_nondelivery = store_nondelivery;
exports.query_nondelivery = query_nondelivery;
exports.remove_nondelivery = remove_nondelivery;