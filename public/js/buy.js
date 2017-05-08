// function func_count(){
// 	var arrInput = document.getElementById("buyer").getElementsByTagName('li');
// 	var a = arrInput.length;
// 	var data=new Array();
// 	for(var i=0;i<a;i++){
// 		var b = arrInput[i].getElementsByTagName('h');
// 		data.push(b[0],b[1]);
// 	}
// }


function func_check(f){
	// alert(f);
	var identity = document.getElementById(f).innerText;
	var user = document.getElementById("a_login").innerText;
	var no = document.getElementById("no").innerText;
	 var id = {
	        identity:identity,
	        no:no,
	        user:user
	    };
        $.ajax({
                cache: true,
                type: "get",
                url:"../../check",
                data:id,
                async: false,
                error: function(request) {
                    alert("已买过这张票！");
                    document.getElementById('f'+f).checked=false;

                },
                success: function(data) {
                    
                }
            });
}

function func_addBuyer2(){
	// alert("1");
	
	var name = document.getElementById("name").value;
	var identity = document.getElementById("identity").value;
	var ff = 'f'+identity;
	// alert("ff:"+ff);
	var isHave = false;

	var str=document.getElementsByName("identity");
	// alert("strlength:"+str.length);
	for(var i=0;i<str.length;i++){
		if(str[i].innerText==identity){
			isHave = true;
		}
	}

	if(isHave){
		alert('该身份证已存在！');
	}else{
		var div = document.createElement("div");
		div.class="checkbox";
		div.innerHTML="<label class='col-md-12'><span class='col-md-3'><input id='ff"+identity+"' onclick=\"func_check('"+ff+"')\" type='checkbox' name='ckBox' value='option1'>姓名:<h5>"+name+"</h5></span><span class='col-md-5'>证件号:<h5 id='f"+identity+"' name='identity'>"+identity+"</h5></span></label>";
		document.getElementById("buyer").appendChild(div);
		document.getElementById("identity").value = "";
		document.getElementById("name").value = "";
	}
}

function func_addBuyer(){
	document.getElementById("name").removeAttribute('readonly');
	document.getElementById("identity").removeAttribute('readonly');
}

$(document).ready(function(){
	$("#radio").change(
		function(){
			if($("#a_login").text()=="登录")
			{
				$("#myModal").modal();
				$("#radio").removeAttr("checked");
			}else{
				$("#name").removeAttr('readonly');
				$("#identity").removeAttr('readonly');
			}

		})
		
})

function func_buy(){
	var user = document.getElementById("a_login").innerText;
	if(user=='登录'){
		$("#myModal").modal();
	}else{
		var arrInput = document.getElementById("buyer").getElementsByTagName('label');//这里要重写
		var a = arrInput.length
		// alert("a:"+a);
		var data=new Array();

		var str=document.getElementsByName("ckBox");
		// alert("strlength:"+str.length);
		for(var i=0;i<a;i++){
			if(str[i].checked){
				var b = arrInput[i].getElementsByTagName('h5');
				data.push(b[0].innerText,b[1].innerText);
			}
		}
		if(data==''){
			alert("请选择乘客！");
		}else{
			// alert(data);
			var no = document.getElementById("no").innerText;
			var user = document.getElementById("a_login").innerText;

			// var name = document.getElementById("name").value;
			// var identity = document.getElementById("identity").value;

			var startPlace = document.getElementById("startPlace").innerText;
			var startTime = document.getElementById("startTime").innerText;
			var startDate = document.getElementById("startDate").innerText;
			var endPlace = document.getElementById("endPlace").innerText;
			var price = document.getElementById("price").innerText;
			var oDate = new Date();
			oDate.getFullYear();   //获取系统的年；
			oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
			oDate.getDate(); // 获取系统日，
			oDate.getHours(); //获取系统时，
			oDate.getMinutes(); //分
			oDate.getSeconds(); //秒
			var date = oDate.toLocaleDateString()+oDate.toLocaleTimeString();
			var send="&count="+data.length/2+"&data="+data+"&user="+user+"&no="+no+"&startPlace="+startPlace+"&endPlace="+endPlace+"&price="+price+"&date="+date+"&startTime="+startTime+"&startDate="+startDate;
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
			    	alert("购票成功！");
			    	window.location.href="../../order?user="+user; 
			    // document.getElementById("head").innerHTML=xmlhttp.responseText;
			    }
			}

			xmlhttp.open("POST","../../buyTicket",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send(send);
		}
	}
}

function func_logToReg(){
	$('#myModal').modal('hide');
	$('#regModal').modal();
}

function func_head()
{
	var user = document.getElementById("inputUser").value;
	var password = document.getElementById("inputPassword").value;
	var send="user="+user+"&password="+password;
	var no = document.getElementById("no").innerText;
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
	    	// window.location.href="../../buy?no="+no;
	    	location.reload(true);
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
	location.reload(true);
}



function func_order(){
	var user = document.getElementById("a_login").innerText;
	if(user=='登录'){
		$("#myModal").modal();
	}else{
		window.location.href="../../order?user="+user; 
	}
}