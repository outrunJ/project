/**
 * Created by outrun on 25/08/14.
 */
var myUtil = require('../../utils/myUtil')
    , c_beam = require('../../constants/c_beam')
    , c_spot = require('../../constants/c_spot')
    , roomsRelativities = require('../../constants/c_relation_groups').beamRoomRelativities
    , c_sys = require('../../constants/c_sys')
    , Wind = require('wind')
    , myUtil = require('../../utils/myUtil')
    , c_bs = require('../../constants/c_bs')
    , Func = require('./func/b_func').Func;

// init
var commands = c_beam.beamCommands;

function commandHandler(bag) {
    var func = new Func(bag);
// handle the protocol
    with (bag) {
        // identify the command
        if (command == null) {
            return;
        }
        // process this command
        if (command == commands.identify) {
            func.invoke('identify');
        } else if (command == commands.order) {
            func.invoke('order');
        } else if (command == commands.sendTo) {
            func.invoke('sendTo');
        }
        /*else if (command == commands.sayTo) {
         var name = myUtil.nextFrag(progress, msg);
         progress += name.length + 1;
         var words = msg.substring(progress);
         retObj['toUuid'] = name;
         // say to specified spot client
         var toClient = mateSocket(name, client.identity);
         if (toClient != null) {
         retObj['type'] = commands.sayTo;
         retObj['text'] = words;
         toClient.emit('system', retObj);
         socket.emit('system', retObj);
         } else {
         retObj['type'] = 'fail';
         retObj['text'] = ' client not found.';
         socket.emit('system', retObj);
         }
         }*/
    }
}

exports.commandHandler = commandHandler;