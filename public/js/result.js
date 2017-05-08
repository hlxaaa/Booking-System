function func_logToReg(){
	$('#myModal').modal('hide');
	$('#regModal').modal();
}

$.ajaxSetup({cache:false});



function func_head()
{
	var user = document.getElementById("inputUser").value;
	var password = document.getElementById("inputPassword").value;
	var send="user="+user+"&password="+password;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	document.getElementById("head").innerHTML=xmlhttp.responseText;
	    }
	}

	xmlhttp.open("POST","../../login-user",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(send);
	$('#myModal').modal('hide');
	$(".modal-backdrop").remove();
	$("body").removeClass('modal-open');
}

function func_reg()
{
	var user = document.getElementById("inputUser1").value;
	var password = document.getElementById("inputPassword1").value;

	if(user.length<4||user.length>12){
		document.getElementById("userText").innerText="长度为4~12"
		document.getElementById("passwordText").innerText=""
	}else if(/[\u4E00-\u9FA5]/g.test(password)){
		document.getElementById("userText").innerText="";
		document.getElementById("passwordText").innerText="仅支持数字和英文"
	}else if(password.length<6||password.length>12){
		document.getElementById("userText").innerText="";
		document.getElementById("passwordText").innerText="密码长度为6~12"
	}
	else{
		var id = {
			user:user,
			password:password
		};
		$.ajax({
	        cache: true,
	        type: "post",
	        url:"../../login-reg",
	        data:id,
	        async: false,
	        error: function(request) {
	        	document.getElementById("userText").innerText="该用户已存在"
				document.getElementById("passwordText").innerText=""
	        },
	        success: function(data) {
	            document.getElementById("head").innerHTML=data;
	            	$('#regModal').modal('hide');
					$(".modal-backdrop").remove();
					$("body").removeClass('modal-open');
	        }
	    });

	}

}

function func_out()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	document.getElementById("head").innerHTML=xmlhttp.responseText;
	    }
	}

	xmlhttp.open("POST","../../login-out",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}

function func_order(){
	var user = document.getElementById("a_login").innerText;
	if(user=='登录'){
		$("#myModal").modal();
	}else{
		window.location.href="../../order?user="+user; 
	}
}