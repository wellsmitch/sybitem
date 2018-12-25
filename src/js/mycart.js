$(function() {

	var uid = getCookie("uid")
	console.log(uid)

	//表头
	$('.pickmesg').css({ 'overflow': 'hidden', 'height': 34, 'padding-left': 22 }).children().css({
		'float': 'left'

	})

	//登出
	$('.loginout').on('click', function() {
		removeCookie('uid')
		removeCookie('username')
		location.href = 'index.html'
	})
	if(uid) {
		//查询购物车
		$.getJSON(`http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${uid}`, function(res) {
			var html = '';
			$.each(res.data, function(i, ele) {
				var arr1 = ele.pimg.split('&')
				html += `<li p=${ele.pid}>
							<input type="checkbox" checked='checked' name="" id="" value="" />
							<img src="${arr1[0]}"/>
							<span>${ele.pname}</span>
							<span>￥${ele.pprice}</span>
							<input type="number" name="" class='pnum' id="" value=${ele.pnum} />
						
							<a class='del' href="javascript:;">删除</a>				
					</li>`
			});

			$('#list').html(html)
			//算钱的函数封装
			function money() {
				var price = 0;
				console.log($('#list li input[type=checkbox]'))
				$.each($('#list li input[type=checkbox]'), function(i, e) {
					//					console.log($(this).find('input[type=checkbox]').checked('true'))
					//console.log($(this).find('input[type=checkbox]').is(':checked'))
					//					console.log('引用了')
					console.log(e.checked)
					if(e.checked == true) {
						price += parseInt($(e).parent().find('span:nth-of-type(2)').text().replace(/^￥/, '')) * parseInt($(e).parent().find('input[type=number]').val())
					}
				})
				$('.jiesuan a:nth-child(2)').html('总价：' + price)
				return 1;
			}
			money();

			//删除	
			$('.del').on('click', function() {
				console.log($(this).parent().attr('p'))
				$.getJSON(`http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid=${uid}&pid=${$(this).parent().attr('p')}`, function(res) {

				})
				$(this).parent().remove();
				money();
			})
			//监听商品数量改变
			$.each($('.pnum'), function() {

				$(this).on('change', function() {
					$.getJSON(`http://jx.xuzhixiang.top/ap/api/cart-update-num.php?uid=${uid}&pid=${$(this).parent().attr('p')}&pnum=${$(this).val()}`, function(res) {
						//						console.log(res)
					})
				})

			});
			//结算
			$('#list li input[type=checkbox]').on('click', function() {
				money();
			});

			$('#list li input[type=number]').on('click', function() {
				money();
			})

			$('#list li input[type=number]').on('change', function() {
				money();
			})

			//全选
			$('#all').on('click', function() {
				console.log($('#all').attr('checked'))
				console.log($('#all').is(':checked'))

//				$('#list li input[type=checkbox]').attr('checked', 'false')

				if($('#all').is(':checked') == true) {
					$.each($('#list li input[type=checkbox]'), function(i, e) {
						$(e)[0].checked = true
						console.log($(e)[0].checked)//必须这样拿
					});
				} else if($('#all').is(':checked') == false) {
					$.each($('#list li input[type=checkbox]'), function(i, e) {
						$(e)[0].checked=false
					});
				}

				money();
			})

		})

	}

})