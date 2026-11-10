import requests, urllib3, re, time
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Content-Type':'application/x-www-form-urlencoded'}
data={'currentnum':'1','jdid':'407','divid':'div160091','infotypeId':'SD0202','vc_xxgkarea':'113700000045030270','number':'SD0202'}
for i in range(6):
    try:
        r=requests.post('http://zjt.shandong.gov.cn/module/xxgk/search.jsp',data=data,headers=UA,timeout=25,verify=False)
        print(i,r.status_code,len(r.content))
        if r.status_code==200 and len(r.content)>800:
            r.encoding='utf-8'; open('sd_xxgk.html','w').write(r.text)
            t=re.sub(r'\s+',' ',r.text)
            print(t[:1500])
            break
    except Exception as e: print(i,'ERR',e)
    time.sleep(2)
