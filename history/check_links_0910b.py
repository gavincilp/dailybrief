# -*- coding: utf-8 -*-
import urllib.request, ssl, sys
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
urls = [
 ("住建部-装配式装修意见征意", "https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2026/art_46be7ccdd84942dfa1373f97cf8c4bd1.html"),
 ("上海-旧住房成套改造办法征意", "https://fgj.sh.gov.cn/yjzq/20260909/73ba54d41a2f4cc1848cb28f39798278.html"),
 ("山西-政策性金融支持城市更新", "https://zjt.shanxi.gov.cn/zwgk/gztz/202609/t20260908_10216363.shtml"),
 ("贵州-国有土地上房屋征收指导意见", "https://zfcxjst.guizhou.gov.cn/zwgk/zcwj/zxwj/202609/t20260908_90844218.html"),
 ("安徽-城市更新十五五规划", "https://dohurd.ah.gov.cn/public/6991/58351621.html"),
]
for name,u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'})
        r = urllib.request.urlopen(req, timeout=25, context=ctx)
        body = r.read().decode('utf-8','ignore')
        code = r.status
        # extract title
        import re
        m = re.search(r'<title>(.*?)</title>', body, re.S)
        t = m.group(1).strip()[:120] if m else '(no title)'
        print(f"[{code}] {name}\n   TITLE: {t}")
    except Exception as e:
        print(f"[ERR] {name}: {e}")
