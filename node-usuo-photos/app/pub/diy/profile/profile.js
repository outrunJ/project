/**
 * Created by outrun on 2/29/16.
 */

$(function () {
  "use strict";

  var domain = bag.domain;
  var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'pickfiles',
    container: 'container',
    drop_element: 'container',
    max_file_size: '1000mb',
    flash_swf_url: '../plupload/js/Moxie.swf',
    dragdrop: true,
    chunk_size: '4mb',
    uptoken_url: bag.uptoken_url,
    domain: domain,
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
          $.ajax({
            type: 'PUT',
            url: '/api/admin',
            data: 'avatar=' + url,
            success: function (data) {
              if (data && data.code && data.code == '0000') {
                $('#avatarProfile').attr('src', url + '?imageView2/1/w/200/h/300');
                $('#avatarSmall').attr('src', url + '?imageView2/1/w/44/h/44');
                alertify.success('更新头像成功');
              } else {
                alertify.error('后台更新头像失败');
              }
            },
            error: function () {
              alertify.error('服务异常');
            }
          });
        } else {
          alertify.error('上传头像失败');
        }
      },
      'Error': function (up, err, errTip) {
      }
      //,
      //'Key': function (up, file) {
      //  var key = "";
      //  // do something with key
      //  return key
      //}
    }
  });
});

$(function () {
  "use strict";
  var $tel = $('#tel'),
    $pwd1 = $('#pwd1'),
    $pwd2 = $('#pwd2'),
    $nickname = $('#nickname'),
    $email = $('#email'),
    $location = $('#location'),
    $about = $('#about');

  $('#profileBtn').click(function () {
    var pwd1 = $pwd1.val(),
      pwd2 = $pwd2.val(),
      nickname = $nickname.val(),
      email = $email.val(),
      location = $location.val(),
      about = $about.val();
    if (pwd1) {
      if (pwd1.length < 8) {
        alertify.error('密码不能少于八位');
        return;
      } else if (pwd1 != pwd2) {
        alertify.error('两次输入的密码不一致');
        return;
      }
    }
    if (email && !diyUtil.isEmail(email))  {
      alertify.error('邮箱格式不正确');
      return;
    }
    var paramsStr =  diyUtil.paramsStr({
      nickname: nickname,
      pwd: pwd1 && $.md5(pwd1),
      email: email,
      location: location,
      about: about
    });
    $.ajax({
      type: 'PUT',
      url: '/api/admin/',
      data: paramsStr.slice(1),
      success: function (data) {
        if (data && data.code && data.code == '0000') {
          alertify.confirm('修改个人信息成功', function () {
            history.go(0);
            // location.reload();
            // location.replace(location.href);
          })
        } else {
          alertify.error('修改个人信息失败 ' + data.msg);
        }
      },
      error: function () {
        alertify.error('服务异常');
      }
    })
  });
});