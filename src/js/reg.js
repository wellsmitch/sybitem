$(function(){
	var num;
	$('.pw input').on('input',function(){
		 num = /^\w{6,}$/.test($(this).val());

		if(num==false){
			$(this).prev().css('display','block')	
		}else{
			$(this).prev().css('display','none')
		}
		console.log($('.pw input').val()!=null&&num==true)
	});
$('#reg').on('click',function(){
	if(($('.pw input').val()!=null&&num==true)==true){
		$('#reg').on('click',function(){
			var url = 'http://jx.xuzhixiang.top/ap/api/reg.php'
			var data = {username:$('#mobilenum1').val(),password:$('#pw2').val()}
			$.ajax({
				type:"get",
				url:url,
				async:true,
				data:data,
				success:function(res){
					location.href = 'login.html'
				}
			});
		})	
	}
})
	
	

	

})