var laypage = layui.laypage
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	var queryDataStr = $('.pagination').attr('queryData')
	queryDataStr = queryDataStr.replace(/'/g, '"')
	var queryData = JSON.parse(queryDataStr)
	var pageNo = $('.pagination').attr('pageNo')
	var rows = $('.pagination').attr('rows')
	var unitid = $('.pagination').attr('unitid')
	var count = $('.pagination').attr('count')
	var cmsUrl = $('.pagination').attr('unitUrl')
	var loading = false
	if (parseInt(count) !== parseInt(rows) && parseInt(count) > parseInt(rows)) {
		$('.pagination').html('<div class="more" style="height: 50px;line-height: 50px; text-align: center;">加载更多</div>')
	}
	var paramJson = {
		pageNo: parseInt(pageNo),
		pageSize: rows
	}
	$('.more').click(function () {
		if (!loading) {
			loading = true
			checktoken()
            count = $('.pagination').attr('count')
			$(this).html('<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>')
			paramJson.pageNo += 1
			queryData.paramJson = JSON.stringify(paramJson)
			ajaxDataIphone(queryData, cmsUrl, unitid)
		}
	})
} else {
	var pageNo = $('.pagination').attr('pageNo')
	var rows = $('.pagination').attr('rows') // 初始条数
	var rows1 = $('.pagination').attr('rows') // 记录初始条数用于全功能分页展示
	var unitid = $('.pagination').attr('unitid')
	var count = $('.pagination').attr('count')
	var queryDataStr = $('.pagination').attr('queryData')
	queryDataStr = queryDataStr.replace(/'/g, '"')
	var queryData = JSON.parse(queryDataStr)
	var cmsUrl = $('.pagination').attr('unitUrl')
	layui.use('laypage', function () {
		$('.pagination').each(function () {
			var pageStyle = 'pageUpDown'
			var pageColor = '#0C60FE'
			if ($(this).attr('pagestyle') && $(this).attr('pagecolor')) {
				var pageStyle = $(this).attr('pagestyle')
				var pageColor = $(this).attr('pagecolor')
			}
			var layout = []
			if (!pageColor) {
				pageColor = '#0C60FE'
			}
			if (!pageStyle) {
				pageStyle = 'simple'
			}
			if (pageStyle === 'simple') {
				layout = ['prev', 'page', 'next']
			} else if (pageStyle === 'pageUpDown') {
				layout = ['prev', 'next']
			} else if (pageStyle === 'all') {
				layout = ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
			} else if (pageStyle === 'custom') {
				layout = []
			}
			if (count > 0) {
				if (pageStyle !== 'custom' && pageStyle !== 'noAroundPage') {
					laypage.render({
						elem: $('#' + unitid + ' .pagination'),
						count: count,
						limit: rows,
						limits: [rows1, rows1 * 2, rows1 * 3, rows1 * 4, rows1 * 5],
						curr: pageNo,
						layout: layout,
						theme: pageColor,
						jump: function (obj, first) {
							if (!first) {
								checktoken()
								var paramJson = {
									pageNo: obj.curr
								}
								if (pageStyle === 'all') {
									paramJson.pageSize = obj.limit
									rows = obj.limit
									pageNo = obj.curr
								} else {
									pageNo = obj.curr
									paramJson.pageSize = rows
								}
								queryData.paramJson = JSON.stringify(paramJson)
								ajaxDataPc(queryData, cmsUrl, unitid)
							}
						}
					})
				} else if ( pageStyle === 'noAroundPage' ){
                    laypage.render({
                        elem: $('#' + unitid + ' .pagination'),
                        count: count,
                        limit: rows,
                        limits: [rows1, rows1 * 2, rows1 * 3, rows1 * 4, rows1 * 5],
                        curr: pageNo,
                        theme: pageColor,
                        first: false,
                        last: false,
                        jump: function (obj, first) {
                            if (!first) {
                                checktoken()
                                var paramJson = {
                                    pageNo: obj.curr
                                }
                                if (pageStyle === 'all') {
                                    paramJson.pageSize = obj.limit
                                    rows = obj.limit
                                    pageNo = obj.curr
                                } else {
                                    pageNo = obj.curr
                                    paramJson.pageSize = rows
                                }
                                queryData.paramJson = JSON.stringify(paramJson)
                                ajaxDataPc(queryData, cmsUrl, unitid)
                            }
                        }
                    })
				} else {
					laypage.render({
						elem: $('#' + unitid + ' .pagination'),
						count: count,
						limit: rows,
						curr: pageNo,
						first: '首页',
						last: '尾页',
						prev: '<em>←</em>',
						next: '<em>→</em>',
						layout: ['prev', 'page', 'next'],
						theme: pageColor,
						jump: function (obj, first) {
							if (!first) {
								checktoken()
								var paramJson = {
									pageNo: obj.curr,
									pageSize: rows
								}
								queryData.paramJson = JSON.stringify(paramJson)
								ajaxDataPc(queryData, cmsUrl, unitid)
							}
						}
					})
				}
			} else {
				if ($('#' + unitid + ' .page-none').length > 0) {
					$('#' + unitid + ' .page-none').html('当前栏目暂无信息!')
				} else {
					$('#' + unitid + ' .page-content').after('<div class="page-none" style="margin: 120px;text-align: center;font-size: 22px;color: gray;">当前栏目暂无信息!</div>')
				}
			}
		})
	})
}

function checktoken () {
	if (typeof isLogin === 'function') {
		isLogin(false)
	}
}

function ajaxDataIphone (queryData, url, unitid) {
	$.ajax({
		url: url,
		type: 'get',
		data: queryData,
		success: function (result) {
			var html = $('#' + unitid + ' .page-content').html() + $(result.data.html).children('.page-content').html()
			$('#' + unitid + ' .page-content').html(html)
			loading = false
			if (paramJson.pageNo * paramJson.pageSize >= count) {
				$('.pagination').html('')
			} else {
				$('.more').html('加载更多')
			}
            if (isOpenTran()) {
                zh_tranBody()
            }
		},
		error: function (error) {
			loading = false
			$('.more').html('加载失败')
		}
	})
}

function ajaxDataPc (queryData, url, unitid) {
	$.ajax({
		url: url,
		type: 'get',
		data: queryData,
		success: function (result) {
			$('#' + unitid + ' .page-content').load('#' + unitid + ' .page-content', function () {
				$('#' + unitid + ' .page-content').html($(result.data.html).find('.page-content').html())
				if (isOpenTran()) {
				    zh_tranBody()
				}
				setTimeout(function () {
					expiration();
					dateReplace();
				},0)
			})
		},
		error: function (error) {}
	})
}

// 获取cookie中数据
function getCookie(a) {
    var b = a + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(b);
        if (offset != -1) {
            offset += b.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(offset, end))
        } else {
            return ""
        }
    }
}
// 判断是否开启简繁体
function isOpenTran() {
  if (typeof String.prototype.tran === 'function') {
	  var a = $("meta[name=WebId]").attr('content');
	  var choose = getCookie("zh_choose_" + a)
	  if (choose && choose !== 'n') {
		  return true;
	  }
  }
  return false;
}
// 信息前后缀根据有效期显示
function expiration() {
  var list = document.getElementsByClassName('prefixContent')
  var listsuf = document.getElementsByClassName('suffixContent')
  var now = new Date();
  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
  // let prefixContentlist = [...list, ...listsuf]
	var prefixContentlist = []
	for (var i = 0; i < list.length; i++) {
		prefixContentlist.push(list[i])
	}
	for (var i = 0; i < listsuf.length; i++) {
		prefixContentlist.push(listsuf[i])
	}
	for (var i = 0; i < prefixContentlist.length; i++) {
		var overTime;
    var origintime;
		if (prefixContentlist[i].attributes && prefixContentlist[i].attributes.overtime) {
			overTime = prefixContentlist[i].attributes.overtime.value
		}
		if (prefixContentlist[i].attributes && prefixContentlist[i].attributes.origintime) {
			origintime = prefixContentlist[i].attributes.origintime.value
		}
    if (overTime && origintime) {
      overTime = overTime * 1
      origintime = origintime * 1
      var value = prefixContentlist[i].style.display;
      if (overTime > 0) {
        let overDate = overTime * 86400000 + origintime
        // 兼容历史数据
        if(value === 'none'){
            if (startOfDay <= overDate) {
							prefixContentlist[i].style.display = "";
            }
        }else{
            if (startOfDay > overDate) {
							prefixContentlist[i].parentNode.removeChild(prefixContentlist[i])
          }
        }
      }else if(overTime === -1){
           if(value === 'none'){
            prefixContentlist[i].style.display = "";
           }else{
            prefixContentlist[i].parentNode.removeChild(prefixContentlist[i])
           }
      }
    }
	}
}
// 日期替换今天、昨天、前天
function dateReplace() {
  var spans = document.getElementsByClassName('date-replace');
  // 获取当前时间的Date对象
  const currentDate = new Date();
  // 获取今天的年月日
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  // 获取昨天的日期
  const yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
  // 获取前天的日期
  const beforeYesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 2);

  for(var i = 0; i < spans.length; i++) {
    var item = spans[i]
    // let timestamp = item.attributes.time.value
		var timestamp
		if (item.attributes && item.attributes.time) {
			timestamp = item.attributes.time.value
		}
    if(timestamp){
      // 将13位时间戳转换为JavaScript Date对象
      const inputDate = new Date(timestamp*1);
      // 比较并返回结果
      let result = ''
    if (inputDate >= today) {
        result =  "今天";
    } else if (inputDate >= yesterday && inputDate < today) {
        result =  "昨天";
    } else if (inputDate >= beforeYesterday && inputDate < yesterday) {
        result =  "前天";
    }
    if(result !== ''){
      // 替换每个元素的内容
      spans[i].innerText = result;
    }
  }
 }
}
// 模板重新渲染执行
setTimeout(function () {
	expiration();
	dateReplace();
}, 0)