/**
 * Created by outrun on 2/27/16.
 */

$(function () {
  "use strict";
  $('#logout').click(function () {
    $.removeCookie('adminId', {path: '/'});
    $.removeCookie('token', {path: '/'});
    location.href = '/bluemoon/login.html';
  })
});