var dataparam = {
    datas: [
        {
            key: 'status',
            value: '4',
            join: 'and',
            queryType: 'term'
        },
        {
            key: 'publishedTime',
            sort: 'true',
            order: 'desc',
            queryType: 'term'
        }
    ],
    page: 1,
    _pageSize: 20,
    _isAgg: 'true'
};
function getManuscriptData(page) {
    dataparam.page = page;
    $.ajax({
        async: true,
        url: location.protocol+'//api.hunan.gov.cn/search/common/search/' + channelId,
        type: 'POST',
        dataType: 'json',
        data: dataparam,
        success: function (res) {

            var list_tpl = doT.template($('#list_tpl').text());

            var list_html = list_tpl(res.data.results).replace(/\/[A-Za-z]+\/xhtml\//g, '');

            $('#list').html(list_html);
            var currIndex = parseInt(page);
            var totalCount = res.data.total;
            var totalPage = Math.ceil(totalCount / 20);
            createPageHTML('paging', totalPage, currIndex, 'index', 'html', totalCount);
        }
    });
}
$(function () {
    var page = location.search.replace('?page=', '') || 1;
    getManuscriptData(page);
    $('#paging').on('click', 'a', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var page = href == 'index.html' ? '1' : href.match(/index_(\d+).html/)[1];
        getManuscriptData(page);
        var url = location.href;
        url = location.search == '' ? url + '?page=' + page : url.replace(location.search, '?page=' + page)
        location.href = url;
    });
});
function sliceString(string, start, end, ellipsis) {
    ellipsis = ellipsis || '';
    ellipsis = string.length > end ? ellipsis : '';
    return string.slice(start, end) + ellipsis;
}