import requests, urllib3, re, time, json
from urllib.parse import quote
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Referer':'https://jst.zj.gov.cn/'}
t=requests.get('https://jst.zj.gov.cn/',headers=UA,timeout=25,verify=False).content.decode('utf-8','ignore')
for m in re.finditer(r"queryData='(.*?)'",t):
    print(m.group(1)[:300])
for m in re.finditer(r'queryData="(.*?)"',t):
    print(m.group(1)[:300])
