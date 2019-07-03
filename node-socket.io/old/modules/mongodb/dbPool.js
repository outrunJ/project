/**
 * Created by outrun on 9/1/14.
 */
var mongodb = require('mongodb')
    , Pool = require('generic-pool')
    , c_mongodb_info = require('../constants/c_mongodb').info;

var Db = mongodb.Db;
var Conn = mongodb.Connection;
var Server = mongodb.Server;


var pool = Pool.Pool({
    name: 'mongodb',
    create: function (callback) {

        var server_options = {
            auto_reconnect: false,
            poolSize: 1
        };
        var db_options = {
            w: -1,// 设置w=-1是mongodb 1.2后的强制要求，见官方api文档
            safe: true,
            logger: {
                doDebug: true,
                debug: function (msg, obj) {
                    console.log('[debug]', msg);
                },
                log: function (msg, obj) {
                    console.log('[log]', msg);
                },
                error: function (msg, obj) {
                    console.log('[error]', msg);
                }
            }
        };
        var server = new Server(c_mongodb_info.host, Conn.DEFAULT_PORT, server_options);
        var db = new Db(c_mongodb_info.db, server, db_options);
        db.open(function (err, db) {
            if (err) return console.error(err);
            console.log('mongodb connected');
            callback(null, db);
        });

    },
    destroy: function (db) {
        db.close();
    },
    max: 10,
    min: 2,
    idleTimeoutMillis: 3000,
    log: false
});

/* pool.acquire delivery itself to Pool.create as callback
 pool.acquire(function (err, db) {
 if (err) {
 console.log('pool err:' + err);
 } else {
 db.collection('foo2').save({test: 1}, function (err, result) {
 });
 pool.release(db);
 }
 });*/

module.exports = pool;