/**
 *
 * Created by outrun on 3/4/16.
 */

$(function () {
  "use strict";

  window.qiniuInit = function (times) {
    var uploaders = [];
    for (var i = 0; i < times; i++) {
      (function (i) {
        uploaders.push(Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: 'pickfiles' + i,
          container: 'container' + i,
          drop_element: 'container' + i,
          max_file_size: '1000mb',
          flash_swf_url: '../plupload/js/Moxie.swf',
          dragdrop: true,
          chunk_size: '4mb',
          uptoken: window.qiniu.uptoken,
          domain: window.qiniu.domain,
          get_new_uptoken: false,
          // downtoken_url: '/downtoken',
          //unique_names: false,
          //save_key: false,
          // x_vars: {
          //     'id': '1234',
          //     'time': function(up, file) {
          //         var time = (new Date()).getTime();
          //         // do something with 'time'
          //         return time;
          //     },
          // },
          auto_start: true,
          log_level: 1,
          init: {
            'FilesAdded': function (up, files) {
            },
            'BeforeUpload': function (up, file) {
            },
            'UploadProgress': function (up, file) {
            },
            'UploadComplete': function () {
            },
            'FileUploaded': function (up, file, info) {
              console.log(info);
              var res = $.parseJSON(info);
              var url;
              if (res.url) {
                url = res.url;
              } else {
                var domain = up.getOption('domain');
                url = domain + encodeURI(res.key);
              }
              if (url) {
                var $container = $('#container' + i);
                var params = {
                  _id: $('#cargoId').val(),
                  photoId: $container.parents('.row').attr('photoId'),
                  photoUrlRevised: url,
                };
                $.ajax({
                  type: 'PUT',
                  url: '/api/cargo',
                  data: diyUtil.paramsStr(params).substr(1),
                  success: function (data) {
                    if (data && data.code && data.code == '0000') {
                      $container.prev().attr('src', url + '?imageView2/1/w/300/h/350');
                      alertify.success('上传成功');
                    } else {
                      alertify.error('后台更新失败');
                    }
                  },
                  error: function () {
                    alertify.error('服务异常');
                  }
                });
              } else {
                alertify.error('上传失败');
              }
            },
            'Error': function (up, err, errTip) {
            },
            'Key': function (up, file) {

              var tr = $('#' + file.id);

              var key = $('#container' + i).children('h6').html() + '---' +
                new Date().toJSON() + '---' + Math.floor(Math.random() * 10000) + '---' +
                file.name;
              return key
            }
          }
        }));
      })(i);
    }

  };

  $.get('/api/qiniu/uptoken/photos', function (data) {
    var domain = data.domain,
      uptoken = data.uptoken;
    window.qiniu = {
      domain: domain,
      uptoken: uptoken,
    };
  });

});

//@ sourceURL=retrieve.js