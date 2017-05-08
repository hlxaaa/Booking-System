
	$(document).ready(function() {
		$("#btnChange").click(function(){
			var a = $("#citySelect").val();
			$("#citySelect").val($("#citySelect1").val());
			$("#citySelect1").val(a);
		});
	});
