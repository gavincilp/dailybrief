import requests, urllib3, re, time
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Content-Type':'application/x-www-form-urlencoded'}
for inf in ['SD1002','SD1003','SD0202']:
    data={'currentnum':'1','jdid':'14','divid':'div160091','infotypeId':inf}
    r=requests.post('http://zjt.shandong.gov.cn/module/xxgk/search.jsp',data=data,headers=UA,timeout=25,verify=False)
    r.encoding='utf-8'
    t=re.sub(r'\s+',' ',r.text)
    print('=====',inf)
    for m in re.finditer(r'<a title="([^"]+)" target="_blank" href="([^"]+)">.*?<b>([\d-]+)</b>',t):
        print(m.group(3),m.group(1),m.group(2))
