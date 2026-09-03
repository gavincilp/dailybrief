# -*- coding: utf-8 -*-
import urllib.request, ssl, re, socket
socket.setdefaulttimeout(20)
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
urls = {
 "浙江-堵漏裂臭指南": "https://jst.zj.gov.cn/col/col1229159346/art/2026/art_fa1245a437f64bd2b520bbd7b0a5856f.html",
 "湖南-一隔四防导则征求": "https://zjt.hunan.gov.cn/zjt/xxgk/xinxigongkaimulu/tzgg/tzgg2zhyw/202609/t20260902_34055452.html",
 "山西-好房子标准公告": "https://zjt.shanxi.gov.cn/zfxxgk/zfxxgkml/bzgf/bzgg/202606/t20260611_10144429.shtml",
 "内蒙古-公共收益办法": "https://zjt.nmg.gov.cn/zwgk/zfxxgkn/zc/xzgfxwj/xxyxgfxwjk/202608/t20260818_2941954.html",
 "上海-十五五规划图解": "https://zjw.sh.gov.cn/zcjd/20260902/e37a15365b7e4b2ba88fd29dd4172b54.html",
 "四川-5项地方标准": "https://jst.sc.gov.cn/scjst/c101428/2026/9/2/5126dc5c8b22412a878f499737f1be2d.shtml",
 "山东-废止环物委通知": "http://zjt.shandong.gov.cn/art/2026/9/2/art_102884_10356817.html",
}
hdr = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
       "Accept":"text/html,application/xhtml+xml,*/*;q=0.8","Accept-Language":"zh-CN,zh;q=0.9"}
for name,u in urls.items():
    try:
        req = urllib.request.Request(u, headers=hdr)
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            raw = r.read(600000)
            code = r.status
            ct = r.headers.get("Content-Type","")
        txt = raw.decode("utf-8","ignore")
        m = re.search(r"<title>(.*?)</title>", txt, re.S)
        title = re.sub(r"\s+"," ",m.group(1)).strip()[:120] if m else "(no title)"
        print(f"[{code}] {name}: {title}")
    except Exception as e:
        print(f"[ERR] {name}: {type(e).__name__} {e}")
