import requests, urllib3, re, time
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Content-Type':'application/x-www-form-urlencoded'}
data={'currentnum':'1','jdid':'14','divid':'div160091','infotypeId':'SD1002'}
r=requests.post('http://zjt.shandong.gov.cn/module/xxgk/search.jsp',data=data,headers=UA,timeout=25,verify=False)
r.encoding='utf-8'; t=r.text
i=t.find('2026-11-09')
print(re.sub(r'\s+',' ',t[i-1500:i+500]))
