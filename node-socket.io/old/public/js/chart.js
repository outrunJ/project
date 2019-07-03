/**
 * Created by outrun on 24/08/14.
 */

(function () {

    $body = $(document.body);

    Chart = function (selector, context) {
        return new Chart();
    };
    Chart.appear = function () {
        // $(selector).append('<h1>hello</h1>');
        i_thic = 30;
        loc_x = document.body.scrollWidth;
        loc_y = document.body.scrollHeight;
        $body = $(document.body);
        appear = 0;
        var $img = $('<img src="pic/chart.jpg"/>')
            .css({ width: i_thic + 'px', height: i_thic + 'px', position: 'absolute', left: (loc_x - i_thic) + 'px', top: (loc_y - i_thic) + 'px'})
            .click(function () {
                Chart.buttonToggle();
                if (appear++ % 2) {
                    Chart.list_gToggle(false);
                    Chart.list_cToggle(false);
                } else {
                    Chart.list_gToggle();
                }
            });
        $body.append($img);
    };
    Chart.buttonToggle = function () {
        var $chart_b = $('#chartButton');
        if (typeof $chart_b.attr('id') !== 'undefined') {
            $chart_b.remove();
        } else {
            botton_w = botton_h = i_thic;
            var $botton = $('<div id="chartButton"></div>')
                .css({background: 'MediumOrchid' //
                    , width: botton_w + 'px', height: botton_h * 2 + 'px' //
                    , position: 'absolute', left: (loc_x - botton_w) + 'px', top: (loc_y - i_thic - botton_h * 2) + 'px'});
            $botton_g = $('<div>G</div>')
                .css({ width: botton_w + 'px', height: botton_h + 'px' //
                    , 'text-align': 'center', 'line-height': botton_h + 'px', 'vertical-align': 'middle'})
                .click(function () {
                    Chart.list_cToggle(false);
                    Chart.list_gToggle(true);
                });
            $botton_c = $('<div>C</div>')
                .css({ width: botton_w + 'px', height: botton_h + 'px' //
                    , 'text-align': 'center', 'line-height': botton_h + 'px', 'vertical-align': 'middle'})
                .click(function () {
                    Chart.list_gToggle(false);
                    Chart.list_cToggle(true);
                });
            $botton.append($botton_g);
            $botton.append($botton_c);
            $body.append($botton);
        }

    };
    function list(id) {
        list_b_w = 2;
        list_w = 150;
        list_h = 300;
        var $list = $('<div id=' + id + '></div>')
            .css({background: 'aqua', border: list_b_w + 'px solid CornflowerBlue' //
                , width: list_w + 'px', height: list_h + 'px' //
                , position: 'absolute', left: (loc_x - i_thic - list_w - list_b_w * 2) + 'px', top: (loc_y - list_h - list_b_w * 2) + 'px'});
        $body.append($list);
        return $list;
    }

    function item($list, name) {
        item_h = 20;
        var $item_g = $('<div>' + name + '</div>')
            .css({background: getColor(), width: list_w + 'px', height: item_h + 'px'})
            .click(function () {
            });
        $list.append($item_g);
    }

    Chart.list_gToggle = function (show) {
        var id = 'chartlist_g';
        var $list = $('#' + id);
        var showed = typeof  $list.attr('id') !== 'undefined';
        if(showed){
            $list.remove();
        }
        if (show == false) {
            $botton_g.css('background', 'MediumOrchid');

        } else if (show != false) {
            $botton_g.css('background', 'CornflowerBlue');
            var $list = list(id);
            // groups
            item($list, 'group1');
            item($list, 'group2');
        }
    };
    Chart.list_cToggle = function (show) {
        var id = 'chartList_c';
        var $list = $('#' + id);
        var showed = typeof  $list.attr('id') !== 'undefined';
        if(showed){
            $list.remove();
        }
        if (show == false) {
            $botton_c.css('background', 'MediumOrchid');
        } else if (show != false) {
            $botton_c.css('background', 'CornflowerBlue');
            var $list = list(id);
            // contacts
            item($list, 'contact1');
        }
    };
    function getColor() {
        var colors = ['DarkCyan', 'DeepPink', 'CadetBlue', 'FloralWhite', 'DarkSalmon', 'DarkSeaGreen', 'GreenYellow', 'MediumOrchid'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    Chart.fn = Chart.prototype;
    window.Chart = Chart;
})();
