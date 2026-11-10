import requests, urllib3, re, time
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Content-Type':'application/x-www-form-urlencoded'}
def post(url,data,n=5):
    for i in range(n):
        try:
            r=requests.post(url,data=data,headers=UA,timeout=25,verify=False)
            if r.status_code==200 and len(r.content)>500:
                r.encoding='utf-8'; return r.text
        except Exception as e: pass
        time.sleep(1.5)
    return ''
d={'currentnum':'2','jdid':'14','divid':'div160091','infotypeId':'SD1002'}
t=re.sub(r'\s+',' ',post('http://zjt.shandong.gov.cn/module/xxgk/search.jsp',d))
for m in re.finditer(r'<a title="([^"]+)" target="_blank" href="([^"]+)">.*?<b>([\d-]+)</b>',t): print(m.group(3),m.group(1))
for inf in ['SD1002','SD1003']:
    d={'currentnum':'1','jdid':'407','divid':'div160091','infotypeId':inf}
    t=re.sub(r'\s+',' ',post('http://zjt.shandong.gov.cn/module/xxgk/search.jsp',d))
    print('=====',inf,'jdid407')
    for m in re.finditer(r'<a title="([^"]+)" target="_blank" href="([^"]+)">.*?<b>([\d-]+)</b>',t): print(m.group(3),m.group(1))
