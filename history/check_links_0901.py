# -*- coding: utf-8 -*-
"""批量校验 2026-09-01 简报候选链接：可访问性 + 标题关键词匹配"""
import re, ssl, urllib.request, urllib.error

links = {
    "城市更新项目贷款管理办法": ("https://www.nfra.gov.cn/cn/view/pages/governmentDetail.html?docId=1270033&itemId=861&generaltype=1", ["城市更新", "贷款"]),
    "城市建设档案管理规定-档案局": ("https://www.saac.gov.cn/daj/yaow/202605/cb23ee18ba464a56b4775234db1ca3f4.shtml", ["城市建设档案"]),
    "住建部现房销售专家解读": ("https://www.mohurd.gov.cn/xinwen/gzdt/index.html", ["现房销售"]),
    "四川十五五住建规划": ("https://jst.sc.gov.cn/scjst/c101428/2026/8/31/44c0df7468bb4622b6a34121c4130f94.shtml", ["十五五", "规划"]),
    "江苏提质增效38号": ("https://www.jiangsu.gov.cn/art/2026/8/31/art_46144_11822808.html", ["提质增效"]),
    "山西传统建筑修缮标准": ("https://zjt.shanxi.gov.cn/zwgk/zqyj/202608/t20260831_10210952.shtml", ["传统建筑", "修缮"]),
    "贵阳历史建筑保护办法": ("https://zhujianju.guiyang.gov.cn/opinion/202608/tOpinion_21690.html", ["历史建筑", "保护"]),
    "广州房屋征收示范文本": ("https://zfcj.gz.gov.cn/hdjlpt/yjzj/answer/52533", ["征收", "示范文本"]),
    "佛山安责险办法修订": ("https://www.foshan.gov.cn/hdjlpt/yjzj/answer/52536", ["安全生产责任保险"]),
    "武汉物业酬金制": ("https://zgj.wuhan.gov.cn/zwdt/jdxw/202608/t20260831_2840764.shtml", ["酬金制"]),
    "宁波住房消费组合拳": ("https://www.mohurd.gov.cn/xinwen/dfxx/art/2026/art_971ca92bdbbe40be9746c6210bc2990c.html", ["住房消费", "宁波"]),
    "威海规范性文件清理": ("https://www.weihai.gov.cn/art/2026/8/31/art_51912_6577067.html", ["规范性文件", "清理"]),
    "山东菏泽吊篮换证转发": ("http://zjt.shandong.gov.cn/art/2026/7/3/art_102884_10354386.html", ["吊篮", "特种作业"]),
    "上海转发现房销售答记者问": ("https://fgj.sh.gov.cn/tpxw/20260831/a36dc921cca04ffd8206e9efd941fe8b.html", ["商品住房销售", "答记者问"]),
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
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            html = r.read(60000).decode("utf-8", "ignore")
            return r.status, html
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return f"ERR:{type(e).__name__}", ""

print("=" * 90)
for name, (url, kws) in links.items():
    status, html = fetch(url)
    if isinstance(status, int):
        title = re.search(r"<title>(.*?)</title>", html, re.S)
        t = title.group(1).strip()[:60] if title else ""
        hit = [k for k in kws if k in html[:30000] or k in t]
        flag = "OK " if status == 200 and hit else "?  "
        print(f"{flag} [{status}] {name}")
        print(f"      title: {t}")
        if status == 200 and not hit:
            print(f"      !! 标题关键词未命中: {kws}")
    else:
        print(f"ERR [{status}] {name} -> {url}")
print("=" * 90)
