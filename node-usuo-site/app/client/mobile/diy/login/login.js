/**
 *
 * Created by outrun on 3/7/16.
 */

$(function(){
	//注册交互事件
	$('#btn-login').click(submitData);

});


//提交登陆信息
function submitData (e) {
	var data = {};
	data.user = $('#input-user').val();
	data.pass = $('#input-pass').val();
	if (openid != '0') {
		data.openid = openid;
	};

	//空值检查
	for (var i in data){
        if (!data[i]) {
        	alert('登陆失败,账户名或密码不可为空');
        	return false;
        };
    }

	$.post('/api/user/login', data,
		function(data) {
			if (data.error == 0) {
				if (bindaid != "0") {
					window.location.href = module+"/Mobile/bindAccount";
				}else{
					window.location.href = "/mobile/step0.html";
				}
			}else{
				$('#input-user').val('');
				$('#input-pass').val('');
				alert(data.msg);
			}
		},"json"
	)
}