//超链接跳转控制
$.each($('#nav_wrap a'), function() {
		$('#nav_wrap a').attr('href','javascript:;')
	});


//详情页购物车数量	
var sum=0;
if(getCookie('uid')){
	$.getJSON(`http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${getCookie('uid')}`,function(res){
	console.log(res)
	
	$.each(res.data, function(i,ele) {
		sum+=parseInt(ele.pnum);		
	});
	console.log($('.tomycart span'))
	if(sum==0){
		
		$('.tomycart span').html(0);
	}else{
		$('.tomycart span').html(sum-0);
		
	}
	
})
}

//商品信息生成
var url = 'http://jx.xuzhixiang.top/ap/api/productlist.php?uid=2897';
	var imgCon = '';
	$.getJSON(url,function(res){
		console.log(res)
		
		var ele = res.data[getParam('id')]
			var arr1 = ele.pimg.split('&')
			$('.pic_b').html(`<li><img src="${arr1[0]}"/></li><li><img src="${arr1[1]}"/></li>`)
	
		$('.pic_t').append(`<img src="${arr1[0]}"/>`)	
		$('.largepic').append(`<img src="${arr1[0]}"/>`)
		$('.title span').html(`${ele.pname}`)
		$('.price p:nth-child(1) span').html(`${ele.pprice}`)	

//放大镜 
	$('.pic_b li img').on('click',function(){
		console.log($(this))
		var src = $(this).attr('src')
		$('.pic_t img').attr({'src':src})	
		$('.largepic img').attr({'src':src})
	})
//划入	
		var leftH=0;
		var leftW=0;
		$('.pic_t').hover(function(){
			$('.scan').show()
			$('.largepic').show()
			$('.largepic').attr('width',$('.scan').width()/$('.pic_t').width()*$('.largepic img').width())
			$('.largepic').attr('height',$('.scan').height()/$('.pic_t').height()*$('.largepic img').height())
			 leftH = ($('.largepic img').height()-$('.largepic').height())/($('.pic_t').height()-$('.scan').height())
			 leftW = ($('.largepic img').width()-$('.largepic').width())/($('.pic_t').width()-$('.scan').width())

		},function(){
			$('.largepic').hide()
			$('.scan').hide()
		});
//移动	
		$('.pic_t').on('mousemove',function(e){			
			var offsetX =  e.pageX -$('.pic_t').offset().left-$('.scan')[0].offsetWidth/2;
			var offsetY =  e.pageY -$('.pic_t').offset().top-$('.scan')[0].offsetHeight/2;
			
//	边界判断	
			if(offsetX<=0){	
				offsetX=0
			}else if(offsetX>=($('.pic_t')[0].offsetWidth-$('.scan')[0].offsetWidth)){				
				offsetX=($('.pic_t')[0].offsetWidth-$('.scan')[0].offsetWidth)
			}
			
			if(offsetY<=0){				
				offsetY=0
			}else if(offsetY>=($('.pic_t')[0].offsetHeight-$('.scan')[0].offsetHeight)){	
				offsetY=($('.pic_t')[0].offsetHeight-$('.scan')[0].offsetHeight)
			}

			$('.largepic img').css('top',-offsetY*leftH);
			$('.largepic img').css('left',-offsetX*leftW)
			
			$('.scan').css('left',offsetX)
			$('.scan').css('top',offsetY)
			
			
		})	

	})

		$('.large').css({'width':402,'height':536,'position':'relative','left':402,'top':0})


//用户信息
var uid = getCookie("uid")
var unm = getCookie("username")

console.log($('.header_left>li:nth-child(1) a'))
if(unm == null) {

	$('.header_left>li:nth-child(1) a').html('登录/注册')
} else {
	console.log(unm)
	$('.header_left>li:nth-child(1) a').html(unm + '欢迎你')
}

var num=1;
$('.price>p:nth-child(5) input').on('input', function() {

	if($('#num').val() < 0) {

		$('#num').val(0)
	}
	num = $('.price>p:nth-child(5) input').val();
	console.log(num)
})
console.log($('.price p:nth-child(7) a:nth-child(2)'))
			
			$('.price p:nth-child(7) a:nth-child(2)').on('click', function() {
				console.log(num)
				if(unm!== null) {					
						$.getJSON(`http://jx.xuzhixiang.top/ap/api/add-product.php?uid=${uid}&pid=${getParam('pid')}&pnum=${num}`,function(res){
							console.log(res)
							console.log(uid)
							
						})	
						
				}else{
					location.href = 'login.html'
				}
			
			})
			$.getJSON(`http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${uid}`,function(res){
							console.log(res)
							
						})
$('.tomycart').on('click',function(){
	location.href = `mycart.html?uid=${uid}`
})
	

