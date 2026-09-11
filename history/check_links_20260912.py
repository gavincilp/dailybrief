# -*- coding: utf-8 -*-
import urllib.request, ssl, re, socket
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
HDR={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
     'Accept':'text/html,application/xhtml+xml,*/*;q=0.8','Accept-Language':'zh-CN,zh;q=0.9'}
urls=[
 ("广东城市更新四类指引","https://zfcxjst.gd.gov.cn/xxgk/wjtz/content/post_4954524.html"),
 ("四川城市供水应急预案","https://jst.sc.gov.cn/scjst/c101428/2026/9/11/3fac74d675344f8998afc477bdd11f89.shtml"),
 ("青岛建筑防水技术导则","https://sjw.qingdao.gov.cn/cxjsj1/cxjsj35/202609/t20260911_10728246.shtml"),
 ("西藏物业服务合同示范文本","https://zjt.xizang.gov.cn/xwzx/tzgg/202609/t20260911_558306.html"),
 ("新疆涉黑涉恶线索征集","https://zjt.xinjiang.gov.cn/xjzjt/c113382/202609/d188f91243414eb79524cebd42e0f574.shtml"),
]
socket.setdefaulttimeout(30)
for name,u in urls:
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers=HDR),context=ctx)
        raw=r.read()
        try: h=raw.decode('utf-8')
        except: h=raw.decode('gbk','ignore')
        t=re.search(r'<title[^>]*>([\s\S]*?)</title>',h,re.I)
        title=re.sub(r'\s+',' ',t.group(1)).strip() if t else '(no title)'
        # try h1
        h1=re.findall(r'<h1[^>]*>([\s\S]*?)</h1>',h,re.I)
        h1s=re.sub(r'\s+',' ',re.sub(r'<[^>]+>','',h1[0])).strip() if h1 else ''
        print(f"[{name}] HTTP {r.status} len={len(raw)}")
        print("   title:",title[:120])
        if h1s: print("   h1   :",h1s[:120])
    except Exception as e:
        print(f"[{name}] ERROR {e}")
