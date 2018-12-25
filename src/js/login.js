$(function() {

			$('.login a').on('click', function() {
				$('.login a').removeClass('active')
				$(this).addClass('active')
			})

			arr = ['关于走秀', '媒体报道', '品牌招商', '加入走秀', '友情链接', '联系我们', '帮助中心', '网站地图', ]
			var link_list = '';
			$.each(arr, function(i, e) {
				if(i <= 6) {
					link_list += `<li><a href="javascript:;">${e}</a>|</li>`
				} else {
					link_list += `<li><a href="javascript:;">${e}</a></li>`
				}

			})
			$('.linkList').append(link_list)
			$('.login a').on('click', function() {
				$('.lg').css('display', 'none')
				$('.lg').eq($(this).index()).css('display', 'block')
			})

			var num;
			$('.pw input').on('input', function() {
				num = /^\w{6,}$/.test($(this).val());

				if(num == false) {
					$(this).prev().css('display', 'block')
				} else {
					$(this).prev().css('display', 'none')
				}
				console.log($('.pw input').val() != null && num == true)
			});

			$('#login').on('click', function() {
				if(($('.pw input').val() != null && num == true) == true) {
					var url = 'http://jx.xuzhixiang.top/ap/api/login.php';
					var data = { username: $('#mobilenum1').val(), password: $('#pw2').val() }
					$.ajax({
						type: "get",
						url: url,
						async: true,
						data: data,
						success: function(res) {
							var obj = JSON.parse(res);
							console.log(obj)
							if(obj.code == 1) {
								var user = obj.data.username;
								var Uid = obj.data.id;

								setCookie('username', user);
								setCookie('uid', Uid)
								console.log(getCookie('uid'))
								location.href = 'index.html'
							} else {
								alert('登录失败:请检查用户名和密码')
							}

						}
					});
				};

			})
});