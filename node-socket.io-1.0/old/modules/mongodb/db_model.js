/**
 * Created by outrun on 9/2/14.
 */

var model_pool_acquire = function (pool, exec, cb) {
    // can set priority here
    pool.acquire(function (err, db) {
        if (err) {
            console.log('pool err:' + err);
        } else {
            exec(db, cb);
            pool.release(db);
        }
    });
};
/*
var model_pool_pooled = function (pool, exec, args, cb) {

    console.log('abc');
    var publicFn, privateFn;
    var l_o;
    publicFn = pool.pooled(privateFn = function(db, args, cb){
        // l_o = exec(db);
        cb(null, args, l_o);
    });
    publicFn();
};*/

exports.model_pool_acquire = model_pool_acquire;