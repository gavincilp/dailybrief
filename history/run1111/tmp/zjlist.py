import requests, urllib3, re
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
for col in ['col1229129246','col1229159074','col1229159357','col1229158252','col1569971']:
    u='https://jst.zj.gov.cn/col/%s/index.html'%col
    try:
        r=requests.get(u,headers=UA,timeout=25,verify=False); r.encoding='utf-8'
        t=r.text
        print('=====',col,r.status_code,len(t))
        m=re.findall(r'queryData=.([\'"]?)(.*?)\1',t)
        print([x[1][:250] for x in m][:3])
        links=re.findall(r'href="([^"]*art/[^"]*)"[^>]*title="([^"]{4,120})"',t)
        print(len(links))
        # also li structure
        for s in re.findall(r'<li[^>]*>.{0,400}?</li>',t)[:5]: print(re.sub(r'\s+',' ',s)[:300])
    except Exception as e: print(col,'ERR',e)
