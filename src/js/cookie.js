//添加和修改
function setCookie(name, value, n) {
	var now = new Date();
	now.setDate(now.getDate() + n);

	//把中文编码
	value = encodeURIComponent(value);

	document.cookie = name + '=' + value + ';expires=' + now+';path=/';

}
//修改
function removeCookie(name) {
	setCookie(name, '', -7);
}
//通过cookie名称，获取对应的值
//如果获取不到cookie ，就会返回undefined
function getCookie(name) {
	var cookie = document.cookie;

	var arr = cookie.split('; ');
	for(var i = 0; i < arr.length; i++) {
		var item = arr[i];
	
		var tmpArr = item.split('=');
	

		if(tmpArr[0] == name) {

			return  decodeURIComponent(tmpArr[1])

		}
	}
}