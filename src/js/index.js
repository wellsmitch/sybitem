$(function() {

	$.each($('#nav_wrap a'), function() {
		$('#nav_wrap a').attr('href', 'javascript:;')
	});

	//搜索框
	$('#search').on('input', function() {
		$.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${$('#search').val()}&cb=?`, function(res) {
			console.log(res)
			var html = '';

			for(var i = 0; i < 5; i++) {
				if(res.s[i] != undefined) {
					html += `<li>${res.s[i]}</li>`
				}
			}
			$('#searchp').css('display', 'block');
			$('#searchp').html(html)
			$.each($('#searchp li'), function() {
				$(this).on('click', function() {
					$('#search').val($(this).html())
					$('#searchp').css('display', 'none');

				})
			});

		})

	})

	//轮播	
	var num = 0;
	var timer;
	$('#slider_').hover(function() {
		clearInterval(timer);
		clickcircle();
	}, function() {
		start();
	});
	start();

	function start() {
		timer = setInterval(function() {
			next();
			init(num)
		}, 2000)
	}

	function clickcircle() {
		$('#tips span').on('click', function(e) {
			num = $(this).index();
			$('#list').animate({ 'left': (-num * 1200 + 'px') })
			init(num)
		})
	}

	function next() {
		num++;
		if(num == 6) {
			$('#list').css('left', 0)
			num = 1
		}
		$('#list').animate({ 'left': (-num * 1200 + 'px') })
	}

	function pre() {
		num--;
		if(num < 0) {
			$('#list').css('left', -6000);
			num = 4
		}
		init(num)
		$('#list').animate({ 'left': (-num * 1200 + 'px') })
	}

	function init(num) {
		if(num == 5) {
			num = 0
		}
		$('#tips span:nth-child(' + (num + 1) + ')').css('background', '#707070').siblings().css('background', '#ccc');
	}
	var trim;
	$('#start a').hover(function() {
		console.log($(this).css('background-position-x').replace(/px$/ig, ''))
		trim = $(this).css('background-position-x').replace(/px$/ig, '') - 13
		console.log(trim)
		$(this).animate({
			'background-position-x': trim,
			'overflow': 'hidden'
		}, 500)
		//		console.log($(this).css.('background-position-x'));
	}, function() {
		trim += 15
		$(this).animate({ 'background-position-x': trim }, 500)
	})

	arr = ['关于走秀', 'About us', '媒体报道', '品牌招商', '加入走秀', '网站地图', '联系我们', '品牌大全', '邮件订阅', 'WAP站点']
	var link_list = '';
	$.each(arr, function(i, e) {
		if(i <= 8) {
			link_list += `<li><a href="javascript:;">${e}</a>|</li>`
		} else {
			link_list += `<li><a href="javascript:;">${e}</a></li>`
		}

	})
	$('.linkList').append(link_list)

	if(getCookie('username') != null) {
		$('.header_left>li:nth-child(1) a').html(getCookie('username') + '你好！')
	}

	//查询自定义添加的商品列表	

	var url = 'http://jx.xuzhixiang.top/ap/api/productlist.php?uid=2897';
	var imgCon = '';
	$.getJSON(url, function(res) {
		console.log(res)
		$.each(res.data, function(i, ele) {
			var arr = ele.pimg.split('&')
			//			console.log(arr)
			imgCon += `<li><a href="item.html?id=${i}&pid=${ele.pid}"><img src="${arr[0]}" alt="" /> <div class="xinxi">
				<p>${ele.pname}</p>
				<p>${ele.pprice}</p>
			</div><p></p></a></li>`
		});
		$('.prolist').html(imgCon)

	})
//	$('.zouxiu').hover(function(){
//		$(this).css({'height':'auto'})
//	},function(){
//		$(this).css({'height':'20px'})
//	})
	//首页购物车数量	
	var sum = 0;
	if(getCookie('uid')) {
		$.getJSON(`http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${getCookie('uid')}`, function(res) {
			console.log(res)

			$.each(res.data, function(i, ele) {
				console.log(ele.pnum, res.data)
				sum += parseInt(ele.pnum);
			});
			console.log(sum)
			if(sum == 0 || sum == undefined) {
				$('.cartnum span').html(0);
			} else {
				$('.cartnum span').html(sum - 0);

			}

		})
	}
	//跳转到列表页
	$('#slider_wrap img,#bestnew img,#jianhuo img,.recomend li').on('click',function(){
		location.href = 'more.html'
	})

})