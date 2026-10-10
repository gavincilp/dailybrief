var websiteid = $('#websiteid').val();
var searchid = $("#searchid").val();
//设置检索默认数量，系统默认为6，现修改为3
var defaultPG = 10;
// 由于要单独设定政务服务的展示数量，需要单独设置一个默认值，此时政务服务的数量不能再赋值给页面的pg ，不然影响其他分类检索 需要新增一个政务服务的pg
var default_matterPG = 10;
$(function () {
    checkError();
    if ($("#q").val()) {
        placeholder.hide();
    }
    var datasearchmanage = {
        serviceId: searchid
    };
    searchmanage_init(datasearchmanage);
    image_init();
    recommend_init();
    if ($("#groupCount").val() == 'true') {
        // 元数据中文名，样式的div，查询总数，元数据的英文名, 中文名和英文名 二选一填写即可
        setTimeout('group_count("部门","sjjg",40,"")', 1000);
    }
    $('.ipt_btn').click(function () {
        if ($("#q").val() === '') {
            alert("请输入您要搜索的内容");
            return;
        }
        var findCateGuessJson = {
            searchid: searchid,
            cateid: getQueryVariable('cateid'),
            q: $('#q').val(),
            serviceId: searchid
        }
        if (!$("#result-in").prop('checked')) {
            var dataclick = "clickType=1&q=" + encodeURIComponent($('#q').val());
            statistiClick(dataclick);
        } else {
            var dataclick = "clickType=4&q=" + encodeURIComponent($('#q').val());
            statistiClick(dataclick);
        }
        findCateGuess(findCateGuessJson);
        /*自定义方法 搜搜历史*/
        historyRecord();
    });
});
// 分类关键词猜测
function findCateGuess(findCateGuessJson) {
    ajaxGet('interface/search/findcateguess', {
        data: findCateGuessJson,
        type: 'json',
        success: function (result) {
            var searchResult = result.data.searchResult;
            if (searchResult) {
                if (searchResult.pid) {
                    if (websiteid) {
                        window.location.href = "./search?serviceId=" + findCateGuessJson.searchid + "&q=" + findCateGuessJson.q + "&cateid=" + searchResult.pid + "&websiteid=" + websiteid;
                    } else {
                        window.location.href = "./search?serviceId=" + findCateGuessJson.searchid + "&q=" + findCateGuessJson.q + "&cateid=" + searchResult.pid;
                    }
                } else {
                    if (websiteid) {
                        window.location.href = "./search?serviceId=" + findCateGuessJson.searchid + "&q=" + findCateGuessJson.q + "&cateid=" + searchResult.iid + "&websiteid=" + websiteid;
                    } else {
                        window.location.href = "./search?serviceId=" + findCateGuessJson.searchid + "&q=" + findCateGuessJson.q + "&cateid=" + searchResult.iid;
                    }
                }
            } else {
                $('.menu_li').remove();
                var data = "serviceId=" + findCateGuessJson.searchid + "&websiteid=" + websiteid + "&cateid=" + $("#cateid").val();
                if (getdim()) {
                    var keys = [];
                    var values = [];
                    var dims = getdim().split("&");
                    for (var i = 0; i < dims.length; i++) {
                        keys.push(dims[i].split("=")[0]);
                        values.push(dims[i].split("=")[1]);
                    }
                    data = replaceUrl(data, keys, values);
                }
                if ($("#result-in").prop('checked')) {
                    setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
                    var q = $('#q').val();
                    q = q.substring(0, q.length - 1);
                    var jgq = $("#jgq").val();
                    var aq = q + " " + $("#jgq").val();
                    window.location.href = "./search?" + replaceUrl(data, ["q", "yq", "jq"], [aq, q, jgq]);
                } else {
                    setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
                    window.location.href = "./search?" + replaceUrl(data, ["q", "yq", "jq"], [$('#q').val(), "", ""]);
                }
            }
        }
    })
}

//顶部tab分类
var searchStatistics = [];
function searchmanage_init(datasearchmanage) {
    $('.weidu').html('');
    ajaxGet('interface/structure/list-category', {
        data: datasearchmanage,
        type: 'json',
        success: function (result) {
            var need = result.data.categories;
            if (need && need.length > 0) {
                var cateid = getQueryVariable("cateid");
                var $content_nav = $('.content_title ul');
                var currentflag = false;
                var index = 0;

                var q = $('#q').val();
                if ($("#result-in").prop('checked')) {
                    q = q.substring(0, q.length - 1)
                    q += " " + $("#jgq").val();
                }
                var totalQueryUrl = "/api-gateway/jpaas-jsearch-web-server/interface/search/app/info?websiteid=&q=" + q + "&pg=&cateid=&serviceId=" + searchid;
                $.ajax({
                    url: totalQueryUrl,
                    type: "get",
                    async: false,
                    success: function (result) {
                        var _data = result.data.appSearchResultBeanList;
                        var interfaceData = [];
                        interfaceData = _data.map(function (item) {
                            if (item.mapSearchResult) {
                                return {
                                    iid: item.category.iid,
                                    categoryName: item.category.categoryName,
                                    total: item.mapSearchResult.total
                                }
                            } else if(item.matterSearchResult){ //政务服务内容在matterSearchResult下
                                return {
                                    iid: item.category.iid,
                                    categoryName: item.category.categoryName,
                                    total: item.matterSearchResult.total
                                }
                            } else {
                                return {
                                    iid: item.category.iid,
                                    categoryName: item.category.categoryName,
                                    total: 0
                                }
                            }

                        });
                        var needData = need.map(function (item) {
                            return {
                                iid: item.iid,
                                categoryName: item.categoryName,
                                ordernum: item.ordernum
                            }
                        })

                        let tempObj = {};
                        console.log(interfaceData)
                        $.each(interfaceData, function (item) {
                            tempObj[item.iid] = $.extend({}, item);
                        });

                        var combineData = [];
                        var hasAllInfo = $.grep(interfaceData, function (item) {
                            return item.categoryName === "全部信息";
                        }).length > 0;
                        var hasZwfw = $.grep(interfaceData, function (item) {
                            return item.categoryName === "高效办成一件事" || item.categoryName === "政务服务事项";
                        });
                        var hasZwfwInfo = hasZwfw.length > 0;
                        $.each(needData, function (index, item) {
                            if (item.categoryName === "全部" && hasAllInfo) {
                                item.total = $.grep(interfaceData, function (item) {
                                    return item.categoryName === "全部信息";
                                })[0].total;
                            } else if (item.categoryName === "政务服务" && hasZwfwInfo) {
                                item.total = hasZwfw.reduce(function (sum, current) {
                                    console.log(current)
                                    return sum + (current.total || 0);
                                }, 0);
                            }
                            var matchingItem = $.grep(interfaceData, function (e) {
                                return e.iid === item.iid;
                            });
                            combineData.push($.extend({}, item, matchingItem[0]));
                        });
                        $.each(combineData, function (index, item) {
                            var statisticsTotal = 0;
                            var isActive = "";
                            if (item.total) {
                                statisticsTotal = item.total;
                            }

                            if (item.iid === cateid) {
                                isActive = "active";
                                $(".resultStatistics p span").text(item.total);
                            }
                            if (item.categoryName !== "全部") {
                                $(".searchStatistics .rightList ul").append("<li class=\"" + isActive + "\" data-value=\"" + item.iid + "\"><a>" + item.categoryName + "（<span>" + statisticsTotal + "</span>）</a></li>");
                            }
                        });
                    }
                });

                $.each(need, function (i, data) {
                    var itemData = "";
                    if (cateid && cateid === data.iid) {
                        $("#cateLevel").val(data.cateLevel);
                        if (data.cateLevel === 2 && data.hasChildren == 0 && data.matterMerge == 0) {
                            var dimensionResultBeans = data.dimensionResultBeans
                            if (dimensionResultBeans && dimensionResultBeans.length > 0) {
                                weidu_init_new(dimensionResultBeans);
                            }
                        }
                        index = i;
                        currentflag = true;
                        itemData = $('<li class="swiper-slide  specialNav_item current" title="' + data.categoryName + '" data-value="' + data.iid + '" data-children="' + data.hasChildren + '"><b><a href="#' + i + '">' + data.categoryName + '</a></b></li>');
                        $content_nav.append(itemData);
                        var searchVal = data.iid;
                        var hasChildren = data.hasChildren;
                        $("#cateid").val(searchVal);
                        cate_init(searchVal, hasChildren, data.matterMerge, data.attachFlag);
                    } else {
                        itemData = $('<li class="swiper-slide specialNav_item" data-level="' + data.cateLevel + '" title="' + data.categoryName + '" data-value="' + data.iid + '" data-children="' + data.hasChildren + '"><b><a href="#' + i + '">' + data.categoryName + '</a></b></li>');
                        $content_nav.append(itemData);
                    }
                });
                navSwiper.update();

                var width = 0;
                $content_nav.find("li.specialNav_item").each(function (index, item) {
                    width = width + $(item).width() + 50
                })
                $content_nav.width(width);
                if (index > 6) {
                    $(".content_title_item ul").css("marginLeft", (0 - (index - 6) * 170) + "px")
                }
                if (width > 1190) {
                    $(".content_title_left div").show();
                    $(".content_title_right div").show();
                    var finish = true
                    $(".content_title_left div").on("click", function () {
                        if (finish) {
                            finish = false
                            var marginLeft = $(".content_title_item ul").css('marginLeft');
                            marginLeft = parseInt(marginLeft.substring(0, marginLeft.indexOf("px")));
                            if (marginLeft < 0) {
                                marginLeft = 170 + marginLeft
                                $(".content_title_item ul").animate({
                                    marginLeft: marginLeft + "px"
                                },
                                    "normal",
                                    null,
                                    function () {
                                        finish = true
                                    }
                                )
                            } else {
                                finish = true
                            }
                        }
                    })
                    $(".content_title_right div").on("click", function () {
                        if (finish) {
                            finish = false
                            var marginLeft = $(".content_title_item ul").css('marginLeft');
                            marginLeft = parseInt(marginLeft.substring(0, marginLeft.indexOf("px")));
                            if ($content_nav.width() + marginLeft - 50 > 1140) {
                                marginLeft = -170 + marginLeft
                                $(".content_title_item ul").animate({
                                    marginLeft: marginLeft + "px"
                                },
                                    "normal",
                                    null,
                                    function () {
                                        finish = true
                                    }
                                )
                            } else {
                                finish = true
                            }
                        }
                    })
                } else {
                    $content_nav.width(1190);
                    $(".content_title_item").width(1140);
                }
                if (!currentflag) {
                    $('.specialNav_item').eq(0).addClass("current");
                    if (need && need.length > 0) {
                        var data = need[0];
                        var searchVal = data.iid;
                        $("#cateid").val(searchVal)
                        var hasChildren = data.hasChildren;
                        $("#cateLevel").val(data.cateLevel);
                        if (data.cateLevel === 2 && data.hasChildren == 0) {
                            var dimensionResultBeans = data.dimensionResultBeans
                            if (dimensionResultBeans && dimensionResultBeans.length > 0) {
                                weidu_init_new(dimensionResultBeans);
                            }
                        }
                        cate_init(searchVal, hasChildren, data.matterMerge, data.attachFlag);
                    }
                }
            }
            manage_search();
        }
    })
}


var matter_search = function (cateId, initgetknowledgecard) {
    $("#jsearch-condition-box-content").remove();
    $(".weidu").remove();
    //$(".matter_weidu").show();
    $(".weidu_title").each(function (index, item) {
        if ($(item).siblings(".weidu_content").height() > 52) {
            $(item).siblings(".weidu_more").show();
            $(item).siblings(".weidu_content").width($(".content_left").width() - $(item).width() - 20 - 45)
        } else {
            $(item).siblings(".weidu_content").width($(".content_left").width() - $(item).width() - 20)
        }
    })
    $(".weidu_more").each(function (index, item) {
        $(item).on("click", function () {
            if ($(this).text() == "收起") {
                $(this).parent().animate({
                    height: 52,
                    overflow: 'hidden'
                }, "fast");
                $(this).text("更多")
            } else {
                $(this).parent().animate({
                    height: $(this).siblings(".weidu_content").height(),
                    overflow: 'hidden'
                }, "fast");
                $(this).text("收起")
            }
        })
    })
    var imgpath = $("#tplpath").val() + "/images/nodata.png";
    var catehtml = '<div class="bszn content_nav resultBox"><div class="bszn_list clearfix"><ul></ul></div><div class="btn_more" style="margin-bottom: 20px"><span class="no_results"><img src="' + imgpath + '"/></span></div></div><div id="pagination" class="pagination"></div>';
    $('.content_cate').html(catehtml);
    if ($("#result-in").prop('checked')) {
        setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
    } else {
        setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
    }
    var data = "cateId=" + cateId + "&websiteId=" + websiteid;
    var p = getQueryVariable("p");
    if (p) {
        data += '&p=' + encodeURIComponent(p);
    } else {
        p = 1;
        data += '&p=1';
    }
    var q = $('#q').val();
    if (getcheckerror()) {
        q = $("#word").val();
    }
    if ($("#result-in").prop('checked')) {
        q = q.substring(0, q.length - 1)
        q += " " + $("#jgq").val();
    }
    var pg = $("#matter_pg").val();  //新增一个input存放政务服务的数量
    data += '&pg=' + encodeURIComponent(pg) + "&q=" + encodeURIComponent(q);
    ajaxGet('interface/matter_search/info', {
        type: 'json',
        data: data,
        success: function (res) {
            $('.content_nav .bszn_list').html("");
            var html = '';
            var hasContent = false; // 标记是否有内容
            if (res.data && res.data.matterSearchResult && res.data.matterSearchResult.matterResultBeans) {
                var matterResultBeans = res.data.matterSearchResult.matterResultBeans;
                var matterSearchResult = res.data.matterSearchResult;
                var total = matterSearchResult.total;
                if (total > 0) {
                    hasContent = true; // 有内容
                    if (matterSearchResult.pg) {
                        const pgValue = matterSearchResult.pg > default_matterPG ? default_matterPG : matterSearchResult.pg;
                        // 由于政务服务事项与其他分类的默认展示数量不同，所以这个不能赋值了
                        $("#matter_pg").val(pgValue);
                        pagination_new(p, total, pgValue)
                    }

                    //办事指南拼接
                    for (var i = 0; i < matterResultBeans.length; i++) {
                        html += '<div class="matter_box"><div class="matter_div clearfix"><span class="szf_col" tabindex="0" style="font-size: 18px;line-height: 35px;background: #1c64b6;padding: 0 13px;height: 35px;color: #fff !important;margin-right: 10px;display: inline-block;border-radius: 5px;">政务服务</span><span title="' + matterResultBeans[i].data.title_str + '" class="matter_title" data-basecode="' + matterResultBeans[i].data.baseCode + '" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '">' + matterResultBeans[i].data.title + '</span><span title="' + matterResultBeans[i].data.title_str + '" class="matter_button" data-basecode="' + matterResultBeans[i].data.baseCode + '" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '">办事指南</span></div><table class="sx_bable" style="border:1px solid #e8e8e8;width:100%;margin-top:20px;"><tbody><tr><td class="th td" width="15%" style="padding:10px;font-size:14px;"><span>事项类型：</span></td><td width="20%" class="td" style="padding:10px;font-size:14px;"><span>' + matterResultBeans[i].data.itemType + '</span></td><td width="15%" class="th td" style="padding:10px;font-size:14px;"><span>服务对象</span></td><td width="50%" class="td" style="padding:10px;font-size:14px;"><span>' + matterResultBeans[i].data.taskServiceObj + '</span></td></tr></tbody></table>';
                        if (matterResultBeans[i].data.districtidlist) {
                            if (matterResultBeans[i].data.districtidlist.indexOf(",") > 0) {
                                html += '<div class="xgbszn_box kbdq clearfix" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '" data-matterbean="' + matterResultBeans[i] + '" ></div>'
                            }
                        }
                        html += "</div>"
                    }
                    $('.content_nav .bszn_list').append(html);
                    $(".kbdq").each(function (index, item) {
                        morearea($(item).data("pkvalue"), $(item).data("districtid"), matterResultBeans[index], $(item));
                    })
                    $(".matter_button").on("click", function () {
                        bszn($(this));
                    })
                    $(".matter_title").on("click", function () {
                        bszn($(this));
                    })
                } else {

                    $("#pagination").hide();
                    $('.btn_more .no_results').show();
                }

            } else {

                $("#pagination").hide();
                $('.btn_more .no_results').show();
            }
        }
    })

    if (initgetknowledgecard) {
        $(".knowledgecard").html('');
        if (p && p == 1) {
            getknowledgecard(cateId);
        }
    }

}
// 左边tab分类管理
var cate_init = function (params, hasChildren, matterMerge, attachFlag) {
    $('.attachsearchtypebutton').hide();
    $('.attachsearchtypebutton1').show();
    if (hasChildren === 1) {
        ajaxGet('interface/structure/find-child-category', {
            data: {
                pid: params
            },
            type: 'json',
            success: function (result) {
                var data = result.data.categories;
                $('.content_nav').remove();
                if (data && data.length > 0) {
                    var $menuBox = $(".menuBox>ul");
                    if (!(data && data.length)) {
                        $('.ui-noresult-box').show();
                    } else {
                        var dimensionResultBeanArr = []
                        var dimensionResultBeanNameArr = []
                        $.each(data, function (i, item) {
                            var dimensionResultBeans = item.dimensionResultBeans
                            if (dimensionResultBeans && dimensionResultBeans.length > 0) {
                                for (var j = 0; j < dimensionResultBeans.length; j++) {
                                    var dimensionName = dimensionResultBeans[j].dimensionName
                                    var falg = true
                                    for (var m = 0; m < dimensionResultBeanNameArr.length; m++) {
                                        if (dimensionName == dimensionResultBeanNameArr[m]) {
                                            falg = false;
                                            break
                                        }
                                    }
                                    if (falg) {
                                        dimensionResultBeanNameArr.push(dimensionName)
                                        dimensionResultBeanArr.push(dimensionResultBeans[j]);
                                    }
                                }
                            }
                            var itemContent = "";
                            itemContent = $('<li class="menu_li" title="' + item.categoryName + '" data-matter="' + item.matterMerge + '" data-id="' + item.iid + '" id="service' + i + '"><b><a href="#' + i + '">' + item.categoryName + '</a></b></li>');
                            $menuBox.append(itemContent);
                            // 内容部分的分类
                            var imgpath = $("#tplpath").val() + "/images/nodata.png";
                            var catehtml = '<div class="bszn content_nav resultBox"><ul class="bszn_ul cateidBox" data-id="' + item.iid + '" data-matter="' + item.matterMerge + '" data-name="' + item.categoryName + '"><li class="current2"><b readlabel>' + item.categoryName + '</b></li><li class="more_service"><a style="cursor:pointer">查看更多&gt;&gt;</a></li></ul><div class="bszn_list clearfix"><ul></ul></div><div class="btn_more" style="margin-bottom: 20px"><button onclick="return false;">加载更多</button><span class="no_results"><img src="' + imgpath + '"/></span></div></div>';
                            $('.content_cate').append(catehtml);
                        });
                        var findCateGuessJson = {
                            searchid: searchid,
                            cateid: getQueryVariable('cateid'),
                            q: $('#q').val()
                        }
                        ajaxGet('interface/search/findcateguess', {
                            data: findCateGuessJson,
                            type: 'json',
                            success: function (result) {
                                var searchResult = result.data.searchResult;
                                if (searchResult) {
                                    var resultli = false
                                    if (searchResult.pid) {
                                        var itemindex = 0;
                                        $(".menuBox>ul .menu_li").each(function (index, item) {
                                            if ($(item).data("id") == searchResult.iid) {
                                                resultli = true
                                                itemindex = index
                                                $(item).addClass("active");
                                            }
                                        })
                                        var m = $(".content_nav").eq(itemindex)
                                        $('html, body').scrollTop(m.offset().top)
                                        if (!resultli) {
                                            $(".menuBox ul li").eq(0).addClass("active");
                                        }
                                    } else {
                                        $(".menuBox ul li").eq(0).addClass("active");
                                    }
                                } else {
                                    $(".menuBox ul li").eq(0).addClass("active");
                                }
                            }
                        })
                        if (dimensionResultBeanArr && dimensionResultBeanArr.length > 0) {
                            weidu_init_new(dimensionResultBeanArr);
                        }
                        $(".menuBox ul li").on("click", function () {
                            tabClick($(this));
                        });
                        var cateLevel = $("#cateLevel").val();

                        if (cateLevel === "1") {
                            search_init(true, $("#cateid").val());
                        } else {
                            if (matterMerge == 1) {
                                matter_search($("#cateid").val(), true);
                            } else if (attachFlag == 1) {
                                $('.attachsearchtypebutton').show();
                                $('.attachsearchtypebutton1').hide();
                                attach_search($("#cateid").val(), true)
                                $("#attachFlag").val(1);
                            } else {
                                search_initnochild($("#cateid").val(), true);
                            }
                        }
                    }
                } else {
                    $("#cateLevel").val(2);
                    if (matterMerge == 1) {
                        matter_search(params, true);
                    } else if (attachFlag == 1) {
                        $('.attachsearchtypebutton').show();
                        $('.attachsearchtypebutton1').hide();
                        attach_search(params, true)
                        $("#attachFlag").val(1);
                    } else {
                        search_initnochild(params, true)
                    }
                }
            }
        });
    } else {
        if (matterMerge == 1) {
            matter_search(params, true);
        } else if (attachFlag == 1) {
            $('.attachsearchtypebutton1').hide();
            $('.attachsearchtypebutton').show();
            attach_search(params, true)
            $("#attachFlag").val(1);
        } else {
            search_initnochild(params, true)
        }
    }
}
//附件库
var attach_search = function (cateId, bl, weidup) {
    $("#jsearch-condition-box-content").remove();
    var imgpath = $("#tplpath").val() + "/images/nodata.png";
    var catehtml = '<div class="bszn content_nav resultBox"><div class="attach_list clearfix"><ul></ul></div><div class="btn_more" style="margin-bottom: 20px"><span class="no_results"><img src="' + imgpath + '"/></span></div></div><div id="pagination" class="pagination"></div>';
    $('.content_cate').html(catehtml);
    if ($("#result-in").prop('checked')) {
        setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
    } else {
        setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
    }
    var data = "cateId=" + cateId + "&websiteId=" + websiteid;
    var p = getQueryVariable("p");
    if (weidup) {
        p = weidup;
    }
    data = otherdata(data, cateId);
    data = tooldata(data);
    var attachSearchType = $('#attachSearch').val();
    data += "&attachSearchType=" + attachSearchType;
    if (p) {
        data += '&p=' + encodeURIComponent(p);
    } else {
        p = 1;
        data += '&p=1';
    }
    ajaxGet('interface/attach_search/info', {
        type: 'json',
        data: data,
        success: function (result) {
            if (result && result.data && result.data.attachSearchResult && result.data.attachSearchResult.resultDataList && result.data.attachSearchResult.total > 0) {
                var searchResult = result.data.attachSearchResult;
                var total = searchResult.total;
                if (searchResult.pg) {
                    const pgValue = searchResult.pg > defaultPG ? defaultPG : searchResult.pg;
                    $("#pg").val(pgValue);
                    $("#total").val(searchResult.total);
                    pagination_new(p, total, pgValue)
                }
                var html = "";
                html += '<div class="jg-box">';
                html += '<div class="jg-title cf">';
                html += '<div class="left jg-title-l">标题</div>';
                html += '<div class="right jg-title-r">操作</div>';
                html += '</div>';
                html += '<div class="jg-list-box">';
                var resultDataList = result.data.attachSearchResult.resultDataList;
                if (resultDataList.length > 0) {
                    for (var i = 0; i < resultDataList.length; i++) {
                        if (!resultDataList[i].groupData || resultDataList[i].groupData.length == 0) {
                            var data = resultDataList[i].data;
                            html += '<div class="jg-list jg-list-hover cf">';
                            html += getAttachDate(data, 0);
                            html += '</div>';
                        } else if (resultDataList[i].groupData.length == 1) {
                            var groupData = resultDataList[i].groupData;
                            html += '<div class="jg-list jg-list-hover cf">';
                            html += getAttachDate(groupData[0].data, 0);
                            html += '</div>';
                        } else {
                            var groupData = resultDataList[i].groupData;
                            var wenjian = '';
                            wenjian += '<div class="wenjian">';
                            var infoTitle = '';
                            for (var j = 0; j < groupData.length; j++) {
                                var group = groupData[j].data;
                                infoTitle = group.infotitle;
                                wenjian += '<div class="wenjian-jg-list cf">';
                                wenjian += '<div class="left wenjian-jg-list-checkbox">';
                                // 多选选择按钮
                                // wenjian+='<input type="checkbox" name="checkbox2" id="check2" />';
                                // wenjian+='<label for="check2"></label>';
                                wenjian += '</div>';
                                wenjian += getAttachDate(group, 1);
                                wenjian += '</div>';
                            }
                            wenjian += '</div>';
                            // 文件
                            html += '<div class="wenjian-box jg-list-hover">';
                            html += '<div class="jg-list jg-list-hover cf">';
                            html += '<div class="left jg-list-l">';
                            html += '<div class="jg-list-l-title cf">';
                            // html+='<img src="images/wenjian.png">';
                            html += '<img src="' + $("#tplpath").val() + '/images/wenjian.png">';
                            html += '<span>' + infoTitle + '</span>';
                            html += '<div class="jg-list-more">';
                            html += '<div class="open cf"><span class="left">展开</span><img class="left" src="' + $("#tplpath").val() + '/images/open1.png"></div>';
                            html += '<div class="down cf hide"><span class="left">收起</span><img class="left" src="' + $("#tplpath").val() + '/images/down.png"></div>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                            // html+='<div class="right jg-list-r">';
                            // html+='<ul class="cf">';
                            // html+='<li>下载</li>';
                            // html+='</ul>';
                            // html+='</div>';
                            html += '</div>';
                            html += wenjian;
                            html += '</div>';
                        }
                    }
                }
                html += '</div>';
                html += '</div>';
                html += '<div class="tank">';
                html += '<div class="tank-title">用户隐私告知<span id="close"></span></div>';
                html += '<div class="tank-js">你好，你的下载行为将会被记录</div>';
                html += '<div class="tank-btn">';
                html += '<input type="button" value="我知道了" name="confirm" class="tank-btn-tj">';
                html += '</div>';
                html += '</div>';
                $('.content_cate .attach_list').html(html);
                $(function () {
                    $('.ztlist-r li').click(function () {
                        var index = $(this).index();
                        $(this).addClass('hover').siblings().removeClass('hover');
                    });
                })
                $(function () {
                    $('.jg-list-hover').hover(function () {
                        $(this).addClass('huise').siblings().removeClass('huise');
                    });
                })
                // 隔行变色
                // $(function () {
                //   $('.jg-list-box .jg-list:odd').addClass("huise");
                // });
                // 弹框
                $("#close").click(function () {
                    $(".tank").hide();
                })
                $(".tank-btn-tj").click(function () {
                    $(".tank").hide();
                    var cmsinfoid = overallSituationPageUrl.substring(overallSituationPageUrl.length - 37, overallSituationPageUrl.length - 5)
                    ajaxGet('interface/download/attach', {
                        type: 'json',
                        data: 'url=' + overallSituationUrl + '&fileName=' + overallSituationFileName + '&infoId=' + cmsinfoid,
                        success: function (result) {
                            window.open(result.data.result)
                        }
                    })
                })
                //下拉
                $(".jg-list-more .open").click(function () {
                    $(this).addClass("hide");
                    $(this).siblings('.down').removeClass("hide")
                    $(this).parents('.jg-list-l').parents('.jg-list').siblings('.wenjian').show();
                });
                $(".jg-list-more .down").click(function () {
                    $(this).addClass("hide");
                    $(this).siblings('.open').removeClass("hide")
                    $(this).parents('.jg-list-l').parents('.jg-list').siblings('.wenjian').hide();
                });
            } else {

                $("#pagination").hide();
                $('.btn_more .no_results').show();
            }
        },
        error: function (result) {

            $("#pagination").hide();
            $('.btn_more .no_results').show();
        }
    })
}
var overallSituationUrl = '';
var overallSituationFileName = '';
var overallSituationPageUrl = '';
function checkDownloadTime(url, fileName, page_url) {
    ajaxGet('/api-gateway/jpaas-web-server/front/document/download-fre', {
        type: 'json',
        success: function (result) {
            var attachSize = $('#attachSize').val();
            var fre = result.data;
            if (fre == 0) {
                $(".tank").show();
                overallSituationUrl = url;
                overallSituationFileName = fileName;
                overallSituationPageUrl = page_url;
                return
            }
            if (fre < attachSize) {
                // 37由来 信息id32位uuid,5位 .html
                var cmsinfoid = page_url.substring(page_url.length - 37, page_url.length - 5)
                ajaxGet('interface/download/attach', {
                    type: 'json',
                    data: 'url=' + url + '&fileName=' + fileName + '&infoId=' + cmsinfoid,
                    success: function (result) {
                        window.open(result.data.result)
                    }
                })
            } else {
                alert("您的下载次数已超过上限，请明日再试！");
            }
        }
    })
}

//最新信息检索
function search_init_new(iid) {
    var tip = '';
    var q = $("#q").val();
    const dom = document.createElement('div');
    q = $(dom).text(q).html();
    if ($("#result-in").prop('checked')) {
        q = q.substring(0, q.length - 1);
        // q += " " + $("#jgq").val();
    }
    if (q == null || q == '') {
        tip = '<div class="leftLabel_title"><span>最新相关信息</span></div>';
    } else {
        tip = '<div class="leftLabel_title"><span class="searchWord">"' + q + '"</span><span>的最新相关信息</span></div>';
    }
    var catehtml = '<div id="infonewall"><div class="leftLabel">' + tip + '<span id="showmore" class="infonew-title-zk">展开</span></div></div><div class="content_nav_new"><div class="bszn_list clearfix"></div></div>';
    $('.content_new').html(catehtml);
    $('#showmore').click(function () {

        $('[class="content clearfix hid"]').each(function (index, ele) {
            if ($(ele).is(':hidden')) {　　//如果node是隐藏的则显示node元素，否则隐藏
                $(".infonew-title-zk").html("收起");
                $(".infonew-title-zk").addClass("hover");
                $(ele).show();
            } else {
                $(".infonew-title-zk").html("展开");
                $(".infonew-title-zk").removeClass("hover");
                $(ele).hide();
            }
        });
    });

    var data = '';
    data = otherdatanew(data, iid);
    data += '&p=1';
    data = tooldata(data);
    ajaxGet('interface/search/info_new', {
        type: 'json',
        data: data,
        success: function (result) {
            $('.content_nav_new .bszn_list').html("");
            if (result.data.isSensitive) {
                $('.content_new').hide();
                return;
            } else {
                $('.content_new').show();
            }
            var searchResult = result.data.searchResult;
            var infos = '';
            var count = 1;
            if (result && result.data && result.data.searchResult && searchResult.total > 0) {
                var result = searchResult.result;
                if (searchResult.total <= 3) {
                    $('.infonew-title-zk').hide();
                }
                // if (result.length == 6) {
                //     result.length = 3
                // }
                for (var i = 0; i < result.length; i++) {
                    var title = result[i].data.title;
                    var createdatestr = result[i].data.createdatestr;
                    var titleHight = result[i].data.titleHight;
                    var url = result[i].data.url;
                    var infoNewHtml = '';
                    if (count > 3) { //显示个数
                        infoNewHtml = '<div style="display:none" class="content clearfix hid"><a data-title=' + title + ' target="_blank" href=' + url + ' class="textTitle">' + titleHight + '</a><span>' + createdatestr + '</span></div>';
                    } else {
                        infoNewHtml = '<div class="content clearfix"><a data-title=' + title + ' target="_blank" href=' + url + ' class="textTitle">' + titleHight + '</a><span>' + createdatestr + '</span></div>';
                    }
                    infos += infoNewHtml;
                    count++;
                }
                $('.content_nav_new .bszn_list').append(infos);
                $('.content_nav_new .bszn_list').find("a").on("click", function () {
                })

            } else {
                $('#infonewall').hide();
            }
        },
        error: function (result) {
            $('#infonewall').hide();
        }
    });

}

// 主搜 部分
function search_init(initgetknowledgecard, cateid) {
    $(".knowledgecard").html('');
    if ($("#result-in").prop('checked')) {

        setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
    } else {
        setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
    }
    var $yyfw = $('.content_nav');
    if (initgetknowledgecard && cateid) {
        getknowledgecard(cateid);
    }
    if ($("#searchNews").val() == 'true') {
        search_init_new($("#cateid").val());
    }
    $yyfw.each(function (index, cateGroupInfo) {
        var $cateGroupInfo = $(cateGroupInfo);
        var p = 1;
        var cateid = $cateGroupInfo.find('.cateidBox').data("id");
        var matter = $cateGroupInfo.find('.cateidBox').data("matter");
        var datanumber = 0;
        var webid = $('#webid').val();
        if (matter == 0) {
            var data = '';
            data = otherdata(data, cateid);
            data = tooldata(data);
            var searchdata = data + '&p=' + encodeURIComponent(p);
            ajaxGet('interface/search/info', {
                type: 'json',
                data: searchdata,
                success: function (result) {
                    $('.bszn_list', $cateGroupInfo).html("");
                    if (result.data.isSensitive) {
                        $('.content_cate').hide();
                        if (!$('.content_left').find(".sensitive")[0]) {
                            $('.content_left').append('<div style="text-align: center" class="sensitive"><h2>' + result.message + '</h2></div>');
                        }
                        return;
                    } else {
                        $('.content_cate').show();
                        if ($('.sensitive')) {
                            $('.sensitive').hide()
                        }
                    }
                    var searchResult = result.data.searchResult;
                    if (searchResult && searchResult.webSiteid) {
                        window.location.href = "./search?serviceId=" + searchid + "&websiteid=" + searchResult.webSiteid + "&q=" + $("#q").val();
                        return;
                    }
                    var infos = '';
                    if (result && result.data && result.data.searchResult && searchResult.total > 0) {
                        if (searchResult.pg) {
                            const pgValue = searchResult.pg > defaultPG ? defaultPG : searchResult.pg;
                            $("#pg").val(pgValue);
                        }
                        var total = searchResult.total;
                        // $(".resultStatistics p span").text(total);
                        var result = searchResult.result;
                        // if (result.length == 6) {
                        //     result.length = 3
                        // }
                        for (var i = 0; i < result.length; i++) {
                            infos += result[i];
                            datanumber++;
                        }
                        $('.bszn_list', $cateGroupInfo).append(infos);
                        $('.bszn_list', $cateGroupInfo).find("a").on("click", function () {
                            var href = $(this).attr("href");
                            var title = $(this).data("title")
                            if (title) {
                                title = title.replace(/<em>/, '');
                                title = title.replace(/<\/em>/, '');
                                var dataclick = "clickType=0&q=" + encodeURIComponent($("#q").val()) + "&url=" + encodeURIComponent(href) + "&title=" + encodeURIComponent(title);
                                statistiClick(dataclick);
                            }
                        })
                        $(".similarTotal").on("click", function () {
                            if ($(this).children(".similarTotal-open").css("display") === 'none') {
                                $(this).children(".similarTotal-open").css("display", "inline-block");
                                if ($(this).parent().parent().siblings(".jcse-similarly-box")) {
                                    $(this).parent().parent().siblings(".jcse-similarly-box").show();
                                }
                                if ($(this).parent().siblings(".jcse-similarly-box")) {
                                    $(this).parent().siblings(".jcse-similarly-box").show();
                                }
                                $(this).children(".similarTotal-notopen").hide();
                            } else {
                                $(this).children(".similarTotal-open").hide();
                                if ($(this).parent().parent().siblings(".jcse-similarly-box")) {
                                    $(this).parent().parent().siblings(".jcse-similarly-box").hide();
                                }
                                if ($(this).parent().siblings(".jcse-similarly-box")) {
                                    $(this).parent().siblings(".jcse-similarly-box").hide();
                                }
                                $(this).children(".similarTotal-notopen").css("display", "inline-block");
                            }
                        })
                        dealstyle();
                        if (total <= datanumber) {
                            $('.more_service', $cateGroupInfo).hide();
                            $('.btn_more button', $cateGroupInfo).hide();
                            $('.btn_more .no_results', $cateGroupInfo).hide();
                        } else {
                            $('.more_service', $cateGroupInfo).show();
                            $('.btn_more button', $cateGroupInfo).show();
                            $('.btn_more .no_results', $cateGroupInfo).hide();
                        }
                        $('.btn_more button', $cateGroupInfo).unbind("click")
                        $('.btn_more button', $cateGroupInfo).click(function () {
                            p += 1;
                            var uploaddata = data + '&p=' + p;
                            uploaddata = replaceUrl(uploaddata, ["pg"], [$("#pg").val()]);
                            ajaxGet('interface/search/info', {
                                type: 'json',
                                data: uploaddata,
                                success: function (result) {
                                    var searchResult = result.data.searchResult;
                                    if (searchResult && searchResult.webSiteid) {
                                        window.location.href = "./search?serviceId=" + searchid + "&websiteid=" + searchResult.webSiteid + "&q=" + $("#q").val();
                                        return;
                                    }
                                    if (result && result.data && result.data.searchResult && searchResult.total > 0) {
                                        if (searchResult.pg) {
                                            const pgValue = searchResult.pg > defaultPG ? defaultPG : searchResult.pg;
                                            $("#pg").val(pgValue);
                                        }
                                        var total = searchResult.total;
                                        var infos = '';
                                        var result = searchResult.result;
                                        // if (result.length == 6) {
                                        //     result.length = 3
                                        // }
                                        for (var i = 0; i < result.length; i++) {
                                            infos += result[i];
                                            datanumber++;
                                        }
                                        $('.bszn_list', cateGroupInfo).append(infos);
                                        $('.bszn_list', $cateGroupInfo).find("a").unbind("click");
                                        $('.bszn_list', $cateGroupInfo).find("a").on("click", function () {
                                            var href = $(this).attr("href");
                                            var title = $(this).data("title")
                                            if (title) {
                                                title = title.replace(/<em>/, '');
                                                title = title.replace(/<\/em>/, '');
                                                var dataclick = "clickType=0&q=" + encodeURIComponent($("#q").val()) + "&url=" + encodeURIComponent(href) + "&title=" + encodeURIComponent(title);
                                                statistiClick(dataclick);
                                            }
                                        })
                                        $(".similarTotal").unbind("click")
                                        $(".similarTotal").on("click", function () {
                                            if ($(this).children(".similarTotal-open").css("display") === 'none') {
                                                $(this).children(".similarTotal-open").css("display", "inline-block");
                                                if ($(this).parent().parent().siblings(".jcse-similarly-box")) {
                                                    $(this).parent().parent().siblings(".jcse-similarly-box").show();
                                                }
                                                if ($(this).parent().siblings(".jcse-similarly-box")) {
                                                    $(this).parent().siblings(".jcse-similarly-box").show();
                                                }
                                                $(this).children(".similarTotal-notopen").hide();
                                            } else {
                                                $(this).children(".similarTotal-open").hide();
                                                if ($(this).parent().parent().siblings(".jcse-similarly-box")) {
                                                    $(this).parent().parent().siblings(".jcse-similarly-box").hide();
                                                }
                                                if ($(this).parent().siblings(".jcse-similarly-box")) {
                                                    $(this).parent().siblings(".jcse-similarly-box").hide();
                                                }
                                                $(this).children(".similarTotal-notopen").css("display", "inline-block");
                                            }
                                        })

                                        dealstyle();

                                        if (total <= datanumber || $("#maxPageNum").val() <= p) {
                                            $('.more_service', cateGroupInfo).hide();
                                            $('.btn_more button', $cateGroupInfo).hide();
                                            $('.btn_more .no_results', $cateGroupInfo).hide();
                                        }
                                    } else {
                                        $('.more_service', cateGroupInfo).hide();
                                        $('.btn_more button', $cateGroupInfo).hide();
                                        $('.btn_more .no_results', $cateGroupInfo).hide();
                                    }
                                }
                            });
                        });
                    } else {
                        // 隐藏没有信息的分类
                        $cateGroupInfo.hide()
                        $('.more_service', $cateGroupInfo).hide();
                        $('.btn_more button', $cateGroupInfo).hide();
                        $('.btn_more .no_results', $cateGroupInfo).show();

                    }
                    $('.more_service', $cateGroupInfo).unbind("click")
                    $('.more_service', $cateGroupInfo).click(function () {
                        var data = "webId=" + webid;
                        if (websiteid) {
                            data += "&websiteid=" + websiteid;
                        } else {
                            data += "&websiteid=";
                        }
                        data += "&cateid=" + encodeURIComponent(cateid) + "&serviceId=" + searchid;
                        if ($("#result-in").prop('checked')) {
                            setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
                            var q = $('#q').val();
                            q = q.substring(0, q.length - 1);
                            var jgq = $("#jgq").val();
                            var aq = q + " " + $("#jgq").val();
                            data = replaceUrl(data, ["q", "yq", "jq"], [aq, q, jgq]);
                        } else {
                            setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
                            data = replaceUrl(data, ["q", "yq", "jq"], [$('#q').val(), "", ""]);
                        }
                        window.open('catesearch?' + data);
                    });
                },
                error: function (result) {

                }
            });
        } else {
            //$(".matter_weidu").show();
            var matterdata = "cateId=" + cateid + "&websiteId=" + websiteid;
            var q = $('#q').val();
            if (getcheckerror()) {
                q = $("#word").val();
            }
            if ($("#result-in").prop('checked')) {
                q = q.substring(0, q.length - 1)
                q += " " + $("#jgq").val();
            }
            var pg = $("#matter_pg").val();
            matterdata += '&pg=' + encodeURIComponent(pg) + "&q=" + encodeURIComponent(q);
            ajaxGet('interface/matter_search/info', {
                type: 'json',
                data: matterdata + '&p=' + encodeURIComponent(p),
                success: function (res) {
                    var searchResult = res.data.matterSearchResult;
                    $('.bszn_list', $cateGroupInfo).html("");
                    if (res.data && res.data.matterSearchResult && res.data.matterSearchResult.matterResultBeans && res.data.matterSearchResult.total > 0) {
                        var matterResultBeans = res.data.matterSearchResult.matterResultBeans;
                        var matterSearchResult = res.data.matterSearchResult;
                        var total = matterSearchResult.total;
                        if (matterSearchResult.pg) {
                            const pgValue = matterSearchResult.pg > default_matterPG ? default_matterPG : matterSearchResult.pg;
                            $("#matter_pg").val(pgValue);
                        }
                        var html = '';
                        for (var i = 0; i < matterResultBeans.length; i++) {
                            html += '<div class="matter_box"><div class="matter_div clearfix"><span class="szf_col" tabindex="0" style="font-size: 18px;line-height: 35px;background: #1c64b6;padding: 0 13px;height: 35px;color: #fff !important;margin-right: 10px;display: inline-block;border-radius: 5px;">政务服务</span><span title="' + matterResultBeans[i].data.title_str + '" class="matter_title" data-basecode="' + matterResultBeans[i].data.baseCode + '" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '">' + matterResultBeans[i].data.title + '</span><span title="' + matterResultBeans[i].data.title_str + '" class="matter_button" data-basecode="' + matterResultBeans[i].data.baseCode + '" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '">办事指南</span></div><table class="sx_bable" style="border:1px solid #e8e8e8;width:100%;margin-top:20px;"><tbody><tr><td class="th td" width="15%" style="padding:10px;font-size:14px;"><span>事项类型：</span></td><td width="20%" class="td" style="padding:10px;font-size:14px;"><span>' + matterResultBeans[i].data.itemType + '</span></td><td width="15%" class="th td" style="padding:10px;font-size:14px;"><span>服务对象</span></td><td width="50%" class="td" style="padding:10px;font-size:14px;"><span>' + matterResultBeans[i].data.taskServiceObj + '</span></td></tr></tbody></table>';
                            if (matterResultBeans[i].data.districtidlist) {
                                if (matterResultBeans[i].data.districtidlist.indexOf(",") > 0) {
                                    html += '<div class="xgbszn_box kbdq clearfix" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '" data-matterbean="' + matterResultBeans[i] + '" ></div>'
                                }
                            }
                            html += "</div>"
                            datanumber++;
                        }


                        $('.bszn_list', $cateGroupInfo).append(html);
                        $(".matter_button").unbind("click");
                        $(".matter_button").on("click", function () {
                            bszn($(this));
                        })
                        $(".kbdq").each(function (index, item) {
                            morearea($(item).data("pkvalue"), $(item).data("districtid"), matterResultBeans[index], $(item));
                        })
                        if (total <= datanumber) {
                            $('.more_service', $cateGroupInfo).hide();
                            $('.btn_more button', $cateGroupInfo).hide();
                            $('.btn_more .no_results', $cateGroupInfo).hide();
                        } else {
                            $('.more_service', $cateGroupInfo).show();
                            $('.btn_more button', $cateGroupInfo).show();
                            $('.btn_more .no_results', $cateGroupInfo).hide();
                        }
                        $('.btn_more button', $cateGroupInfo).unbind("click")
                        $('.btn_more button', $cateGroupInfo).click(function () {
                            p += 1;
                            var uploaddata = matterdata + '&p=' + p;
                            uploaddata = replaceUrl(uploaddata, ["pg"], [$("#matter_pg").val()]);
                            ajaxGet('interface/matter_search/info', {
                                type: 'json',
                                data: uploaddata,
                                success: function (res) {
                                    //政务服务事项检索结果在matterSearchResult下
                                    var searchResult = res.data.matterSearchResult;
                                    if (res.data && res.data.matterSearchResult && res.data.matterSearchResult.matterResultBeans && res.data.matterSearchResult.total > 0) {

                                        var matterResultBeans = res.data.matterSearchResult.matterResultBeans;
                                        var matterSearchResult = res.data.matterSearchResult;
                                        var total = matterSearchResult.total;
                                        if (matterSearchResult.pg) {
                                            const pgValue = matterSearchResult.pg > default_matterPG ? default_matterPG : matterSearchResult.pg;
                                            $("#matter_pg").val(pgValue);
                                        }
                                        var html = '';
                                        for (var i = 0; i < matterResultBeans.length; i++) {
                                            html += '<div class="matter_box"><div class="matter_div clearfix"><span class="szf_col" tabindex="0" style="font-size: 18px;line-height: 35px;background: #1c64b6;padding: 0 13px;height: 35px;color: #fff !important;margin-right: 10px;display: inline-block;border-radius: 5px;">政务服务</span><span title="' + matterResultBeans[i].data.title_str + '" class="matter_title" data-basecode="' + matterResultBeans[i].data.baseCode + '" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '">' + matterResultBeans[i].data.title + '</span><span title="' + matterResultBeans[i].data.title_str + '" class="matter_button" data-basecode="' + matterResultBeans[i].data.baseCode + '" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '">办事指南</span></div><table class="sx_bable" style="border:1px solid #e8e8e8;width:100%;margin-top:20px;"><tbody><tr><td class="th td" width="15%" style="padding:10px;font-size:14px;"><span>事项类型：</span></td><td width="20%" class="td" style="padding:10px;font-size:14px;"><span>' + matterResultBeans[i].data.itemType + '</span></td><td width="15%" class="th td" style="padding:10px;font-size:14px;"><span>服务对象</span></td><td width="50%" class="td" style="padding:10px;font-size:14px;"><span>' + matterResultBeans[i].data.taskServiceObj + '</span></td></tr></tbody></table>';
                                            if (matterResultBeans[i].data.districtidlist) {
                                                if (matterResultBeans[i].data.districtidlist.indexOf(",") > 0) {
                                                    html += '<div class="xgbszn_box kbdq clearfix" data-pkvalue="' + matterResultBeans[i].pkValue + '" data-districtid="' + matterResultBeans[i].data.districtidlist + '" data-matterbean="' + matterResultBeans[i] + '" ></div>'
                                                }
                                            }
                                            html += "</div>"
                                            datanumber++;
                                        }


                                        $('.bszn_list', $cateGroupInfo).append(html);
                                        $(".matter_button").unbind("click");
                                        $(".matter_button").on("click", function () {
                                            bszn($(this));
                                        });
                                        $(".kbdq").each(function (index, item) {
                                            morearea($(item).data("pkvalue"), $(item).data("districtid"), matterResultBeans[index], $(item));
                                        });
                                        if (total <= datanumber || $("#maxPageNum").val() <= p) {
                                            $('.more_service', cateGroupInfo).hide();
                                            $('.btn_more button', $cateGroupInfo).hide();
                                            $('.btn_more .no_results', $cateGroupInfo).hide();
                                        }
                                    } else {
                                        $cateGroupInfo.hide()
                                        $('.more_service', cateGroupInfo).hide();
                                        $('.btn_more button', $cateGroupInfo).hide();
                                        $('.btn_more .no_results', $cateGroupInfo).hide();
                                    }
                                }
                            });
                        });
                    } else {
                         $cateGroupInfo.hide()
                        $('.more_service', $cateGroupInfo).hide();
                        $('.btn_more button', $cateGroupInfo).hide();
                        $('.btn_more .no_results', $cateGroupInfo).show();
                    }
                    $('.more_service', $cateGroupInfo).unbind("click")
                    $('.more_service', $cateGroupInfo).click(function () {
                        var data = "webId=" + webid + "&matter=" + matter;
                        if (websiteid) {
                            data += "&websiteid=" + websiteid;
                        } else {
                            data += "&websiteid=";
                        }
                        data += "&cateid=" + encodeURIComponent(cateid) + "&serviceId=" + searchid;
                        if ($("#result-in").prop('checked')) {
                            setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
                            var q = $('#q').val();
                            q = q.substring(0, q.length - 1);
                            var jgq = $("#jgq").val();
                            var aq = q + " " + $("#jgq").val();
                            data = replaceUrl(data, ["q", "yq", "jq"], [aq, q, jgq]);
                        } else {
                            setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
                            data = replaceUrl(data, ["q", "yq", "jq"], [$('#q').val(), "", ""]);
                        }
                        window.open('catesearch?' + data);
                    });
                }
            })
        }
        if (initgetknowledgecard) {
            getknowledgecard(cateid);
        }
    });
    if ($('#q').val() === "公积金") {
        interactiveSearch("公积金");
    }
}

//可办地区新
var morearea = function (pkValue, districtidlist, matterBean, $this) {
    var jn_area = [
        {
            "id": "ca80b556b44a46c68a64bdc31d79c950",
            "name": "烟台市",
            "code": "370600000000"
        },
        {
            "id": "1eff69e761ed454482074b9430cbad7d",
            "name": "芝罘区",
            "code": "370602000000",

        },
        {
            "id": "709bfbf0f4e046e1bd6fc98400d23473",
            "name": "福山区",
            "code": "370611000000",

        },
        {
            "id": "02fefde36a6944b99d932ca3dcd935b7",
            "name": "莱山区",
            "code": "370613000000",

        },
        {
            "id": "1b78a53414ae4c739e38e4c67bb65c03",
            "name": "牟平区",
            "code": "370612000000",

        },
        {
            "id": "89ca90c56b434a30933dc4e674a66528",
            "name": "蓬莱区",
            "code": "370684000000",

        },
        {
            "id": "2a7f607781364b1196f4ab332ace8e6c",
            "name": "海阳市",
            "code": "370687000000",

        },
        {
            "id": "e314cab6e43c440d98b0e844c3ab2e4c",
            "name": "莱阳市",
            "code": "370682000000",

        },
        {
            "id": "0245e8b899f74929b55d78045e5e1cd7",
            "name": "栖霞市",
            "code": "370686000000",

        },
        {
            "id": "0170dcff76e24e48a811f070c267cbd7",
            "name": "龙口市",
            "code": "370681000000",

        },
        {
            "id": "75be7b2fbf6d494d99e2de404ef91e88",
            "name": "招远市",
            "code": "370685000000",

        },
        {
            "id": "8a6985b206304640b2971646cb470c94",
            "name": "莱州市",
            "code": "370683000000",

        },
        {
            "id": "6f9a3d0a82234a6d8c665885994d17d3",
            "name": "经开区",
            "code": "370690000000",

        },
        {
            "id": "4f7395e959b74b97a4cdeb4ec050675a",
            "name": "高新区",
            "code": "370692000000",

        },
        {
            "id": "00177a30080d4d94bc3fabdc83bf5d85",
            "name": "综合保税区",
            "code": "370605000000",

        },
        {
            "id": "83259f01b88f47efb6df24f02172a55e",
            "name": "长岛综合试验区",
            "code": "370634000000",

        },
        {
            "id": "fb0718f104424c8bacde83f4d8b56007",
            "name": "昆嵛山保护区",
            "code": "370691000000",

        }
    ]
    console.log('可办地区渲染')
    var districtidlist = (districtidlist + '').split(",");
    if (districtidlist.length <= 1) {
        $this.parent().css("padding", "5px 15px");
        $this.remove();
        return;
    }
    var morehtml = '<span class="xgbszn_tit">相关办事指南：</span><ul class="xgbszn_ul clearfix">'
    var li = ''

    var districtidlistObj = {};
    $.each(districtidlist, function (_, aItem) {
        districtidlistObj[aItem] = true;
    });

    $.each(jn_area, function (index, bItem) {
        var codePrefix = bItem.code.substring(0, 6);
        var isMatch = false;

        // 遍历districtidlistObj，检查code前缀是否匹配
        for (var key in districtidlistObj) {
            if (codePrefix === key.substring(0, 6)) {
                isMatch = true;
                break;
            }
        }

        if (isMatch) {
            li = '<li class="kbdq_li" data-districtiid="' + bItem.code + '" title="' + bItem.name + ' ">' + bItem.name + '</li>';
        } else {
            li = '<li data-districtiid="' + bItem.code + '" title="' + bItem.name + ' ">' + bItem.name + '</li>';
        }

        morehtml += li;
    });


    districtidlistindexflag = false;
    $this.html(morehtml);
    $this.find(".xgbszn_ul .kbdq_li").click(function () {
        var districtiid = $(this).data('districtiid');
        $("#districtiid").val(districtiid)
        bszn($this.parent().find(".matter_button"), districtiid);
    })
}

var checkeddistrictidlist = [];
function bszn($this, active_dq) {
    // 调用接口站点树
    checkeddistrictidlist = [];
    var districtidlist = $this.data("districtid").toString()
    var title = $this.attr('title');
    // $("#districtiid").val('');
    title = title.replace(/<em>/, '');
    title = title.replace(/<\/em>/, '');
    var basecode = $this.data("basecode");
    var pkValue = $this.data("pkvalue")
    $("#basecode").val(basecode);
    $("#matter_title").val(title);
    if (districtidlist.indexOf(',') > -1) {
        districtidlist = $this.data("districtid").split(",");
        // ajaxGet('interface/website/find_districtId_list', {
        //   type: 'json',
        //   data: 'pkValue=' + pkValue,
        //   success: function (res) {
        //     if (res.data.districtIdList) {
        //       districtidlistindexflag = false;
        //       $("#current span").html("");
        //       var checkdistrictIdList = res.data.districtIdList
        //       var allwebsite = jsonwebsite[0].childs;
        //       htmlwebsite = '';
        //       level = 0;
        //       dealwebsite(allwebsite, checkdistrictIdList, '', '', districtidlist);
        //       $(".tck_list").html(htmlwebsite);
        //       blindclickenent(checkdistrictIdList, districtidlist);
        //     }
        //     $('.tck_top_left').empty();
        //     $('.tck_top_left').text('选择办理地点');
        //     $(".highLevelSearchSelectModalBg").show();
        //     $('.zz_msk').css({ display: 'block' });
        //   }
        // })
        districtidlistindexflag = false;
        $("#current span").html("");
        var checkdistrictIdList = districtidlist
        var allwebsite = jsonwebsite[0].childs;
        htmlwebsite = '';
        level = 0;
        // function dealwebsite(allwebsite, checkdistrictIdList, id, choiceid, districtidlist)
        if (active_dq) {
            dealwebsite(allwebsite, checkdistrictIdList, '', active_dq, districtidlist);
            console.log('已选中' + active_dq)
        } else {
            dealwebsite(allwebsite, checkdistrictIdList, '', '', districtidlist);
        }

        $(".tck_list").html(htmlwebsite);
        blindclickenent(checkdistrictIdList, districtidlist);
        $('.tck_top_left').empty();
        $('.tck_top_left').text('选择办理地点');
        $(".highLevelSearchSelectModalBg").show();
        $('.zz_msk').css({ display: 'block' });

    } else {
        //如果只有一个 直接跳转
        ajaxGet('interface/matter_search/search_matter_data_info', {
            type: 'json',
            data: 'baseCode=' + basecode + "&districtId=" + districtidlist + "&title=" + encodeURIComponent(title),
            success: function (res) {
                if (res.data.matterSearchResult.total <= 1) {
                    var matterResultDataBeans0 = res.data.matterSearchResult.matterResultDataBeans[0];
                    if (matterResultDataBeans0 && matterResultDataBeans0.data.url) {
                        window.open(matterResultDataBeans0.data.url);
                    }
                }
            }
        })
    }
}

function search_initnochild(iid, initgetknowledgecard, weidup) {
    if ($("#searchNews").val() == 'true') {
        search_init_new($("#cateid").val());
    }
    var imgpath = $("#tplpath").val() + "/images/nodata.png";
    var catehtml = '<div class="bszn content_nav resultBox"><div class="bszn_list clearfix"><ul></ul></div><div class="btn_more" style="margin-bottom: 20px"><span class="no_results"><img src="' + imgpath + '"/></span></div></div><div id="pagination" class="pagination"></div>';
    $('.content_cate').html(catehtml);
    if ($("#result-in").prop('checked')) {
        setCookie('_jsearchq', $('#q').val().substring(0, $('#q').val().length - 1), 60 * 60 * 24 * 30);
    } else {
        setCookie('_jsearchq', $('#q').val(), 60 * 60 * 24 * 30);
    }
    var p = getQueryVariable("p");
    if (weidup) {
        p = weidup;
    }
    var data = '';
    data = otherdata(data, iid);
    if (p) {
        data += '&p=' + encodeURIComponent(p);
    } else {
        p = 1;
        data += '&p=1';
    }
    data = tooldata(data);
    ajaxGet('interface/search/info', {
        type: 'json',
        data: data,
        success: function (result) {
            $('.content_nav .bszn_list').html("");
            if (result.data.isSensitive) {
                $('.content_cate').hide();
                if (!$('.content_left').find(".sensitive")[0]) {
                    $('.content_left').append('<div style="text-align: center" class="sensitive"><h2>' + result.message + '</h2></div>');
                }
                return;
            } else {
                $('.content_cate').show();
                if ($('.sensitive')) {
                    $('.sensitive').hide();
                }
            }
            var searchResult = result.data.searchResult;
            if (searchResult && searchResult.webSiteid) {
                window.location.href = "./search?serviceId=" + searchid + "&websiteid=" + searchResult.webSiteid + "&q=" + $("#q").val();
                return;
            }
            var infos = '';

            if (result && result.data && result.data.searchResult && searchResult.total > 0) {
                var total = searchResult.total;
                // $(".resultStatistics p span").text(total);
                if (searchResult.pg) {
                    const pgValue = searchResult.pg > defaultPG ? defaultPG : searchResult.pg;
                    $("#pg").val(pgValue);
                    pagination_new(p, total, pgValue)
                }
                var result = searchResult.result;
                // if (result.length == 6) {
                //     result.length = 3
                // }
                for (var i = 0; i < result.length; i++) {
                    infos += result[i];
                }
                $('.content_nav .bszn_list').append(infos);
                $('.content_nav .bszn_list').find("a").on("click", function () {
                    var href = $(this).attr("href");
                    var title = $(this).data("title")
                    if (title) {
                        title = title.replace(/<em>/, '');
                        title = title.replace(/<\/em>/, '');
                        var dataclick = "clickType=0&q=" + encodeURIComponent($("#q").val()) + "&url=" + encodeURIComponent(href) + "&title=" + encodeURIComponent(title);
                        statistiClick(dataclick);
                    }
                })
                $(".similarTotal").on("click", function () {
                    if ($(this).children(".similarTotal-open").css("display") === 'none') {
                        $(this).children(".similarTotal-open").css("display", "inline-block");
                        if ($(this).parent().parent().siblings(".jcse-similarly-box")) {
                            $(this).parent().parent().siblings(".jcse-similarly-box").show();
                        }
                        if ($(this).parent().siblings(".jcse-similarly-box")) {
                            $(this).parent().siblings(".jcse-similarly-box").show();
                        }
                        $(this).children(".similarTotal-notopen").hide();
                    } else {
                        $(this).children(".similarTotal-open").hide();
                        if ($(this).parent().parent().siblings(".jcse-similarly-box")) {
                            $(this).parent().parent().siblings(".jcse-similarly-box").hide();
                        }
                        if ($(this).parent().siblings(".jcse-similarly-box")) {
                            $(this).parent().siblings(".jcse-similarly-box").hide();
                        }
                        $(this).children(".similarTotal-notopen").css("display", "inline-block");
                    }
                })

                dealstyle();
            } else {

                $("#pagination").hide();
                $('.btn_more .no_results').show();
            }
        },
        error: function (result) {

            $("#pagination").hide();
            $('.btn_more .no_results').show();
        }
    });

    if (initgetknowledgecard) {
        $(".knowledgecard").html('');
        if (p && p == 1) {
            getknowledgecard(iid);
        }
    }
}

function getknowledgecard(iid) {
    var q = $('#q').val();
    if (getcheckerror()) {
        q = $("#word").val();
    }
    var webId = $('#webid').val();
    var websiteid = $('#websiteid').val();
    // 知识卡片
    ajaxGet('interface/search/knowledgecard', {
        type: 'json',
        data: 'q=' + encodeURIComponent(q) + '&cateid=' + iid + '&webId=' + webId + '&websiteid=' + websiteid,
        success: function (res) {
            if (res.data.searchResult) {
                for (var m = 0; m < res.data.searchResult.length; m++) {
                    var searchResult = res.data.searchResult[m];
                    if (searchResult.knowledgecardCategory === 0) {
                        var knowledgecardKind = searchResult.knowledgecardKind;
                        if (knowledgecardKind == 1) {
                            if (searchResult.dataMap) {
                                var keyword = JSON.parse(searchResult.content).keyword
                                var keywordIntroduce = JSON.parse(searchResult.content).keywordIntroduce
                                var html = '';
                                var htmlTitle = '';
                                var htmlData = '';
                                var listData = searchResult.dataMap.data;
                                var i = 0;
                                for (var key in listData) {
                                    if (i == 0) {
                                        htmlTitle += '<li style="list-style: none;" class="choose">' + key + '</li>';
                                    } else {
                                        htmlTitle += '<li style="list-style: none;">' + key + '</li>';
                                    }
                                    if (i == 0) {
                                        htmlData += '<ul class="clearfix" >';
                                    } else {
                                        htmlData += '<ul class="clearfix" style="display: none">';
                                    }
                                    for (var j = 0; j < listData[key].length; j++) {
                                        htmlData += '<li style="list-style: none;" class="hover" data-pkvalue="' + listData[key][j].pkValue + '" data-districtidlist="' + listData[key][j].districtIdList + '" data-basecode="' + listData[key][j].baseCode + '"><span class="item_span">' + listData[key][j].title + '</span></li>';
                                    }
                                    htmlData += '</ul>';
                                    i++;
                                }
                                html += '<div class="bs_message">';
                                html += '<div class="bs_message_top clearfix">';
                                html += '<div class="message_top_left left">';
                                html += keyword;
                                html += '</div>';
                                html += '</div>';
                                html += '<div class="message_content">';
                                html += keywordIntroduce;
                                html += '</div>';
                                html += '<div class="message_operation">';
                                html += '<ul class="clearfix">';
                                html += htmlTitle;
                                html += '</ul>';
                                html += '</div>';
                                html += '<div class="message_search clearfix">';
                                html += htmlData;
                                html += '</div>';
                                html += '</div>';

                                if (htmlTitle && htmlData) {
                                    $(".knowledgecard").append(html).show();
                                }
                            }
                        }
                        if (knowledgecardKind == 2) {
                            var pic = searchResult.pic
                            if (searchResult.templateId === 2) {
                                var data = searchResult.list[0].title
                                if (data && data.length > 0) {
                                    var html = '<div class="clearfix template"><div class="imgdiv""><img src="' + pic + '" width="220" height="180"/></div><div class="data"><ul>';
                                    for (var i = 0; i < data.length; i++) {
                                        var url = data[i].data.url;
                                        var title = data[i].data.title;
                                        html += '<li><a href="' + url + '" target="_black">' + title + '</a></li>'
                                    }
                                    html += '</ul></div></div>'
                                    $(".knowledgecard").append(html).show();
                                }
                            } else if (searchResult.templateId === 1) {
                                if (searchResult.list) {
                                    var html = '';
                                    var htmlTitle = '';
                                    var htmlData = '';
                                    for (var i = 0; i < searchResult.list.length; i++) {
                                        var listData = searchResult.list[i];
                                        for (var key in listData) {
                                            var data = listData[key]
                                            if (data) {
                                                if (i > 0) {
                                                    htmlTitle += '<span class="catelog" style="margin-left:10px">' + key + '</span>';
                                                } else {
                                                    htmlTitle += '<span class="catelog current">' + key + '</span>';
                                                }
                                                if (i > 0) {
                                                    htmlData += '<div class="data2" style="display:none"><ul>';
                                                } else {
                                                    htmlData += '<div class="data2"><ul>';
                                                }
                                                for (var j = 0; j < data.length; j++) {
                                                    var url = data[j].data.url;
                                                    var title = data[j].data.title;
                                                    htmlData += '<li><a href="' + url + '" target="_black">' + title + '</a></li>';
                                                }
                                                htmlData += '</ul></div>';
                                            }
                                        }
                                    }
                                }
                            }
                            html += '<div class="clearfix template"><div style="width: 100%;">';
                            html += '<img src="' + pic + '" width="100%" height="60"/>';
                            html += '</div>';
                            html += '<div style="width: 100%;" class="catelogs">';
                            html += htmlTitle;
                            html += htmlData;
                            html += '</div>';
                            html += '</div>';
                            if (htmlTitle && htmlData) {
                                $(".knowledgecard").append(html).show();
                            }
                        }
                        if (knowledgecardKind == 3) {
                            if (searchResult.dataMap) {
                                var pic = searchResult.dataMap.pic
                                var html = '';
                                html += '<div class="ldxx">';
                                html += '<div class="ldxxcon clearfix">';
                                html += '<div class="ldxxcon_img left">';
                                html += '<img src="' + pic + '" />';
                                html += '</div>';
                                html += '<div class="ldjs left">';
                                html += '<div class="ldxmzw clearfix">';
                                html += searchResult.dataMap.name + '<span class="ldzw">' + searchResult.dataMap.position + '</span>';
                                html += '</div>';
                                html += '<div class="ldll">';
                                var introduction = searchResult.dataMap.introduction;
                                introduction = introduction.replace(/\n/g, '<br>');
                                html += introduction;
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                if (searchResult.dataMap.name && searchResult.dataMap.position) {
                                    $(".knowledgecard").append(html).show();
                                }
                            }
                        }
                        if (knowledgecardKind == 4) {
                            if (searchResult.dataMap) {
                                var html = '';
                                html += '<div class="mcxx">';
                                html += '<div class="mcxxcon">';
                                html += '<div class="mcxxname">';
                                html += '<div class="mcxxname_title">';
                                html += searchResult.dataMap.noun;
                                html += '</div>';
                                html += '<div class="mcxx_more">';
                                html += searchResult.dataMap.nounExplain;
                                var nounExplain = searchResult.dataMap.nounExplain;
                                nounExplain = nounExplain.replace(/\n/g, '<br>');
                                html += nounExplain;
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                if (searchResult.dataMap.noun && searchResult.dataMap.nounExplain) {
                                    $(".knowledgecard").append(html).show();
                                }
                            }
                        }
                        if (knowledgecardKind == 5) {
                            if (searchResult.dataMap) {
                                var html = '';
                                html += '<div class="orgin_message">';
                                html += '<div class="orgin_messagecon">';
                                html += '<table class="orgin_messagecontent" cellspacing="0" cellpadding="0">';
                                html += '<tr><td colspan="4" class="orgin_messageconTop"><div>' + searchResult.dataMap.organizationName + '</div></td></tr>';
                                html += '<tr><td class="tdleft">公开电话</td><td class="td">' + searchResult.dataMap.publicPhone + '</td><td class="tdleft">监督电话</td><td>' + searchResult.dataMap.supervisePhone + '</td></tr>';
                                html += '<tr><td class="tdleft">联系地址</td><td colspan="3">' + searchResult.dataMap.address + '</td></tr>';
                                html += '<tr>';
                                html += '<td class="tdleft">机关简介</td>';
                                html += '<td colspan="3">';
                                html += '<div class="jg_list">';
                                html += searchResult.dataMap.introduction.replace(/\n/g, '<br/>');
                                html += '</div>';
                                html += '</td>';
                                html += '</tr>';
                                html += '</table>';
                                html += '</div>';
                                html += '</div>';
                                if (searchResult.dataMap.organizationName) {
                                    $(".knowledgecard").append(html).show();
                                }
                            }
                        }
                        if (knowledgecardKind == 6) {
                            if (searchResult.dataMap) {
                                var html = '';
                                html += '<div class="cjwt">';
                                html += '<div class="cjwtcon">';
                                html += '<div class="cjwtcon_question">';
                                html += '<div class="question">';
                                html += '问：' + searchResult.dataMap.title;
                                html += '</div>';
                                html += '<div class="answer">';
                                var answer = searchResult.dataMap.answer.replace(/\n/g, '<br/>');
                                html += '答：' + answer;
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                html += '</div>';
                                if (searchResult.dataMap.title && searchResult.dataMap.answer) {
                                    $(".knowledgecard").append(html).show();
                                }
                            }
                        }
                    } else if (searchResult.knowledgecardCategory === 1) {
                        if (searchResult.url) {
                            var html = '<div class="clearfix template resultBox">';
                            html += '<iframe src="' + searchResult.url + '" onload="this.style.height=this.contentWindow.document.body.scrollHeight + 10 +\'px\'" width="100%" frameborder="no"/>';
                            html += '</html>';
                            $(".knowledgecard").append(html).show();
                        }
                    } else if (searchResult.knowledgecardCategory === 2) {
                        if (searchResult.content) {
                            var html = '<div class="clearfix template resultBox">' + searchResult.content + '</html>';
                            $(".knowledgecard").append(html).show();
                        }
                    }
                }
                $(".ldjs .ldll").each(function (index, item) {
                    var html = $(item).html();
                    $(this).html(lookmore($(this).html(), 80));
                    $(this).find(".more").on("click", function () {
                        var $parent = $(this).parent();
                        $parent.html(html);
                    })
                })
                $(".mcxx .mcxx_more").each(function (index, item) {
                    var html = $(item).html();
                    $(this).html(lookmore($(this).html(), 120));
                    $(this).find(".more").on("click", function () {
                        var $parent = $(this).parent();
                        $parent.html(html);
                    })
                })
                $(".orgin_messagecontent .jg_list").each(function (index, item) {
                    var html = $(item).html();
                    $(this).html(lookmore($(this).html(), 120));
                    $(this).find(".more").on("click", function () {
                        var $parent = $(this).parent();
                        $parent.html(html);
                    })
                })
                $(".cjwt .answer").each(function (index, item) {
                    var html = $(item).html();
                    $(this).html(lookmore($(this).html(), 150));
                    $(this).find(".more").on("click", function () {
                        var $parent = $(this).parent();
                        $parent.html(html);
                    })
                })
                $(".knowledgecard .template .catelog").each(function (index, item) {
                    $(item).on("click", function () {
                        $(this).addClass("current").siblings("span").removeClass("current");
                        $(this).parent().find(".data2").eq(index).show().siblings(".data2").hide();
                    })
                })
                $(".knowledgecard .template").on("click", function () {
                    var dataclick = "clickType=12&q=" + encodeURIComponent($('#q').val());
                    statistiClick(dataclick);
                })

                $('.message_operation ul li').click(function () {
                    //当前事项名称
                    var sj = $(this).index();
                    $(this).addClass('choose').siblings().removeClass('choose');
                    $('.message_search ul li').removeClass('choose');
                    $(this).parents('.bs_message').find('.message_search').find('ul').eq(sj).css({ display: 'block' }).siblings().css({ display: 'none' });
                })

                $('.message_search  ul li').click(function () {

                    // checkeddistrictidlist = [];
                    // // 调用接口站点树
                    // var districtidlist = $(this).data("districtidlist").split(",");

                    // var title = $(this).text();
                    // var basecode = $(this).data("basecode");
                    // var pkValue = $(this).data("pkvalue")
                    // $("#basecode").val(basecode);
                    // $("#matter_title").val(title);
                    // var that = this;
                    // ajaxGet('interface/website/find_districtId_list', {
                    //   type: 'json',
                    //   data: 'pkValue=' + pkValue,
                    //   success: function (res) {
                    //     if (res.data.districtIdList) {
                    //       districtidlistindexflag = false;
                    //       $("#current span").html("");
                    //       var checkdistrictIdList = res.data.districtIdList
                    //       var allwebsite = jsonwebsite[0].childs;
                    //       htmlwebsite = '';
                    //       level = 0;
                    //       dealwebsite(allwebsite, checkdistrictIdList, '', '', districtidlist);
                    //       $(".tck_list").html(htmlwebsite);
                    //       blindclickenent(checkdistrictIdList, districtidlist);
                    //     }
                    //     $('.tck_top_left').empty();
                    //     $('.tck_top_left').text('选择办理地点');
                    //     $(".highLevelSearchSelectModalBg").show();
                    //     $('.zz_msk').css({ display: 'block' });
                    //   }
                    // })
                    // 调用接口站点树
                    checkeddistrictidlist = [];
                    var districtidlist = $(this).data("districtidlist").split(",");
                    var title = $(this).text();
                    var basecode = $(this).data("basecode");
                    var pkValue = $(this).data("pkvalue")
                    $("#basecode").val(basecode);
                    $("#matter_title").val(title);
                    if (districtidlist.indexOf(',') > -1) {
                        districtidlist = $this.data("districtid").split(",");
                        districtidlistindexflag = false;
                        $("#current span").html("");
                        var checkdistrictIdList = districtidlist
                        var allwebsite = jsonwebsite[0].childs;
                        htmlwebsite = '';
                        level = 0;
                        dealwebsite(allwebsite, checkdistrictIdList, '', '', districtidlist);
                        $(".tck_list").html(htmlwebsite);
                        blindclickenent(checkdistrictIdList, districtidlist);

                        $('.tck_top_left').empty();
                        $('.tck_top_left').text('选择办理地点');
                        $(".highLevelSearchSelectModalBg").show();
                        $('.zz_msk').css({ display: 'block' });

                    } else {
                        //如果只有一个 直接跳转
                        ajaxGet('interface/matter_search/search_matter_data_info', {
                            type: 'json',
                            data: 'baseCode=' + basecode + "&districtId=" + districtidlist + "&title=" + encodeURIComponent(title),
                            success: function (res) {
                                if (res.data.matterSearchResult.total <= 1) {
                                    var matterResultDataBeans0 = res.data.matterSearchResult.matterResultDataBeans[0];
                                    if (matterResultDataBeans0 && matterResultDataBeans0.data.url) {
                                        window.open(matterResultDataBeans0.data.url);
                                    }
                                }
                            }
                        })
                    }
                })
            } else {
                $(".knowledgecard").hide();
            }
        }
    })
}

var districtidlistindexflag = false;
var level = 0;
var htmlwebsite = '';
var childflag = false;
var pathArr = [];
function dealwebsite(allwebsite, checkdistrictIdList, id, choiceid, districtidlist) {
    level++;
    if (id) {
        if (choiceid == id) {
            htmlwebsite += '<div class="tck_list_first districtiid_' + id + '  clearfix">';
        } else {
            htmlwebsite += '<div class="tck_list_first districtiid_' + id + '  clearfix" style="display:none">';
        }
    } else {
        htmlwebsite += '<div class="tck_list_first clearfix">';
    }
    htmlwebsite += '<div class="tck_list_sj left">';
    htmlwebsite += '<div class="tck_list_sj_right tck_list_sj_right_SJ left">';
    htmlwebsite += '<ul  class="clearfix">';
    var flag = false;
    if (!choiceid) {
        var choiceid = '';
    } else {
        choiceid = choiceid.toString()
        flag = true;
    }
    var flagi = 0;
    for (var i = 0; i < allwebsite.length; i++) {
        var kdj_checkdistrictIdList = []
        for (var j = 0; j < checkdistrictIdList.length; j++) {
            if (checkdistrictIdList[j].substring(0, 6) == allwebsite[i].code.substring(0, 6)) {
                kdj_checkdistrictIdList.push(checkdistrictIdList[j])
            }
        }

        if (kdj_checkdistrictIdList.length < 1) {
            htmlwebsite += '<li class="ashsetting">' + allwebsite[i].name + '</li>'
        } else if (kdj_checkdistrictIdList.length == 1) {
            $('.tck_bottom_ul').html('')
            if (!flag) {
                htmlwebsite += '<li class="canchoose" data-districtiid="' + allwebsite[i].code + '">' + allwebsite[i].name + '</li>';
            } else {
                if (choiceid == allwebsite[i].code) {
                    htmlwebsite += '<li class="choose canchoose" data-districtiid="' + allwebsite[i].code + '">' + allwebsite[i].name + '</li>';
                    flag = true;
                    districtidlistindexflag = true;
                    $("#current span").html(allwebsite[i].name);
                    $("#districtiid").val(allwebsite[i].code);
                    sure(kdj_checkdistrictIdList[0])
                } else {
                    htmlwebsite += '<li class="canchoose" data-districtiid="' + allwebsite[i].code + '">' + allwebsite[i].name + '</li>';
                }

            }
        } else if (kdj_checkdistrictIdList.length > 1) {
            $('.tck_bottom_ul').html('')
            if (!flag) {
                htmlwebsite += '<li class="canchoose" data-districtiid="' + allwebsite[i].code + '">' + allwebsite[i].name + '</li>';
            } else {
                if (choiceid == allwebsite[i].code) {
                    htmlwebsite += '<li class="choose canchoose" data-districtiid="' + allwebsite[i].code + '">' + allwebsite[i].name + '</li>';
                    flag = true;
                    districtidlistindexflag = true;
                    $("#current span").html(allwebsite[i].name);
                    $("#districtiid").val(allwebsite[i].code);
                    for (var j = 0; j < kdj_checkdistrictIdList.length; j++) {
                        sure(kdj_checkdistrictIdList[j], 'qingkong')
                    }
                } else {
                    htmlwebsite += '<li class="canchoose" data-districtiid="' + allwebsite[i].code + '">' + allwebsite[i].name + '</li>';
                }

            }
        }

    }
    if (choiceid == '') {
        choiceid = allwebsite[0].code;
    }
    htmlwebsite += '</ul>';
    htmlwebsite += '</div>';
    htmlwebsite += '</div>';
    htmlwebsite += '</div>';
    htmlwebsite += '<div class="tck_list_xian"></div>';
    if (allwebsite[flagi].childs && allwebsite[flagi].childs.length > 0) {
        dealwebsite(allwebsite[flagi].childs, checkdistrictIdList, allwebsite[flagi].code, choiceid, districtidlist);
    }
}


function getChild(jsonwebsitechilds, itemdistrictiid) {
    if (!childflag && jsonwebsitechilds && jsonwebsitechilds.length > 0) {
        for (var n = 0; n < jsonwebsitechilds.length; n++) {
            if (jsonwebsitechilds[n].code == itemdistrictiid) {
                childflag = true;
                pathArr = jsonwebsitechilds[n].childs;
                break;
            } else {
                getChild(jsonwebsitechilds[n].childs, itemdistrictiid)
            }
        }
    }
}
function blindclickenent(checkdistrictIdList, districtidlist) {
    $(".choose").unbind("click");
    $(".canchoose").unbind("click");
    var currentclick = '';
    $(".choose").on("click", function () {
        $('.tck_bottom_ul').html('')
        var kdj_checkdistrictIdList = []
        //点击时清空
        currentclick = $(this).data("districtiid").toString();
        // 使用for是为了避免出现 同一个事项在同一个区县得同一层级部门或街道都可办得情况
        for (var i = 0; i < districtidlist.length; i++) {
            if (districtidlist[i].substring(0, 6) == currentclick.substring(0, 6)) {
                kdj_checkdistrictIdList.push(districtidlist[i])
            }
        }
        if (kdj_checkdistrictIdList.length > 1) {
            for (var i = 0; i < kdj_checkdistrictIdList.length; i++) {
                $("#districtiid").val(currentclick);
                $("#current span").html($(this).text());
                sure(kdj_checkdistrictIdList[i], 'qingkong')
                console.log('区县级别 ：blindclickenent   choose 中执行')
            }

        } else if (kdj_checkdistrictIdList.length == 1) {
            $("#districtiid").val(currentclick);
            $("#current span").html($(this).text());
            sure(kdj_checkdistrictIdList[0])
            console.log('区县级别 ：blindclickenent   choose 中执行')
        }
        $(this).siblings().removeClass("choose");
    })
    $(".canchoose").on("click", function () {
        $('.tck_bottom_ul').html('')
        var kdj_checkdistrictIdList = []
        districtidlistindexflag = false;
        $(this).addClass("choose");
        var cdistrictiid = $(this).data("districtiid").toString();
        if (currentclick != cdistrictiid) {
            for (var i = 0; i < checkdistrictIdList.length; i++) {
                if (checkdistrictIdList[i].substring(0, 6) == cdistrictiid.substring(0, 6)) {
                    kdj_checkdistrictIdList.push(districtidlist[i])
                }
            }
            if (kdj_checkdistrictIdList.length > 1) {
                districtidlistindexflag = true;
                for (var i = 0; i < kdj_checkdistrictIdList.length; i++) {
                    $("#districtiid").val(cdistrictiid);
                    $("#current span").html($(this).text());
                    sure(kdj_checkdistrictIdList[i], 'qingkong')
                    console.log('blindclickenent  canchoose 中执行')
                }

            } else if (kdj_checkdistrictIdList.length == 1) {
                districtidlistindexflag = true;
                $("#districtiid").val(cdistrictiid);
                $("#current span").html($(this).text());
                sure(kdj_checkdistrictIdList[0])
                console.log('blindclickenent  canchoose 中执行')
            }
            $(this).siblings().removeClass("choose");
        }
    })
}
//	关闭
$('.close').click(function () {
    $(this).parents('.zz_msk').css({ display: 'none' });
    $('.tck_list_sj_right ul li').removeClass('choose');
    $('.tck_list_sj_right_QX ul').eq(0).css({ display: 'block' }).siblings().css({ display: 'none' });
    $(this).parents('.tck_top').siblings('.bszn_list').css({ display: 'none' });
    $(this).parents('.tck_top').siblings('.tck_bottom').css({ display: 'block' });
    $(".highLevelSearchSelectModalBg").hide();
});
//		取消
$('.quit1').click(function () {
    $(this).parents('.zz_msk').css({ display: 'none' });
    $('.tck_list_sj_right ul li').removeClass('choose');
    $('.tck_list_sj_right_QX ul').eq(0).css({ display: 'block' }).siblings().css({ display: 'none' });
    $(this).parent('.tck_bottom').css({ display: 'block' });
    $(this).parents('.tck_bottom').siblings('.bszn_list').css({ display: 'none' });
    $(".highLevelSearchSelectModalBg").hide();
});
// function sure() {
//   var iid = $("#districtiid").val();
//   var basecode = $("#basecode").val();
//   var matter_title = $("#matter_title").val();
//   ajaxGet('interface/matter_search/search_matter_data_info', {
//     type: 'json',
//     data: 'baseCode=' + basecode + '&districtId=' + iid + '&title=' + matter_title,
//     success: function (res) {
//       var html = '';
//       if (res.data.matterSearchResult) {
//         var matterResultDataBeans = res.data.matterSearchResult.matterResultDataBeans
//         for (var i = 0; i < matterResultDataBeans.length; i++) {
//           html += '<div class="bszn_listTitle_listcon clearfix">';
//           html += '<div class="bszn_listTitle_listcon01 left">';
//           if (matterResultDataBeans[i].data.deptname) {
//             html += matterResultDataBeans[i].data.deptname;
//           } else {
//             html += matterResultDataBeans[i].data.districtName;
//           }
//           html += '</div>';
//           html += '<div class="bszn_listTitle_listcon02 left">';
//           html += matterResultDataBeans[i].data.title;
//           html += '</div>';
//           html += '<div class="bszn_listTitle_listcon03 right">';
//           html += '<a href="' + matterResultDataBeans[i].data.url + '" target="_blank">查看指南</a>';
//           html += '</div>';
//           html += ' </div>';
//         }
//       }
//       $('.bszn_listName').html(matter_title + '信息查询<div class="close right">X</div>');
//       $(".bszn_listName .close").on("click", function () {
//         $('.itemlist .bszn_list').hide();
//         $(".zz_msk").show();
//       })
//       $('.bszn_listTitle_list').html(html);
//       $('.itemlist .bszn_list').css({ display: 'block' });
//       $(".zz_msk").hide();
//     }
//   })
// }

function sure(active_id, sfqk) {
    if (!active_id) {
        var iid = $("#districtiid").val();
    } else {
        var iid = active_id;
    }
    if (!sfqk) {
        $('.tck_bottom_ul').html('')
    } else {
        console.log('不需要清空' + sfqk)
    }
    var basecode = $("#basecode").val();
    var matter_title = $("#matter_title").val();
    ajaxGet('interface/matter_search/search_matter_data_info', {
        type: 'json',
        data: 'baseCode=' + basecode + '&districtId=' + iid + '&title=' + matter_title,
        success: function (res) {
            var html = '';
            if (res.data.matterSearchResult) {
                var matterResultDataBeans = res.data.matterSearchResult.matterResultDataBeans
                for (var i = 0; i < matterResultDataBeans.length; i++) {
                    if (matterResultDataBeans[i].data.deptname) {
                        html += '<li class="sxlistli clearfix"><div><span>' + matterResultDataBeans[i].data.itemName + '</span><i>【' + matterResultDataBeans[i].data.deptname + '】</i></div><div><a target="_blank" href="' + matterResultDataBeans[i].data.url + '">办事指南</a><div></li>';
                    }
                }
            }
            $('.tck_bottom_ul').append(html);
        }
    })
}





// 点击专项tab的时候，执行的事件
var manage_search = function () {
    var $search_manages = $('.specialNav_item,.searchStatistics .rightList ul li');

    $search_manages.each(function (index, searchmanage) {
        $(searchmanage).click(function () {

            var needVal = $(this).data("value");
            var cateid = $("#cateid").val();
            var data = openParame(window.location.search.substring(1));
            if (cateid !== needVal) {
                var data = "serviceId=" + searchid + "&websiteid=" + websiteid + "&cateid=" + needVal;
                if ($("#result-in").prop('checked')) {
                    var q = $('#q').val();
                    q = q.substring(0, q.length - 1);
                    var jgq = $("#jgq").val();
                    var aq = q + " " + $("#jgq").val();
                    window.location.href = "./search?" + replaceUrl(data, ["q", "yq", "jq"], [aq, q, jgq]);
                } else {
                    window.location.href = "./search?" + replaceUrl(data, ["q", "yq", "jq"], [$('#q').val(), "", ""]);
                }
            } else {
                return
            }
        });
    });
};

function image_init() {
    var q = $('#q').val();
    if (q) {
        var searchdata = "websiteid=" + websiteid + "&q=" + q + "&serviceId=" + $("#searchid").val();
        ajaxGet('interface/search/image', {
            type: 'json',
            data: searchdata,
            success: function (result) {
                $(".relevant_list").hide();
                var html = "";
                var dataResults = result.data.searchResult.dataResults;
                if (!dataResults) {
                    return;
                }
                for (var i = 0; i < dataResults.length; i++) {
                    if (i < 4) {
                        var element = dataResults[i].data;
                        var title = element.title;
                        var titlel = title;
                        if (title.length > 13) {
                            title = title.substring(0, 13) + "...";
                        }
                        var url = element.url;
                        if (element.jr_images && element.jr_images.length > 0) {
                            var jr_images = JSON.parse(element.jr_images)[0].url;
                            if (jr_images) {
                                var protocol = window.location.protocol;
                                if (jr_images.indexOf("http://") > -1 || jr_images.indexOf("https://") > -1) {
                                    jr_images = jr_images;
                                } else {
                                    jr_images = protocol + "//" + jr_images;
                                }
                                if (i % 2 == 0) {
                                    html += '<li><a target="_black" href="' + url + '"><img class="jr_images" src="' + jr_images + '" alt=""><span title=' + titlel + '>' + title + '</span></a></li>';
                                } else {
                                    html += '<li style="margin-left: 18px;"><a target="_black" href="' + url + '"><img class="jr_images" src="' + jr_images + '" alt=""><span title=' + titlel + '>' + title + '</span></a></li>';
                                }
                            }
                        }
                    }
                }
                if (html && html != '') {
                    $(".relevant_list").show();
                    $("#relevant_list").html(html);
                }
            },
            error: function (result) {
                $(".relevant_list").hide();
            }
        });
    }
}
// 智能推荐
function recommend_init() {
    var q = $('#q').val();
    $(".znjs").hide();
    if (q) {
        var searchdata = "websiteid=" + websiteid + "&q=" + q + "&serviceId=" + $("#searchid").val();
        ajaxGet('interface/recommend/recommend', {
            type: 'json',
            data: "q=" + q,
            success: function (result) {
                var dataResults = result.data.recommendList;
                if (!dataResults) {
                    return;
                }
                var html = '';
                for (var i = 0; i < dataResults.length; i++) {
                    if (i < 4) {
                        var categoryName = dataResults[i].categoryName;
                        html += '<div class="znjs_content_listTop">' + categoryName + '</div>';
                        html += '<ul>';
                        var list = dataResults[i].list;
                        for (var j = 0; j < list.length; j++) {
                            if (j == 8) {
                                html += "<li><a href='javascript:void(0);' data-length='" + list.length + "' class='zntj_more'>更多&lt;&lt;&lt;</a></li>";
                            }
                            html += "<li><a href='search?serviceId=" + $("#searchid").val() + "&q=" + list[j] + "&websiteid=" + websiteid + "'>" + list[j] + "</a></li>";
                        }
                        html += '</ul>';
                    }
                }
                if (html && html != '') {
                    $(".znjs").show();
                    $(".znjs_content_list").html(html);
                }

                $(".zntj_more").on("click", function () {
                    var aparent = $(this).parent().parent();
                    $(this).parent().remove();
                    var zntjlistlength = $(this).data("length");
                    aparent.height(zntjlistlength * 40);
                    aparent.css("max-height", zntjlistlength * 40 + "px");
                    $(".znjs_xian").height($(".znjs_content").height() - 10);
                })
                //		专题切换
                $(".zt_top ul li").hover(function () {
                    var i = $(this).index();
                    $(this).addClass('hover').siblings().removeClass('hover');
                    $(this).parents('.zt_top').siblings('.zt_listcon').find('ul').eq(i).css({ display: "block" }).siblings().css({ display: 'none' });
                });

                $(".znjs_xian").height($(".znjs_content").height() - 10);

            }
        });
    }
}
// 司局机关
function group_count(dimensionName, divName, total, dimensionCode) {
    var data = '';
    // var p = getQueryVariable("p");
    var cateid = $('#cateid').val();
    data = otherdata(data, cateid);
    data = tooldata(data);
    data += "&dimensionName=" + dimensionName + "&total=" + total + "&groupFields=" + dimensionCode;
    ajaxGet('interface/search/group_count', {
        type: 'json',
        data: data,
        success: function (result) {
            var fieldName = '';
            if (result && result.data && result.data.dimenBean) {
                fieldName = result.data.dimenBean.fieldName;
            }
            if (result && result.data && result.data.groupCountResultBeans && result.data.groupCountResultBeans.length > 0) {
                var html = '';
                html += '<div class="' + divName + 'new">';
                html += '<div class="' + divName + 'new-title cf">';
                html += '<span class="' + divName + 'new-title-l">' + dimensionName + '</span>';
                html += '<span class="' + divName + 'new-title-zk">展开</span>';
                html += '<div class="hr"></div>';
                html += '</div>';
                html += '<div class="' + divName + 'new-text">';
                html += '<ul>';
                var groupCountResultBeans = result.data.groupCountResultBeans
                for (var i = 0; i < groupCountResultBeans.length; i++) {
                    if (i >= 8) {
                        html += '<li style="display:none" class="' + divName + 'new-text-hid cf" data-dimensionid=' + groupCountResultBeans[i].dictionaryId + ' data-fieldname=' + fieldName + '><a href="javascript:void(0)" title=' + groupCountResultBeans[i].name + '>' + groupCountResultBeans[i].name + '</a><span>(' + groupCountResultBeans[i].num + ')</span></li>';
                    } else {
                        html += '<li class="cf" data-dimensionid=' + groupCountResultBeans[i].dictionaryId + ' data-fieldname=' + fieldName + '><a href="javascript:void(0)" title=' + groupCountResultBeans[i].name + '>' + groupCountResultBeans[i].name + '</a><span>(' + groupCountResultBeans[i].num + ')</span></li>';
                    }
                }
                html += '</ul>';
                html += '</div>';
                html += '</div>';
                $('.cbl').append(html);
                if (groupCountResultBeans.length <= 8) {
                    $('.' + divName + 'new-title-zk').hide();
                }
                $("." + divName + "new-title-zk").click(function () {
                    $('[class="' + divName + 'new-text-hid cf"]').each(function (index, ele) {
                        if ($(ele).is(':hidden')) {　　//如果node是隐藏的则显示node元素，否则隐藏
                            $("." + divName + "new-title-zk").text('收起');
                            $("." + divName + "new-title-zk").addClass("hover");
                            $(ele).show();
                        } else {
                            $("." + divName + "new-title-zk").text('展开');
                            $("." + divName + "new-title-zk").removeClass("hover");
                            $(ele).hide();
                        }
                    });
                });
                $(".sjjgnew-text li").each(function (index, item) {
                    $(item).on("click", function () {
                        if ($(item).hasClass("on")) {
                            $(item).removeClass("on");
                        } else {
                            $(item).addClass("on");
                            $(item).siblings().removeClass("on");
                        }
                        var cateLevel = $("#cateLevel").val();
                        if (cateLevel === "1") {
                            search_init();
                        } else {
                            search_initnochild($("#cateid").val());
                        }
                    })
                })
            }
        }
    })
}
// 分页
function pagination_new(p, total, pg) {
    var pagetotal = total % pg == 0 ? parseInt(total / pg) : parseInt(total / pg) + 1;
    if (pagetotal > $("#maxPageNum").val()) {
        pagetotal = $("#maxPageNum").val()
    }
    //分页
    new myPagination({
        id: 'pagination',
        curPage: parseInt(p), //初始页码
        pageTotal: pagetotal, //总页数
        pageAmount: pg, //每页多少条
        dataTotal: total, //总共多少条数据
        pageSize: 9, //可选,分页个数
        showPageTotalFlag: true, //是否显示数据统计
        showSkipInputFlag: true, //是否支持跳转
        getPage: function (page) {

            var dataclick = "clickType=2&q=" + encodeURIComponent($('#q').val());
            statistiClick(dataclick);

            var data = openParame(window.location.search.substring(1));
            var pos = $("#pos").val();
            var sortType = $("#sortType").val();
            var begin = $("#date_start").val();
            var end = $("#date_end").val();
            if (pos) {
                data = replaceUrl(data, ["pos"], [pos]);
            }
            if (sortType) {
                data = replaceUrl(data, ["sortType"], [sortType]);
            }
            if (begin) {
                data = replaceUrl(data, ["begin"], [begin]);
            }
            if (end) {
                data = replaceUrl(data, ["end"], [end]);
            }
            data = replaceUrl(data, ["p"], [page]);
            data = data.replaceAll("dimension_", '');
            if (getdim()) {
                var keys = [];
                var values = [];
                var dims = getdim().split("&");
                for (var i = 0; i < dims.length; i++) {
                    keys.push(dims[i].split("=")[0]);
                    values.push(dims[i].split("=")[1]);
                }
                data = replaceUrl(data, keys, values);
            }
            window.location.href = "./search?" + data
        }
    })
}

var lookmore = function (content, length) {
    content = content.replace(/\n/g, '<br/>');
    if (content.length < length) {
        return content;
    } else {
        var contentArr = content.split('<br/>');
        var contentstrbr = '';
        var contentlength = 0;
        for (var n = 0; n < contentArr.length; n++) {
            contentlength += contentArr[n].length;
            if (contentlength > length) {
                contentstrbr += cut_str(contentArr[n], contentArr[n].length - (contentlength - length)) + "<br/>";
                break;
            } else {
                contentstrbr += contentArr[n] + "<br/>";
            }
        }
        contentstrbr = contentstrbr.substring(0, contentstrbr.length - 5);
        return contentstrbr + "<span style='color:#1677FF;' class='more'>[查看更多]</span></div>";
    }
}
var getAttachDate = function (data, i) {
    var html = '';
    html += '<div class="left jg-list-l">';
    html += '<div class="jg-list-l-title cf">';
    var url = data.url;
    var attachType = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
    html += '<img src="' + $("#tplpath").val() + '/images/' + attachType + '.png">';
    var title = data.title;
    if (title.indexOf('.') > -1) {
        title = title.substring(0, title.lastIndexOf('.'));
    }
    if (i == 1) {
        html += '<span id="jg-list-l-title-span1">' + title + '</span>';
    } else {
        html += '<span class="jg-list-l-title-span">' + title + '</span>';
    }
    html += '</div>';
    html += '<div class="jg-list-l-xx">';
    html += '<ul class="cf">';
    html += '<li>' + dateFormat(data.createdate) + '</li>';
    // html+='<span class="jg-list-l-xx-span">|</span>';
    // html+='<li>共'+data.pagecount+'页</li>';
    html += '<span class="jg-list-l-xx-span">|</span>';
    html += '<li>文件大小：' + data.filesize + '</li>';
    html += '<span class="jg-list-l-xx-span">|</span>';
    html += '<li>' + data.wdlx_name + '</li>';
    html += '</ul>';
    html += '</div>';
    html += '</div>';
    html += '<div class="right jg-list-r">';
    html += '<ul class="cf">';
    html += '<li class="yulan"><a target="_blank" href="' + data.page_url + '">预览</a></li>';
    html += '<span class="jg-list-r-span">|</span>';
    if (title.indexOf("<em>") > -1) {
        title = title.replaceAll('<em>', '').replaceAll('</em>', '')
    }
    html += '<li onclick="checkDownloadTime(\'' + encodeURIComponent(data.url) + '\',\'' + encodeURIComponent(title) + '\',\'' + data.page_url + '\')">下载</li>';
    html += '</ul>';
    html += '</div>';
    return html;
}

// 互动交流
function interactiveSearch(keyword) {
    $.ajax({
        url: "/api-gateway/jpaas-jact-web-server/front/find-mail-pub-list?platformUid=HTMi0SM6aXpdnEJDZH931&pageNum=1&pageSize=1&orderType=1&dimensionInfoIds=&titleOrContent=" + keyword,
        type: "GET",
        success: function (data) {
            if (data.data && data.data.length > 0) {
                var matterId = data.data[0].iid;
                $.ajax({
                    url: "/api-gateway/jpaas-jact-web-server/interface/transact/find-transact-detail?transactId=" + matterId,
                    type: "GET",
                    success: function (data) {
                        if (data.data && data.data.transact) {
                            var _transact = data.data.transact;
                            var _transactOpinion = data.data.transactOpinion;

                            $(".interactiveCommunication .rightList").html(
                                "<div class=\"interactionTitle\">\n" +
                                "   <span>" + _transact.transactData[0].fieldValue + "</span>\n" +
                                "</div>\n" +
                                "<div class=\"interactionContent\">\n" +
                                "   <p setedaria=\"true\">问题：\n" +
                                _transact.transactData[1].fieldValue +
                                "   </p>\n" +
                                "</div>\n" +
                                "<div class=\"interactionReply\">\n" +
                                "    <span>回复单位：" + _transactOpinion[0].handleGroupName + "</span>\n" +
                                "    <span class=\"date\">" + _transactOpinion[0].handleTime + "</span>\n" +
                                "</div>\n" +
                                "<div class=\"interactionLink\">\n" +
                                "    <a href=\"/api-gateway/jpaas-jact-web-server/front/mail-pub-detail?iid=" + matterId + "\" target=\"_blank\">http://test.jinan.gov.cn/api-gateway/jpaas-jact-web-server/front/mail-pub-detail?iid=" + matterId + "</a>\n" +
                                "</div>"
                            );
                            $(".interactiveCommunication").show();
                        }
                    }
                });
            }
        }
    })
}
