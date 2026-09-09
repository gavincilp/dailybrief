# -*- coding: utf-8 -*-
import urllib.request, ssl, re
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'})
    return urllib.request.urlopen(req, timeout=25, context=ctx).read().decode('utf-8','ignore')
for name,u in [
 ("山西-政策性金融支持城市更新","https://zjt.shanxi.gov.cn/zwgk/gztz/202609/t20260908_10216363.shtml"),
 ("安徽-城市更新十五五规划","https://dohurd.ah.gov.cn/public/6991/58351621.html")]:
    body = get(u)
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', body, re.S)
    h1 = re.sub(r'<[^>]+>','',h1s[0]).strip()[:150] if h1s else '(no h1)'
    print(f"== {name}\n  H1: {h1}")
    # look for date markers and keywords
    for kw in ['装配式','城市更新','成套改造']:
        pass
    txt = re.sub(r'<[^>]+>',' ',body)
    for kw in ['城市更新','专项贷款','旧住房','成套改造']:
        i = txt.find(kw)
        if i>0:
            print(f"  KW[{kw}]: ...{txt[max(0,i-60):i+90].strip()[:150]}...")
            break
