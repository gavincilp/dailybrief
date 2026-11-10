import requests, urllib3, sys
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'}
for u in ['https://zjt.shandong.gov.cn/','http://zjt.shandong.gov.cn/','https://jst.zj.gov.cn/','https://jsszfhcxjst.jiangsu.gov.cn/','https://zfcxjst.gd.gov.cn/','https://zjw.sh.gov.cn/','https://zjw.beijing.gov.cn/']:
    try:
        r=requests.get(u,headers=UA,timeout=20,verify=False,allow_redirects=True)
        print(u,r.status_code,len(r.content),r.url)
    except Exception as e:
        print(u,'ERR',type(e).__name__,str(e)[:80])
