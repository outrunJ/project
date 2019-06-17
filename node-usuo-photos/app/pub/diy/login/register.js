/**
 *
 * Created by outrun on 2/27/16.
 */
// Standard Dialogs
$("#alert").click = function () {
  alertify.alert("This is an alert Dialog");
  return false;
};
$("#confirm").click = function () {
  alertify.confirm("This is a confirm dialog", function (e) {
    if (e) {
      alertify.success("You've clicked OK");
    } else {
      alertify.error("You've clicked Cancel");
    }
  });
  return false;
};

$(function () {
  "use strict";
  var $tel = $('#tel'), $pwd1 = $('#pwd1'), $pwd2 = $('#pwd2');
  $('#registerBtn').click(function () {
    var tel = $tel.val(), pwd1 = $pwd1.val(), pwd2 = $pwd2.val();
    if (!tel) {
      alertify.error('请输入手机号');
    } else if (!diyUtil.isTel(tel)) {
      alertify.error('请输入正确的手机号');
    } else if (!pwd1) {
      alertify.error('请输入密码');
    } else if (pwd1.length < 8) {
      alertify.error('请输入至少八位密码');
    } else if (!pwd2) {
      alertify.error('请再次输入密码');
    } else if (pwd1 != pwd2) {
      alertify.error('两次输入的密码不相同');
    } else {
      $.post('/api/admin/register', {
        tel: tel,
        pwd: $.md5(pwd1)
      }, function (data) {
        if (data && data.code == '0000') {
          alertify.confirm('注册成功，马上去登录', function (confirmed) {
            if (confirmed) {
              location.href = '/bluemoon/login.html';
            }
          });
        } else if (data && data.code) {
          var confirm = alertify.confirm('注册失败，' + data.msg);
        } else {
          alertify.alert('注册失败');
        }
      }).error(function () {
        alertify.alert('服务器异常');
      })
    }
  })
});
