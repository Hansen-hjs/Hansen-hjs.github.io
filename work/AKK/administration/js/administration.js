	$('#modify').click(function(){
		$('.top_class').removeClass('translate_hover');
		$('.setup_content').hide();
		$('.password_content').show();
		setTimeout(function(){
			$('.password_content').removeClass('translate_hover');
		},10)
	});
	$('#goback').click(function(){
		$('.top_class').addClass('translate_hover');
		$('.password_content').addClass('translate_hover');
		setTimeout(function(){
			$('.setup_content').show();
			$('.password_content').hide();
		},300)
	})
// 查看密码
function pass(){
	var newPass=document.getElementById("newPass");
	var cPass=document.getElementById("cPass");
    var passNew=document.getElementById("password")
    var passC=document.getElementById("newpassword")
    var num = 1;
    newPass.onclick=function(){
    	if (num == 1) {
    		passNew.type="text";
    		num = 0;
    	}else{
    		passNew.type="password";
    		num = 1;
    	}      
    };
    cPass.onclick=function(){
    	if (num == 1) {
    		passC.type="text";
    		num = 0;
    	}else{
    		passC.type="password";
    		num = 1;
    	}      
    };
}
pass();
var userID = sessionStorage.getItem("userID"); 
console.log(userID);
// 修改密码
$("#confirm").click(function(){
	var pass = {
		id : userID,
		lodPassword: escape($('#account').val()),
		password: escape($('#password').val()),
		confirmPsw: escape($('#newpassword').val())
	}
	$.ajax({
			url:  $url+"/iom_app_server/api/user/changepassword", 
			data: pass, 
			dataType:'json', 
			type:'get',
			xhrFields:{ // 跨域cookie打开
				withCredentials: true
			},
        	crossDomain: true,
        	success:function(data){
        		alert(data.message);
        		console.log(data);
        		$('#account').val("")
        		$('#password').val("");
        		$('#newpassword').val("");
        	}
        })
});
// 退出登录
$("#signout a").click(function(){
	$.ajax({
		url:  $url+"iom_app_server/api/user/logout", 
		data: pass, 
		dataType:'json', 
		type:'get',
		xhrFields:{ // 跨域cookie打开
			withCredentials: true
		},
    	crossDomain: true,
    	success:function(data){
    		// console.log(data)
    		location.href = "../index.html";
    	}
	})
});
