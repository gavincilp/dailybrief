var placeholder = {
    obj: null,
    init: function () {
        this.obj = $('.ui-placehoder');
        this.obj.click(function (e) {
            $('#q').focus();
            gethistory();
            e.stopPropagation();
            return false;
        });
    },
    show: function (callBack) {
        if (getQval() != '') {
            return;
        }
        this.obj.show(0, function () {
            if (callBack) {
                callBack();
            }
        });
    },
    hide: function (callBack) {
        this.obj.hide(0, function () {
            if (callBack) {
                callBack();
            }
        });
    }
};

// 设置麦克风
function configMic() {
    $('#jsearch-microphone-setup').click(function () {
        var src = $('#jsearch-microphone embed').attr('src');
        layer.open({
            type: 2,
            title: '语音设置',
            shadeClose: true,
            shade: 0.3,
            shift: 9,
            area: ['400px', '300px'],
            content: src, //iframe的url
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                top.location.reload();
                layer.close(index);
            }
        });
    });
}

// 麦克风设置值
function setTxtValue(value) {
    if (value && $.trim(value).length > 0) {
        $('#q').val(value);
        search_init();
    }
}

/**
 * Ajax方式提交表单
 *
 * @param url
 * @param setting
 * @returns
 */
function ajaxSubmit(url, setting) {

    var opt = {
        async: true,
        type: 'html',
        contentType: 'application/x-www-form-urlencoded',

        success: function () {
        },
        complete: function () {
        },
        data: null
    };
    opt = $.extend(opt, setting);
    $.ajax({
        type: "post",
        url: url,
        dataType: opt.type,
        error: opt.error,
        contentType: opt.contentType,
        data: opt.data,
        success: opt.success,
        complete: opt.complete
    });
}

function ajaxGet(url, setting) {
    jQuery.support.cors = true;
    var opt = {
        async: true,
        type: 'text/html',
        contentType: 'application/x-www-form-urlencoded',

        success: function () {
        },
        complete: function () {
        },
        data: null,
        xhrFields: {
            withCredentials: true
        }
    };
    opt = $.extend(opt, setting);
    $.ajax({
        type: "get",
        url: url,
        dataType: opt.type,
        error: opt.error,
        contentType: opt.contentType,
        data: opt.data,
        success: opt.success,
        complete: opt.complete
    });
}

function limitText(text, length) {
    if (!length) {
        length = 19;
    }
    //alert(text.length);
    if (text.length > length) {
        text = text.substring(0, length - 1) + '...';
    }
    return text;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
}

//设置cookie值
function setCookie(name, value, seconds) {
    seconds = seconds || 0;
    var cookie = getqCookie(name);
    var cvalue = cookie;
    var cvalueArray = cvalue.split(":");
    var flag = true;
    for (var i = 0; i < cvalueArray.length; i++) {
        if (cvalueArray[i] === value) {
            flag = false;
        }
    }
    if (flag) {
        if (flag && value) {
            cvalue = value + ":" + cookie;
        }
        if (cvalueArray.length > 10) {
            cvalueArray.pop();
            cvalue = cvalueArray.join(":");
        }
        var expires = "";
        if (seconds != 0) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + escape(cvalue) + expires + "; path=/"; //转码并赋值
    }
}


// 搜索结果处理方式
var resultSearch = function () {
    // 在结果中搜索
    $('.result-in').find('input').click(function () {
        var $val = "";
        if ($(this).prop('checked')) {
            if (!$('#q').val() || $('#q').val() == '') {
                if ($("#hotwordword .hotwordrank").eq(0).find("a").length > 0) {
                    $('#q').val($("#hotwordword .hotwordrank").eq(0).find("a").html() + ">");
                    jgqshow();
                } else {
                    alert("请输入您要搜索的内容")
                    $(this).prop('checked', false)
                }
            } else {
                $val = $('#q').val() + ">";
                $('#q').val($val);
                jgqshow();
            }
        } else {
            $val = $.trim($('#q').val()).replace(/>/g, "");
            $("#jgq").hide().val("");
            $('#q').val($val).removeClass("disabled").removeAttr("readonly").focus();
        }
    });
}

//在结果中搜索
var jgqshow = function (jgq) {
    $('#q').addClass("disabled").prop("readonly", "true");
    if (jgq) {
        $("#jgq").val(jgq);
    } else {
        if (getQueryVariable("jq")) {
            $("#jgq").val(decodeURIComponent(getQueryVariable("jq")));
        }
    }

    $("#jgq").show();
    $("#searchtext").show();
    var fontwidth = $("#q").val().visualLength() + parseInt($("#q").css("padding-left").replace("px",""));

    $("#searchtext").hide();
    $("#jgq").css({
        "left": fontwidth,
        "width": $('#q').width() - fontwidth - 10
    });
    $("#jgq").focus();
}


//在结果中搜索回显
function zjgzjs() {
    var jq = getQueryVariable("jq");
    var yq = getQueryVariable("yq");
    if (jq && yq) {
        jq = decodeURIComponent(jq);
        yq = decodeURIComponent(yq);
        $("#result-in").attr("checked", "checked");
        $("#q").val(yq + ">");
        jgqshow(jq);
    }
}

String.prototype.visualLength = function () {
    var ruler = $("#searchtext");
    ruler.text(this);
    ruler.css("font-size", $("#q").css("font-size"));
    return ruler[0].offsetWidth;
};


// 同义词 拼音
function checkError() {
    if (!$("#result-in").prop('checked')) {
        var checkErrorVal = getQueryVariable("checkError");
        if (!checkErrorVal) {
            checkErrorVal = $("#checkError").val();
        }
        var q = $("#q").val();
        var temporaryQvalue = $("#temporaryQ").val();
        if (getcheckerror()) {
            q = temporaryQvalue;
        }
        var data = "q=" + q;
        $.ajax({
            url: 'interface/auxiliary/find-standard',
            data: data,
            success: function (rst) {
                if (rst) {
                    $("#errorword").html("<div>" +
                        "<span>您是不是要搜索：</span>" +
                        "<a href='javascript:void(0)'>" +
                        rst + "</a></div>");
                    $("#errorword").show();
                    checkevent();
                    $(".reci").hide()
                }
            }
        });
        var qvalue = $("#word").val();
        if (checkErrorVal == 1) {
            if (temporaryQvalue != '') {
                $("#q").val(temporaryQvalue);
                $("#q").val(temporaryQvalue);
                $(".reci").hide();
                $("#errorword").show();
                $("#errorword").html("<p>已显示\"" + qvalue + "\"的搜索结果，仍然搜索：<a href='javascript:void(0)' style='text-decoration: underline'>" + temporaryQvalue + "</a></p>");
                checkevent(true);
            }
        }
    }
}

function getcheckerror() {
    var checkErrorVal = parseInt(getQueryVariable("checkError"));
    if (!checkErrorVal) {
        checkErrorVal = $("#checkError").val();
    }
    var temporaryQvalue = $("#temporaryQ").val();
    if (checkErrorVal == 1 && temporaryQvalue) {
        return true;
    }
    return false;
}

var GetQueryJson2 = function () {
    var jsonQuery = {
        q: $("#q").val(),
        serviceId: $("#searchid").val(),
        cateid: $("#cateid").val(),
        webid: $("#webid").val(),
        websiteid: $("#websiteid").val()
    }
    // var url = window.location.href;
    // var param = {}; // 存储最终JSON结果对象
    // url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
    // 	param[v] = decodeURIComponent(k); //解析字符为中文
    // 	return k + '=' + v;
    // });
    // return encodeURIComponent(JSON.stringify(param));
    return encodeURIComponent(JSON.stringify(jsonQuery));
}

var getDateStr = function (nowDate) {
    var month = (nowDate.getMonth() + 1) + '';
    if (month.length == 1) {
        month = '0' + month;
    }
    var day = nowDate.getDate() + '';
    if (day.length == 1) {
        day = '0' + day;
    }
    return nowDate.getFullYear() + month + day;
};

//替换url的参数
function replaceUrl(data, before, after) {
    var replace = [];
    var dataArr = data.split("&");
    for (var i = 0; i < dataArr.length; i++) {
        var iscon = false;
        for (var j = 0; j < before.length; j++) {
            var keyAndValue = dataArr[i].split("=");
            var key = keyAndValue[0];
            var value = keyAndValue[1];
            if (key == before[j]) {
                iscon = true;
                replace.push(key + "=" + encodeURIComponent(after[j]));
            }
        }
        if (!iscon) {
            replace.push(dataArr[i]);
        }
    }
    for (var i = 0; i < before.length; i++) {
        var flag = false;
        for (var j = 0; j < replace.length; j++) {
            var keyAndValue = replace[j].split("=");
            var key = keyAndValue[0];
            if (before[i] == key) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            replace.push(before[i] + "=" + encodeURIComponent(after[i]));
        }
    }
    var result = [];
    if (replace && replace.length > 0) {
        for (var m = 0; m < replace.length; m++) {
            var keyAndValue = replace[m].split("=");
            if ((keyAndValue[0] && keyAndValue[1]) || keyAndValue[0] == 'websiteid') {
                result.push(replace[m])
            }
        }
    }
    return result.join("&");
}

// 获取赋值的字段
function openParame(data) {
    var param = [];
    var value = [];
    var q = $("#q").val();
    if (!$('.result-in').find('input').prop('checked')) {
        param.push("q");
        value.push(q);
        data = removeParem(data, "jq");
        data = removeParem(data, "yq");
    } else {
        q = q.substring(0, q.length - 1)
        var jgq = $("#jgq").val();
        param.push("yq");
        value.push(q);
        param.push("jq");
        value.push(jgq);
        param.push("q");
        value.push(q + " " + jgq);
    }
    return replaceUrl(data, param, value)
}

function removeParem(data, removekey) {
    var dataArr = data.split("&");
    var result = []
    for (var i = 0; i < dataArr.length; i++) {
        var keyAndValue = dataArr[i].split("=");
        var key = keyAndValue[0];
        var value = keyAndValue[1];
        if (key !== removekey && value && value != '') {
            result.push(key + "=" + value)
        }
    }
    return result.join("&")
}

// 页面显示的个数
function limitNum(data, length) {
    if (!length) {
        length = 10;
    }
    if (Object.prototype.toString.call(data).slice(8, -1) === "Array") {
        if (data.length > length) {
            data.length = length;
        }
    }
    return data;
}


function getqCookie(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';') // 把cookie分割成组
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i] // 取得字符串
        while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
            c = c.substring(1, c.length) // 有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
            return unescape(c.substring(nameEQ.length, c.length)); // 解码并截取我们要值
        }
    }
    return "";
}

function doKeyDown() {
    if (event.keyCode == 13) //回车键的键值为13
        document.getElementById("ipt_btn").click(); //调用搜索按钮的搜索事件
}


var dateFormat = function (timestamp) {
    var times = parseInt(timestamp);
    var date = new Date(times);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

function setTab(name, cursel, n) {
    for (var i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        var more = document.getElementById("more_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
        more.style.display = i == cursel ? "block" : "none";
    }
}

function setTab2(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

function setTab3(name, cursel) {
    if ($('#' + name + cursel).hasClass("hover")) {
        return;
    } else {
        $('.search-manage').removeClass("hover");
        $('#' + name + cursel).addClass("hover");
    }
}


//高级检索与政策文件检索显示与切换
function searchadv() {
    // 点击出现高级检索弹框
    $("#senior").click(function () {
        $(".senior").addClass("active")
        $(".policy").removeClass("active")
        $(".highLevelSearchSelectModalBg").show();
        $('.highLevelSearchSelectModal').slideDown("normal");
        $(".highLevelSearchContent").show();
        $(".policyContent").hide();
    })

    //点击出现政策文件检索
    $("#policy").click(function () {
        $(".policy").addClass("active")
        $(".senior").removeClass("active")
        $(".highLevelSearchSelectModalBg").show();
        $('.highLevelSearchSelectModal').slideDown("normal");
        $(".highLevelSearchContent").hide();
        $(".policyContent").show();
    })
    // 高级检索&政策文件检索切换
    $(".tabselectList>span").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        $(".tabselectContent>div").eq(index).show().siblings().hide();
    })

    // 关闭弹框以及遮罩层
    $(".closeBtn").click(function () {
        $(".highLevelSearchSelectModal").slideUp();
        $(".highLevelSearchSelectModalBg").hide();
    })

    // 选项框
    // 高级检索
    $(".highLevelSearchContent .wordTypeList li").click(function () {
        $(this).addClass("selectOn").siblings().removeClass("selectOn");
        $("#doctype").val();
    })
    $(".highLevelSearchContent .timeFrameList .timeFrameListItem").click(function () {
        $(this).addClass("selectOn").siblings(".timeFrameListItem").removeClass("selectOn")
        if ($(this).data("value") == 5) {
            $(".customtime").show();
        } else {
            $(".customtime").hide();
        }
    })
    $(".highLevelSearchContent .sortOrderList li").click(function () {
        $(this).addClass("selectOn").siblings().removeClass("selectOn")
    })
    $(".highLevelSearchContent .keyWordSiteList li").click(function () {
        $(this).addClass("selectOn").siblings().removeClass("selectOn")
    })
    // 政策文件检索
    $(".policyContent .timeFrameList li").click(function () {
        $(this).addClass("selectOn").siblings().removeClass("selectOn")
        if ($(this).data("value") == 5) {
            $(".customtime").show();
        } else {
            $(".customtime").hide();
        }
    })
    $(".policyContent .sortOrderList li").click(function () {
        $(this).addClass("selectOn").siblings().removeClass("selectOn")
    })
    $(".policyContent .keyWordSiteList li").click(function () {
        $(this).addClass("selectOn").siblings().removeClass("selectOn")
    })

    gjjsevent();
    zcwjjsevent();
}

function expandCateMerge() {
    $('.jsearch-category-merge').each(function (index, obj) {
        var expandBtn = $(this).find('.jsearch-category-merge-expand-btn'); //jsearch-category-merge-expand-btn
        var infoUl = $(this).find('ul');
        expandBtn.click(function () {
            infoUl.slideToggle();
        });
    });
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "";
}


//处理其他参数
function otherdata(data, cateid) {
    var pg = $("#pg").val();
    var q = $('#q').val();
    if (getcheckerror()) {
        q = $("#word").val();
    }
    var eq = decodeURIComponent(getQueryVariable("eq"));
    var attachType = decodeURIComponent(getQueryVariable("_cus_pq_ja_type"));
    if (websiteid) {
        data += "websiteid=" + websiteid;
    } else {
        data += "websiteid=";
    }
    var webId = $('#webid').val();
    if (webId) {
        data += "&webId=" + webId;
    }
    //发文机构和发文字号
    var _cus_eq_fbjg = decodeURIComponent(getQueryVariable("dispatch_input"));
    var _cus_eq_filenumber = decodeURIComponent(getQueryVariable("_cus_eq_filenumber"));

    if ($("#result-in").prop('checked')) {
        q = q.substring(0, q.length - 1)
        q += " " + $("#jgq").val();
    }
    data += '&q=' + encodeURIComponent(q) + '&pg=' + encodeURIComponent(pg);
    if (eq) {
        data += '&eq=' + encodeURIComponent(eq);
    }
    if (cateid) {
        data += "&cateid=" + cateid;
    }
    if (attachType) {
        data += "&attachType=" + attachType;
    }
    if (searchid) {
        data += "&serviceId=" + searchid;
    }
    if (_cus_eq_fbjg) {
        data += "&_cus_eq_fbjg=" + encodeURIComponent(_cus_eq_fbjg);
    }
    if (_cus_eq_filenumber) {
        data += "&_cus_eq_filenumber=" + encodeURIComponent(_cus_eq_filenumber);
    }
    if ($('#attachsearchtype').prop('checked')) {
        data += 'attachSearchType=1';
    }
    var dim = getdim();
    if (dim) {
        data += dim
    }
    var group_count = getgroup_count();
    if (group_count) {
        data += group_count
    }
    return data;
}

//处理最新信息
function otherdatanew(data, cateid) {
    var pg = 10;
    var q = $('#q').val();
    if (getcheckerror()) {
        q = $("#word").val();
    }
    var eq = decodeURIComponent(getQueryVariable("eq"));
    var attachType = decodeURIComponent(getQueryVariable("_cus_pq_ja_type"));
    if (websiteid) {
        data += "websiteid=" + websiteid;
    } else {
        data += "websiteid=";
    }
    var webId = $('#webid').val();
    if (webId) {
        data += "&webId=" + webId;
    }
    //发文机构和发文字号
    var _cus_eq_fbjg = decodeURIComponent(getQueryVariable("dispatch_input"));
    var _cus_eq_filenumber = decodeURIComponent(getQueryVariable("_cus_eq_filenumber"));

    if ($("#result-in").prop('checked')) {
        q = q.substring(0, q.length - 1)
        q += " " + $("#jgq").val();
    }
    data += '&q=' + encodeURIComponent(q) + '&pg=' + encodeURIComponent(pg);
    if (eq) {
        data += '&eq=' + encodeURIComponent(eq);
    }
    if (cateid) {
        data += "&cateid=" + cateid;
    }
    if (attachType) {
        data += "&attachType=" + attachType;
    }
    if (searchid) {
        data += "&serviceId=" + searchid;
    }
    if (_cus_eq_fbjg) {
        data += "&_cus_eq_fbjg=" + encodeURIComponent(_cus_eq_fbjg);
    }
    if (_cus_eq_filenumber) {
        data += "&_cus_eq_filenumber=" + encodeURIComponent(_cus_eq_filenumber);
    }
    if ($('#attachsearchtype').prop('checked')) {
        data += 'attachSearchType=1';
    }
    var dim = getdim();
    if (dim) {
        data += dim
    }
    var group_count = getgroup_count();
    if (group_count) {
        data += group_count
    }
    return data;
}

//处理工具参数
function tooldata(data) {
    //查询范围
    var pos = decodeURIComponent(getQueryVariable("pos"));
    if (!pos) {
        pos = $("#pos").val();
    }
    $("#pos").val(pos);
    var postext = "";
    $(".highLevelSearchContent .keyWordSiteList ul li").each(function (index, item) {
        if ($(item).data("value") == pos) {
            postext = $(item).find("p").text();
        }
        ;
    });
    /*if (postext) {
      var $pos = $('#pos-box');
      $('.jsearch-condition-box-title>span', $pos).text(postext);
    }*/

    if (pos == "") {
        pos = "title,content,filenumber";
    }
    $("#pos-box .jsearch-condition-box-item[data-value=\"" + pos + "\"]").addClass("active");
    if (pos) {
        data += '&pos=' + pos;
    }
    //排序方式
    var sortType = decodeURIComponent(getQueryVariable("sortType"));
    if (!sortType) {
        sortType = $("#sortType").val();
    }
    $("#sortType").val(sortType);
    //排序方式
    var sortTypetext = '';
    $(".highLevelSearchContent .sortOrderList ul li").each(function (index, item) {
        if ($(item).data("value") == sortType) {
            sortTypetext = $(item).find("p").text();
        }
        ;
    });

    if (sortType === "") {
        sortType = 1;
    }
    $("#od-box .jsearch-condition-box-item[data-value=\"" + sortType + "\"]").addClass("active");
    if (sortType) {
        data += '&sortType=' + sortType;
    }

    //时间
    var begin = decodeURIComponent(getQueryVariable("begin"));
    if (!begin) {
        begin = $("#date_start").val();
    }
    var end = decodeURIComponent(getQueryVariable("end"));
    if (!end) {
        end = $("#date_end").val();
    }

    var timeType = decodeURIComponent(getQueryVariable("tt"));
    if (!timeType) {
        timeType = $("#timeType").val();
    }

    $("#date_start").val(begin);
    $("#date_end").val(end);
    $("#timeType").val(timeType);
    if (begin) {
        data += '&begin=' + begin;
    }
    if (end) {
        data += '&end=' + end;
    }
    if (timeType) {
        data += '&tt=' + timeType;
    }
    $(".timeSelection ul li[data-value=\"" + timeType + "\"]").addClass("active").siblings().removeClass("active");
    return data;
}

function getTargetDate(interval) {
    const today = new Date();
    const targetDate = new Date(today);

    switch (interval) {
        case 'week':
            targetDate.setDate(today.getDate() - 7);
            break;
        case 'month':
            targetDate.setMonth(today.getMonth() - 1);
            break;
        case 'year':
            targetDate.setFullYear(today.getFullYear() - 1);
            break;
    }

    return targetDate.getFullYear() + '-' + ("0" + (targetDate.getMonth() + 1)).slice(-2) + '-' + ("0" + targetDate.getDate()).slice(-2);
}
$(".timeSelection ul li").click(function () {
    var beginTime = "2024-01-01";
    var endTime = getTargetDate();
    timeType = $(this).attr("data-value");

    switch (timeType) {
        case "1":
            beginTime = "";
            endTime = "";
            break;
        case "2":
            beginTime = getTargetDate("week");
            break;
        case "3":
            beginTime = getTargetDate("month");
            break;
        case "4":
            beginTime = getTargetDate("year");
            break;
    }

    var data = removeParem(window.location.search.substring(1), "p");
    data = removeParem(data, "checkError");
    data = removeParem(data, "yq");
    data = removeParem(data, "jq");
    data = removeParem(data, "dispatch_input");
    data = removeParem(data, "_cus_eq_filenumber");
    data = removeParem(data, "tt");
    data += "&tt=" + timeType;
    if($("#catesearch").val() == 1) {
        window.location.href = "./catesearch?" + replaceUrl(data, ["begin", "end"], [beginTime, endTime]);
    }else{
        window.location.href = "./search?" + replaceUrl(data, ["begin", "end"], [beginTime, endTime]);
    }
});


function getdim() {
    var dim = ''
    $(".weidu").find("li.on").each(function (index, item) {
        var dimensionid = $(item).data("dimensionid");
        if (dimensionid == '全部' || dimensionid == '8d35accc29c34032b419b2d32c0504ea'
            || dimensionid == '9220b30d85e141c68dcc664a25befa92') {
            return;
        }
        var dimensionfieldname = $(item).data("dimensionfieldname");
        if (dim.indexOf('dimension_' + dimensionfieldname) > -1) {
            dim += ',' + encodeURIComponent(dimensionid);
        } else {
            dim += "&dimension_" + dimensionfieldname + "=" + encodeURIComponent(dimensionid);
        }
    })
    return dim;
}

function getgroup_count() {
    // var dictionaryCode = $('#dictionaryCode').val();
    var dim = ''
    $(".cbl").find("li.on").each(function (index, item) {
        var dimensionid = $(item).data("dimensionid");
        var fieldname = $(item).data("fieldname");
        dim += "&dimension_" + fieldname + "=" + encodeURIComponent(dimensionid);
    })
    return dim;
}

function getdimMatter() {
    var dim = ''
    $(".weidu").find("li.on").each(function (index, item) {
        var dimensionid = $(item).data("dimensionid");
        var dimensionfieldname = $(item).data("dimensionfieldname");
        dim += "&dimension_" + dimensionfieldname + "=" + encodeURIComponent(dimensionid);
    })
    return dim;
}

function getDimByUrl() {
    var dimension_ = []
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0].indexOf("dimension_") == 0) {
            dimension_.push(vars[i])
        }
    }
    return dimension_;
}

function initdelete() {
    $(".delete-icon").on("click", function () {
        $('#q').val('');
    })
}

$("#q").bind("input propertychange", function () {
    if ($(this).val() === '') {
        placeholder.show();
    } else {
        placeholder.hide();
    }
})

// 绑定输入框
function bindSearchForm() {
    $('#q').focus(function () {
        $(this).addClass('hover');
        if ($("#hotwordword .hotwordrank").eq(0).find("a").length > 0) {
            $('#q').val($("#hotwordword .hotwordrank").eq(0).find("a").html());
        }
        placeholder.hide();
        //$(".delete-icon").show();
    }).blur(function () {
        $(this).removeClass('hover');
        placeholder.show();
        //$(".delete-icon").hide();
    });

    $('#search-form').submit(function () {
        var q = getQval();
        var maxlength = $('#q').attr('maxlength');
        if (q.length > maxlength) {
            alert('检索词限制在' + maxlength + '个汉字以内');
            return false;
        }
        var findCateGuessJson = {
            searchid: searchid,
            cateid: getQueryVariable('cateid'),
            q: $('#q').val()
        }
        findCateGuess(findCateGuessJson);
        return true;
    });

    if ($.trim(getQval()).length == 0) {
        $('#q').focus();
    }

    $('.ui-search-btn').click(function () {
        search_init();
    });
}

// 获得搜索框的值
function getQval() {
    return $.trim($('#q').val());
}


function dealstyle() {
    $(".comprehensiveItem .firstpic img").each(function (index, item) {
        if (!$(this).attr("src")) {
            $(this).parent().siblings(".content").width("100%");
            $(this).parent().remove();
        }
    })
    $(".comprehensiveItem .jsearch-attachs").each(function (index, item) {
        if ($(this).children().length == 1) {
            $(this).hide();
        }
    })
    $(".bszn_list .zxblsxItem").each(function (index, item) {
        if ($(item).next().hasClass("comprehensiveItem")) {
            if (!$(item).hasClass("lastzxblsxItem")) {
                $(item).addClass("lastzxblsxItem");
            }
        }
    })
    $(".jcse-result-document").each(function (index, item) {
        $(item).find(".jcse-result-document-right").width(770 - 10 - $(item).find(".jcse-result-document-left").width());
        $(item).find(".jcse-result-document-left-img").width($(item).find(".jcse-result-document-left-top").width());
        $(item).find(".jcse-result-document-left-img").height($(item).find(".jcse-result-document-left-top").width());
    })

    $(".jcse-similarly-item-date").each(function (index, item) {
        var text = $(item).text();
        if (text.length == 8) {
            var year = text.substring(0, 4);
            var month = text.substring(4, 6);
            var day = text.substring(6, 8);
            $(item).text(year + '-' + month + '-' + day);
        }
    })
}

function inittop() {
    $(".toppng").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    })
}


// 前台点击数据收集接口（GET）
// 接口：interface/statistic/visit
// 参数：ClickLogFormBean、callback
function statisticVisit() {
    var data = "websiteid=" + $("#websiteid").val() + "&serviceId=" + $("#searchid").val() + "&webid=" + $("#webid").val();
    ajaxGet('interface/search/visit', {
        type: 'json',
        data: data,
        success: function (result) {
        },
        error: function (result) {
        }
    });
}

// 前台访问数据收集接口（GET）
// 接口：interface/statistic/click
// 参数：VisitLogFormBean、callback
// 0：搜索结果文章页 1:搜索按钮点击 2:搜索翻页点击 3:热搜词 4:二次搜索 5:高级检索 6:政策文件检索 7:搜索评价 8:热门文章 9:相关搜索 10:智能联想 11:相关推荐 12:知识卡片
function statistiClick(data) {
    data += "&cateid=" + getQueryVariable('cateid') + "&serviceId=" + $("#searchid").val() + "&websiteid=" + $("#websiteid").val();
    ajaxGet('interface/search/click', {
        type: 'json',
        data: data,
        success: function (result) {
        },
        error: function (result) {
        }
    });
}


window.onbeforeunload = onbeforeunload_handler;

function onbeforeunload_handler() {
    var locationhref = window.location.href
    if (locationhref.indexOf("/jpaas-jsearch-web-server/search") > 0 || locationhref.indexOf("/jpaas-jsearch-web-server/catesearch") > 0) {
        statisticVisit();
    }
}

function cut_str(str, len) {
    if (str.length > len) {
        return str.substring(0, len) + "...";
    } else {
        return str;
    }
}