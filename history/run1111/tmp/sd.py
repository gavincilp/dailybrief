import requests, urllib3, re, time
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'}
def get(u,n=4):
    for i in range(n):
        try:
            r=requests.get(u,headers=UA,timeout=20,verify=False)
            print(i,u,r.status_code,len(r.content))
            if r.status_code==200 and len(r.content)>3000: return r
        except Exception as e: print(i,'ERR',type(e).__name__)
        time.sleep(1)
    return None
r=get('http://zjt.shandong.gov.cn/?t=%d'%int(time.time()))
if r:
    r.encoding='utf-8'
    open('sd_home.html','w').write(r.text)
    t=r.text
    print(re.search(r'MakeTime[^>]*',t))
    for m in re.finditer(r'href="([^"]*art/2026/1[12]/[^"]*)"[^>]*>([^<]{5,80})',t):
        print(m.group(1),m.group(2))
