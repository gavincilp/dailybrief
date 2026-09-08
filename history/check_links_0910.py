# -*- coding: utf-8 -*-
import urllib.request, ssl, re, socket
socket.setdefaulttimeout(25)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'}
links = [
    ("河南15条", "http://hnjs.henan.gov.cn/2026/09-08/3411972.html"),
    ("湖南三年行动-省政府门户", "https://www.hunan.gov.cn/hnszf/xxgk/wjk/szfbgt/202609/t20260907_34058177.html"),
    ("甘肃赋码", "https://zjt.gansu.gov.cn/zjt/c115381/202609/174390859.shtml"),
    ("住建部-双化协同转载", "https://www.mohurd.gov.cn/xinwen/gzdt/art/2026/art_be93e6d0d7824ae69eea8ffa60c881fa.html"),
    ("网信办原文-双化方案", "https://www.cac.gov.cn/2026-09/04/c_1790271981772781.htm"),
]
for name, url in links:
    try:
        req = urllib.request.Request(url, headers=UA)
        r = urllib.request.urlopen(req, timeout=25, context=ctx)
        body = r.read(200000).decode('utf-8', 'ignore')
        t = re.search(r'<title[^>]*>(.*?)</title>', body, re.S | re.I)
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', body, re.S | re.I)
        def clean(s):
            return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', s)).strip()[:90] if s else ''
        print(f"[{name}] HTTP {r.status} | title: {clean(t.group(1)) if t else ''} | h1: {clean(h1.group(1)) if h1 else ''}")
    except Exception as e:
        print(f"[{name}] FAIL {type(e).__name__}: {e}")
