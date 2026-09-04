# -*- coding: utf-8 -*-
"""2026-09-04 简报候选链接校验"""
import urllib.request, ssl, json, time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

URLS = {
 "A1_住建部废止公告117号": "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_931c1b45a38d4f83a87be31b834898d6.html",
 "A2_城市更新规划编制标准征求意见": "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_8d1fc145d3d14198a75ee3fdbd020611.html",
 "A3_建筑施工安全检查标准修订征求意见": "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_76d030da345144daa7c61a8229355eda.html",
 "B1_上海十五五规划全文通知": "https://zjw.sh.gov.cn/jsgl/20260902/652ccdc1039e4514a90e02c0e1e0bc98.html",
 "B2_广东建筑垃圾管理条例修改征意": "https://zfcxjst.gd.gov.cn/xxgk/gsgg/content/post_4950847.html",
 "C1_湖南关键岗位人员配备再征意": "https://zjt.hunan.gov.cn/zjt/xxgk/xinxigongkaimulu/tzgg/tzgg2zhyw/202609/t20260903_34055743.html",
 "C2_江西城市地下管网专项体检指南": "https://zjt.jiangxi.gov.cn/jxszfhcxjst/wjtz/pc/content/content_2095349067380502528.html",
 "C3_湖北规范性文件清理结果": "https://zjt.hubei.gov.cn/zfxxgk/zc/gfxwj/202609/t20260902_6006344.shtml",
 "D1_广州模块化EPC招标指引征意": "https://zfcj.gz.gov.cn/hdjlpt/yjzj/answer/52611",
 "D2_宁波物业条例第二次修正全文": "https://www.ningbo.gov.cn/col/col1229560977/art/2026/art_8a8ed2265fa244ad85cab7fc65e991ad.html",
 "E1_广西维修资金实施细则2026修订": "http://zjt.gxzf.gov.cn/zfxxgk/fdzdgknr/fgwj/xzgfxwj/t28095575.shtml",
 "E2_贵州消防施工质量全过程管理通知": "https://zfcxjst.guizhou.gov.cn/zwgk/zcjd/202608/t20260831_90801299.html",
}

def check(name, url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
            body = r.read(6000)
            # extract title
            html = body.decode("utf-8", "ignore")
            import re
            m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
            title = re.sub(r"\s+", " ", m.group(1)).strip()[:90] if m else "(no title)"
            print(f"[{r.status}] {name}\n   {url}\n   TITLE: {title}\n")
            return r.status, title
    except Exception as e:
        print(f"[ERR] {name}\n   {url}\n   {type(e).__name__}: {e}\n")
        return "ERR", str(e)[:80]

for k, u in URLS.items():
    check(k, u)
    time.sleep(0.6)
