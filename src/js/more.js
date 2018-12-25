
$(function(){
	
//		arr=['关于走秀','About us','媒体报道','品牌招商','加入走秀','网站地图','联系我们','品牌大全','邮件订阅','WAP站点']
//	var link_list='';
//	$.each(arr,function(i,e){		
//		if(i<=8){
//			link_list+=`<li><a href="javascript:;">${e}</a>|</li>`
//		}else{
//			link_list+=`<li><a href="javascript:;">${e}</a></li>`
//		}
//		
//	})
//	$('.linkList').append(link_list)
//	
//	$('.header_left li:nth-child(1) a').html(getCookie('username')+'你好！')
	
	
//关闭咨询
$('.close').click(function(){
	console.log($(this))
	$(this).parent().css('display','none')
})
$('#help ul li:nth-child(2)').click(function(){
	location.href ='mycart.html'
})
$('#help ul li:nth-child(4)').click(function(){
	
	var timer = setInterval(function(){
	document.scrollingElement.scrollTop-=5;
	if(document.scrollingElement.scrollTop==0){
		clearInterval(timer)
	}
},1)
		
		
	
})


	
	
//购物车数量	
var sum=0;
if(getCookie('uid')){
	$.getJSON(`http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${getCookie('uid')}`,function(res){
	console.log(res)
	
	$.each(res.data, function(i,ele) {
		sum+=parseInt(ele.pnum);		
	});
	if(sum==0){
		$('.cartnum span').html(0);
	}else{
		$('.cartnum span').html(sum-0);
		
	}
	
})	
}
	
$.each($('#nav_wrap a'), function() {
		$('#nav_wrap a').attr('href','javascript:;')
	});
	
	
	console.log($('.product'))
	
		var imgCon = '';
	var url = 'http://jx.xuzhixiang.top/ap/api/productlist.php?uid=2897';
	$.getJSON(url,function(res){
		console.log(res)
		$.each(res.data, function(i,ele) {
			var arr = ele.pimg.split('&')
			console.log(arr)
			imgCon+=`<li><a href="item.html?id=${i}&pid=${ele.pid}"><img src="${arr[0]}" alt="" /> <div class="xinxi">
				<p>${ele.pname}</p>
				<p>${ele.pprice}</p>
			</div><p></p></a></li>`
		});
		$('.product').html(imgCon)

	})

})
