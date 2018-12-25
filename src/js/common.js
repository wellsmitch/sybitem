
function getParam(param){
	var search = location.search;	
	var arr = search.slice(1).split('&');
	var r =''
	arr.forEach(function(value){
		var tem = value.split('=')
		if(tem[0] == param){
			r = tem[1]
		}
	})
	return r ;
}
getParam('id')
