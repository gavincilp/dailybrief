# -*- coding: utf-8 -*-
import urllib.request, ssl, re, socket
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
HDR={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'}
socket.setdefaulttimeout(30)
def get(u):
    r=urllib.request.urlopen(urllib.request.Request(u,headers=HDR),context=ctx)
    raw=r.read()
    try: return raw.decode('utf-8')
    except: return raw.decode('gbk','ignore')
def text(h):
    h=re.sub(r'<script[\s\S]*?</script>','',h,flags=re.I)
    h=re.sub(r'<style[\s\S]*?</style>','',h,flags=re.I)
    h=re.sub(r'<[^>]+>',' ',h)
    h=re.sub(r'&nbsp;|&#160;',' ',h)
    return re.sub(r'[ \t\r\f\v]+',' ',re.sub(r'\n+','\n',h))
for name,u in [
 ("GD","https://zfcxjst.gd.gov.cn/xxgk/wjtz/content/post_4954524.html"),
 ("QD","https://sjw.qingdao.gov.cn/cxjsj1/cxjsj35/202609/t20260911_10728246.shtml"),
 ("XZ","https://zjt.xizang.gov.cn/xwzx/tzgg/202609/t20260911_558306.html"),
]:
    t=text(get(u))
    t=re.sub(r'\n\s*\n+','\n',t)
    print("="*30,name,"="*30)
    print(t[:3000])
