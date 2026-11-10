import requests, urllib3, re, time
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'}
def get(u,n=8,post=None):
    for i in range(n):
        try:
            r=requests.get(u,headers=UA,timeout=25,verify=False)
            if r.status_code==200 and len(r.content)>1000: return r
            print(i,r.status_code,len(r.content))
        except Exception as e: print(i,'ERR',type(e).__name__,str(e)[:60])
        time.sleep(1.5)
    return None
r=get('http://zjt.shandong.gov.cn/col/col293162/index.html?vc_xxgkarea=113700000045030270')
if r:
    r.encoding='utf-8'; open('sd_gfx.html','w').write(r.text)
    for m in re.finditer(r'title="([^"]{5,120})"[^>]*>\s*<div class="text fl ele">.*?<div class="time fr">\s*([\d-]+)',re.sub(r'\s+',' ',r.text)):
        print(m.group(2),m.group(1))
