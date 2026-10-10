// JavaScript Document
$(function () {
	var serviceId = $("#searchid").val();
	var q =  $("#q").val();
	var websiteid = $("#websiteid").val();
	ajaxGet('interface/auxiliary/find_web_id_by_q', {
    data: "serviceId=" + serviceId + "&q=" + q,
    type: 'json',
    success: function (result) {
			if(result.data.website && websiteid != result.data.website.websiteId) {
				if (confirm("您搜索的关键词中包含" + result.data.website.webName + "，是否跳转" + result.data.website.webName + "进行搜索")){
					window.location.href = "./search?serviceId=" + serviceId + "&q=" + q + "&websiteid=" + result.data.website.websiteId;
				}
			}
		}
	})
	placeholder.init();
	bindSearchForm();
	configMic();
	expandCateMerge();
	searchadv();
	searchassess();
	resultSearch();
	zjgzjs();
	initdelete();
	inittop();
	statisticVisit();
	setInterval(function(){
		statisticVisit();
	},1000 * 60);
	if($("#relatedWord").val() == 'true'){
		xgssc();
	}
	$(".historyWrap").on("click", function (e) {
		e.stopPropagation();
	})
});


function changeCate(cateSign) {
	$('#category').val(cateSign);
	search_init();
}

//高级检索提交时间
function gjjsevent() {
	$(".highLevelSearchContent .beginSearchBtn button").on("click",
		function () {
			var gq = $("#gq").val();
			var eq = $("#eq").val();
			if (!gq) {
				$(".gqvali").show();
				return;
			} else {
				$(".gqvali").hide();
			}
			placeholder.hide();
			//文档类型
			var _cus_pq_ja_type = '';
			$(".highLevelSearchContent .wordTypeList ul li").each(function (index, item) {
				if ($(item).hasClass("selectOn")) {
					var value = $(item).data("value");
					if (value != '0') {
						_cus_pq_ja_type = value;
					}
				};
			});
			//关键词位置
			var pos = "";
			$(".highLevelSearchContent .keyWordSiteList ul li").each(function (index, item) {
				if ($(item).hasClass("selectOn")) {
					pos = $(item).data("value");
				};
			});
			//排序方式
			var sortType = '';
			$(".highLevelSearchContent .sortOrderList ul li").each(function (index, item) {
				if ($(item).hasClass("selectOn")) {
					sortType = $(item).data("value");
				};
			});

			//时间
			var nowDate = new Date();
			var dateStr = getDateStr(nowDate);
			var begin = '';
			var end = dateStr;
			var data_value = 0;
			$(".highLevelSearchContent .timeFrameList ul li").each(function (index, item) {
				if ($(item).hasClass("selectOn")) {
					data_value = $(item).data("value");
					if (data_value != 5) {
						switch (data_value) {
							case 0:
								begin = '';
								end = '';
								break;
							case 1:
								begin = dateStr;
								break;
							case 2:
								nowDate.setDate(nowDate.getDate() - 7);
								begin = getDateStr(nowDate);
								break;
							case 3:
								nowDate.setMonth(nowDate.getMonth() - 1);
								begin = getDateStr(nowDate);
								break;
							case 4:
								nowDate.setFullYear(nowDate.getFullYear() - 1);
								begin = getDateStr(nowDate);
								break;
						}
					} else {
						begin = $("#date_start2").val();
						end = $("#date_end2").val();
					}
				};
			});
			if (data_value != 5) {
				if (begin && begin != '') {
					begin = begin.substring(0, 4) + "-" + begin.substring(4, 6) + "-" + begin.substring(6, 8);
				}
				if (end && end != '') {
					end = end.substring(0, 4) + "-" + end.substring(4, 6) + "-" + end.substring(6, 8);
				}
			}
			var data = removeParem(window.location.search.substring(1), "p")
			data = removeParem(data, "checkError");
			data = removeParem(data, "yq");
			data = removeParem(data, "jq");
			data = removeParem(data, "dispatch_input");
			data = removeParem(data, "_cus_eq_filenumber");

			var dataclick = "clickType=5&q=" + encodeURIComponent(gq);
		  statistiClick(dataclick);

			window.location.href = "./search?" + replaceUrl(data, ["q","eq","_cus_pq_ja_type", "pos", "sortType", "begin", "end"], [gq, eq, _cus_pq_ja_type, pos, sortType, begin, end]);
			return false;
		})
}

// 政策文件检索提交
function zcwjjsevent() {
	$(".policyContent .beginSearchBtn button").on("click", function () {
		var q = $("#Keyword").val();
		var dispatch_input = $("#dispatch").val();
		if (!q) {
			$(".gqvali1").show();
			return;
		} else {
			$(".gqvali1").hide();
		}
		placeholder.hide();
		var messageNum1 = $("#messageNum1").val();
		var messageNum2 = $("#messageNum2").val();
		var messageNum3 = $("#messageNum3").val();
		var _cus_eq_filenumber = messageNum1 + messageNum2 + messageNum3;
		//关键词位置
		var pos = "";
		$(".policyContent .keyWordSiteList ul li").each(function (index, item) {
			if ($(item).hasClass("selectOn")) {
				pos = $(item).data("value");
			};
		});
		//排序方式
		var sortType = '';
		$(".policyContent .sortOrderList ul li").each(function (index, item) {
			if ($(item).hasClass("selectOn")) {
				sortType = $(item).data("value");
			};
		});
		//时间
		var nowDate = new Date();
		var dateStr = getDateStr(nowDate);
		var begin = '';
		var end = dateStr;
		var data_value = 0;
		$(".policyContent .timeFrameList ul li").each(function (index, item) {
			if ($(item).hasClass("selectOn")) {
				data_value = $(item).data("value");
				if (data_value != 5) {
					switch (data_value) {
						case 0:
							begin = '';
							end = '';
							break;
						case 1:
							begin = dateStr;
							break;
						case 2:
							nowDate.setDate(nowDate.getDate() - 7);
							begin = getDateStr(nowDate);
							break;
						case 3:
							nowDate.setMonth(nowDate.getMonth() - 1);
							begin = getDateStr(nowDate);
							break;
						case 4:
							nowDate.setFullYear(nowDate.getFullYear() - 1);
							begin = getDateStr(nowDate);
							break;
					}
				} else {
					begin = $("#date_start1").val();
					end = $("#date_end1").val();
				}
			};
		});

		if (data_value != 5) {
			if (begin && begin != '') {
				begin = begin.substring(0, 4) + "-" + begin.substring(4, 6) + "-" + begin.substring(6, 8);
			}
			if (end && end != '') {
				end = end.substring(0, 4) + "-" + end.substring(4, 6) + "-" + end.substring(6, 8);
			}
		}
		var data = removeParem(window.location.search.substring(1), "p")
		data = removeParem(data, "checkError");
		data = removeParem(data, "yq");
		data = removeParem(data, "jq");
		data = removeParem(data, "eq");
		data = removeParem(data, "_cus_pq_ja_type");
		var dataclick = "clickType=6&q=" + encodeURIComponent(q);
		statistiClick(dataclick);
		window.location.href = "./search?" + replaceUrl(data, ["q","dispatch_input", "_cus_eq_filenumber", "pos", "sortType", "begin", "end"], [q, dispatch_input, _cus_eq_filenumber, pos, sortType, begin, end]);
		return false;
	})
}

//搜索评价
function searchassess() {
	// 点击不满意按钮出现反馈内容并隐藏原按钮
	$(".bmy").click(function () {
		/*$(".queryAssess").hide();*/
		$(".feedbackContent").show();
	})
	// 反馈页面问题选择以及关闭
	$(".questionList li").click(function () {
		if ($(this).text() == '其他问题') {
			$(".result_feedback_question_describe").show();
		} else {
			$(".result_feedback_question_describe").hide();
		}
		$("#question").val($(this).text());
		$("#questionvalue").val($(this).data("value"));
		$(".questionList").hide();
	})
	$("#question").click(function (e) {
		e.stopPropagation()
		$(".questionList").toggle();
	})
	$(".assessBtn").find("div").eq(0).on("click", function () {
		surveySatisfied(1);
		return false;
	})
	$(".tjfk").on("click", function () {
		if (!$("#question").val() || $.trim($("#question").val()) == "") {
			alert("请填写反馈内容");
			return false;
		}
		var question = $("#question").val();
		if ($("#question").val() == '其他问题') {
			if ($("#feedback_question").val() && $("#feedback_question").val() != '') {
				question = $("#feedback_question").val();
			}
		}
		surveySatisfied($("#questionvalue").val(), question);
		return false;
	})

	$(".closes").click(function () {
		$(".feedbackContent").hide();
		/*$(".queryAssess").show();*/
		return false;
	})
}

// 搜索结果满意度调查
var surveySatisfied = function (dataValue, message) {
	$(this).parent('#jcse-satisfied').empty();
	var imgpath = $("#tplpath").val() + "/images/bang.png";
	$('.queryAssess').html("<div class=\"evaluationSuccess\" style=\"text-align: center;\"><img src=\"" + imgpath + "\"><span class=\"pjcg\">评价成功</span><p class=\"gxn\">感谢您，您的评价会让我们做的更好</p></div>");
	if (dataValue !== '1') {
		$(".feedbackContent").hide();
		/*$(".queryAssess").show()*/;
	}
	var ajaxdata = 'serviceId=' + $("#searchid").val();
	if (message) {
		ajaxdata += '&satisfiedType=' + dataValue + '&satisfiedMsg=' + message + '&searchQuery=' + GetQueryJson2();
	} else {
		ajaxdata += '&satisfiedType=' + dataValue + '&searchQuery=' + GetQueryJson2();
	}

	var dataclick = "clickType=7&q=" + encodeURIComponent($('#q').val());
	statistiClick(dataclick);

	$.ajax({
		type: "GET",
		url: "./interface/auxiliary/satisfiedCollection",
		data: ajaxdata
	});
}


// 相关搜索词
function xgssc() {
	var q = $('#q').val();
	if ($("#temporaryQ").val() != '') {
		q = $("#word").val();
	}
	if (getQueryVariable("checkError") == "0") {
		q = $("#q").val();
	}

	var data = "q=" + encodeURIComponent(q) + "&count=6";
	ajaxGet('interface/recommend/rankword', {
		type: 'json',
		data: data,
		success: function (result) {
			if (result && result.data && result.data.rankword && result.data.rankword.length > 0) {
				var suggestions = result.data.rankword;
				var html = "<ul class=\"clearfix\">";
				$.each(suggestions, function (i, related) {
					html += "<li><a href=\"javascript:void(0)\" title=\"" + related + "\">" + related + "</a></li>";
				})
				$(".queryAboutList").append(html + "</ul>");
				$(".queryAboutList li  a").on("click", function () {
					$("#q").val($(this).html().replace(/<em>/g, "").replace(/<\/em>/g, ""));
					$("#jgq").val("");

					var dataclick = "clickType=9&q=" + encodeURIComponent($('#q').val());
					statistiClick(dataclick);

					var cateLevel = $("#cateLevel").val();
					if (cateLevel === "1") {
						$("#result-in").prop('checked', false)
						search_init();
					} else {
						var data = window.location.search.substring(1);
						data = removeParem(data, "yq");
						data = removeParem(data, "jq");
						window.location.href = "./search?" + replaceUrl(data, ["q"], [$("#q").val()]);
					}
					gethistory();
				})
				$(".queryAbout").show();
			} else {
				$(".queryAbout").hide();
			}
		},
		error: function (result) {
			$(".queryAbout").hide();
		}
	});
}


function checkevent(checkError){
	$("#errorword a").on("click", function () {
		var text = $(this).text();
		placeholder.hide();
		if ($("#result-in").prop('checked')) {
			setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
			var q = $('#q').val();
			q = q.substring(0, q.length - 1);
			$("#jgq").val(text);
			var jgq = $("#jgq").val();
			var aq = q + " " + $("#jgq").val();
			var url = replaceUrl(window.location.search.substring(1), ["q", "yq", "jq"], [aq, q, jgq]);
			if(checkError){
				url = replaceUrl(url, ["checkError"], [0])
			}
			window.location.href = "./search?" + url;
		} else {
			setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
			var url = replaceUrl(window.location.search.substring(1), ["q", "yq", "jq"], [text, "", ""]);
			if(checkError){
				url = replaceUrl(url, ["checkError"], [0])
			}
			window.location.href = "./search?" + url;
		}
	})
}