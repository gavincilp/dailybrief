# -*- coding: utf-8 -*-
"""批量校验 2026-09-02 简报候选链接：可访问性 + 标题关键词匹配"""
import re, ssl, urllib.request, urllib.error

links = {
    "国常会部署城市地下管网": ("https://www.gov.cn/zhengce/202609/content_7079760.htm", ["地下管网"]),
    "住建部好房子经验做法第二批": ("https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_0be53fbdfb844a3b85ee9483a1ba5973.html", ["好房子", "经验"]),
    "上海多图联审办法": ("https://zjw.sh.gov.cn/gfxwj/20260807/00978e58c73143b9989ddbfa3308525b.html", ["多图联审"]),
    "海南规范国有住宅用地自建房": ("https://lr.hainan.gov.cn/ywdt_312/zwdt/202609/t20260901_4138894.html", ["自建房"]),
    "吉林维修资金项目监管措施": ("https://jst.jl.gov.cn/zmhd/myzj/202609/t20260901_3667323.html", ["维修资金"]),
    "吉林分阶段施工许可": ("https://xxgk.jl.gov.cn/zcbm/fgw_98022/xxgkmlqy/202608/t20260831_9692895.html", ["施工许可"]),
    "海南商品住宅全装修办法": ("https://zjt.hainan.gov.cn/szjt/0407/202607/3f1de9c6ea00427197ee3b16a1533912.shtml", ["全装修"]),
    "河北高处作业吊篮安全管理": ("https://zfcxjst.hebei.gov.cn/hbzjt/xwzx/jsyw/101783042049575.html", ["吊篮"]),
    "杭州住房租赁企业信用评价": ("https://fgj.hangzhou.gov.cn/col/col1229243693/art/2026/art_1154749a9f264f28afed842aaeecae60.html", ["租赁", "信用"]),
    "西藏住宅物业服务标准": ("https://zjt.xizang.gov.cn/xwzx/tzgg/202609/t20260901_556120.html", ["物业服务"]),
    "海南废止建筑业奖励资金细则": ("https://zjt.hainan.gov.cn/szjt/0401/202609/fbd63e77f96149bd8c93ad0b517c35da.shtml", ["奖励资金"]),
    "深圳工程档案归档验收指南": ("https://zjj.sz.gov.cn/xxgk/tzgg/content/post_12960759.html", ["档案"]),
    "杭州文明施工管理规定修改": ("https://www.hangzhou.gov.cn/api-gateway/jpaas-jsurvey-web-server/front/dczj/showJsurveys.do?formId=bb85babcaea34387934c181ac15b0253", ["文明施工"]),
    "新疆房地产开发项目手册办法": ("https://zjt.xinjiang.gov.cn/xjzjt/c114248/202608/eaa0ad26e5e6440db0167f88558a12c1.shtml", ["项目手册"]),
    "湖北历史文化保护传承体系规划": ("http://zjt.hubei.gov.cn/zfxxgk/zc/qtzdgkwj/202608/t20260828_6003299.shtml", ["历史文化"]),
    "山西工程项目信息管理通知": ("https://zjt.shanxi.gov.cn/zwgk/gztz/202608/t20260831_10210981.shtml", ["工程项目信息"]),
    "贵州省级购房消费券延长": ("https://swt.guizhou.gov.cn/xwzx/tzgg/202608/t20260828_90795736.html", ["消费券"]),
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
            html = r.read(80000).decode("utf-8", "ignore")
            return r.status, html, r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, "", ""
    except Exception as e:
        return f"ERR:{type(e).__name__}", "", ""

print("=" * 100)
for name, (url, kws) in links.items():
    status, html, final = fetch(url)
    if isinstance(status, int):
        title = re.search(r"<title>(.*?)</title>", html, re.S)
        t = title.group(1).strip()[:70] if title else ""
        hit = [k for k in kws if k in html[:30000] or k in t]
        flag = "OK " if status == 200 and hit else "?  "
        print(f"{flag} [{status}] {name}")
        print(f"      title: {t}")
        if final and final != url:
            print(f"      redirect-> {final}")
        if status == 200 and not hit:
            print(f"      !! 关键词未命中: {kws}")
    else:
        print(f"ERR [{status}] {name} -> {url}")
print("=" * 100)
