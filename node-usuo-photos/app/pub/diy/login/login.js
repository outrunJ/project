/**
 * Created by outrun on 2/27/16.
 */

$(function () {
  "use strict";
  var $tel = $('#tel'), $pwd = $('#pwd');
  $('#loginBtn').click(function () {
    var tel = $tel.val(), pwd = $pwd.val();
    if (!tel) {
      alertify.error('请输入手机号');
    } else if (!diyUtil.isTel(tel)) {
      alertify.error('请输入正确的手机号');
    } else if (!pwd) {
      alertify.error('请输入密码');
    } else if (pwd.length < 8) {
      alertify.error('密码长度不匹配');
    } else {
      $.post('/api/admin/login', {
        tel: tel,
        pwd: $.md5(pwd)
      }, function (data) {
        if (data && data.code == '0000') {
          location.href = '/view/?topNav=0&subNav=1#/upload/admin'
        } else if (data && data.code) {
          var confirm = alertify.confirm('登录失败，' + data.msg);
        } else {
          alertify.alert('登录失败');
        }
      }).error(function () {
        alertify.alert('服务器异常');
      })
    }
  });
});
