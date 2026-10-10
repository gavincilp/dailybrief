var script = $('#'+authorizedReadUnitId);
if (script.attr('queryData')) {
	var url = script.attr('url');
	var scriptId = script.attr('id');
	var idRandom = 'authorizedRead_' + scriptId;
	script.before('<div id="' + idRandom + '"></div>');
	var queryData = JSON.parse(script.attr('queryData').replace(/'/g, "\""));
	var bln = false;
	var value = '';
	if ((typeof paramsMap) != 'undefined') {
		for (i = 0; i < paramsMap.length; i++) {
			if (paramsMap[i].key == queryData.tagId){
				bln = true;
				value = paramsMap[i].value;
			}
		}
	}
	if (bln) {
		var paramJson = {
			pageNo: 99999,
			pageSize: 99999,
			search: JSON.stringify(value)
		}
		queryData.paramJson = JSON.stringify(paramJson);
	}
	getHtml(url, queryData, idRandom);
}



function getHtml(url, queryData, idRandom) {
	$.ajax({
		url: url,
		type: 'get',
		data: queryData,
		success: function(result) {
			$('#' + idRandom).html(result.data.html);
		},
		error: function(error) {
			layer.msg('系统错误');
		}
	})
}
