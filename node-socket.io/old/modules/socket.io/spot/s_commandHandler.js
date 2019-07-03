/**
 * Created by outrun on 25/08/14.
 */
var myUtil = require('../../utils/myUtil')
    , c_spot = require('../../constants/c_spot')
    , User = require('../../entity/user').User
    , Group = require('../../entity/group_s').Group_s
    , Func = require('./func/s_func').Func;

// init
var commands = c_spot.spotsCommands;

function commandHandler(bag) {
    // static
    var func = new Func(bag);

    with (bag) {
        // handle the protocol

        // identify the command
        if (command == null) {
            return;
        }
        // identify the identity
        if (command == commands.identify) {
            func.invoke('identify');
        } else if (command == commands.report) {
            func.invoke('report');
        } else if (command == commands.user) {
            func.invoke('user');
        }
    }
}

exports.commandHandler = commandHandler;