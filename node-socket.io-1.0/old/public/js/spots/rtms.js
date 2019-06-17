/**
 * Created by outrun on 17/08/14.
 */
$(function () {

    var content = $('#content');
    var status = $('#status');
    var com = $('#com');
    var cont = $('#cont');
    var cont_val;

    socket = io.connect('http://localhost:2014');

    socket.on('open', function () {
        status.text('have connected.');
        socket.send('{"com": "identify", "cont": "rtms"}');
    });

    socket.on('msg', function (json) {
        var p = '';
        if (json.res.type === 'identify') {
            identify = json.res.cont.identify;
            uuid = json.res.cont.text;
            status.text(uuid.substr(0, 5) + " in " + identify + ': ').css('color', json.res.cont.color);
            p = '<p style="background:' + json.res.cont.color + '">system  @ ' + json.res.cont.time + ' : Welcome ' + json.res.cont.text + '</p>';
        } else if (json.res.type == 'disconnect') {
            p = '<p style="background:' + json.res.cont.color + '">system  @ ' + json.res.cont.time + ' : Bye ' + json.res.cont.text + '</p>';
        } else if (json.res.type == 'report') {
            p = '<p style="background:' + json.res.cont.color + '">' + (uuid === json.res.cont.uuid ? 'you ' : json.res.cont.uuid) + ' just reported  @ ' + json.res.cont.time + ' : ' + json.res.cont.text + '</p>';
        } else if (json.res.type == 'order') {
            p = '<p style="background:' + json.res.cont.color + '">master ' + json.res.cont.uuid + ' ordered  @ ' + json.res.cont.time + ' : ' + json.res.cont.text + '</p>';
        } else if (json.res.type == 'say to') {
            p = '<p style="background:' + json.res.cont.color + '">' + json.res.cont.uuid + '  @ ' + json.res.cont.time + ' say to you: ' + json.res.cont.text + '</p>';
        } else if (json.res.type == 'user'){
            p = '<p style="background:' + json.res.cont.color + '">you  @ ' + json.res.cont.time + ' sent userId: ' + json.res.cont.text + '</p>';
        } else if (json.res.type == 'send to'){
            p = '<p style="background:' + json.res.cont.color + '">' + json.res.cont.uuid + '  @ ' + json.res.cont.time + ' sent you a msg: ' + json.res.cont.text + '</p>';
        } else if (json.res.type == 'fail') {
            p = '<p style="background:' + json.res.cont.color + '">you get an err  @ ' + json.res.cont.time + ' ' + json.res.cont.text + '</p>';
        }
        content.prepend(p);
    });
    socket.on('sys', function (json) {
        if (json.res.type == 'err') {
            p = '<p style="background:' + json.res.cont.color + '">you get an err  @ ' + json.res.cont.time + ' ' + json.res.cont.text + '</p>';
        }
        content.prepend(p);
    });

    cont.keydown(function (e) {
        if (e.keyCode === 13) {
            cont_val = cont.val();
            if (cont_val[0] != '{') cont_val = "\"" + cont_val + "\"";

            var msg = '{"com": "' + com.val() + '", "cont": ' + cont_val + '}';
            if (!msg) return;
            socket.send(msg);
            com.val('');
            cont.val('');
        }
    });
});