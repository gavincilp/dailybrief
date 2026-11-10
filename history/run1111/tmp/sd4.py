import requests, urllib3, re, time
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Content-Type':'application/x-www-form-urlencoded'}
def s(infotypeId,jdid='14'):
    data={'currentnum':'1','jdid':jdid,'divid':'div160091','infotypeId':infotypeId}
    for i in range(6):
        try:
            r=requests.post('http://zjt.shandong.gov.cn/module/xxgk/search.jsp',data=data,headers=UA,timeout=25,verify=False)
            if r.status_code==200 and len(r.content)>800:
                r.encoding='utf-8'
                t=re.sub(r'\s+',' ',r.text)
                items=re.findall(r'<a href="([^"]+)"[^>]*title="([^"]{5,200})"',t)
                print('=====',infotypeId,len(items))
                for h,ti in items[:15]: print(' ',h,'|',ti)
                # dates
                dts=re.findall(r'(\d{4}-\d{2}-\d{2})',t)
                print(' dates:',dts[:15])
                return
            print(i,r.status_code)
        except Exception as e: print(i,'ERR',type(e).__name__)
        time.sleep(2)
for x in ['SD1002','SD1003','SD020207','SD0202']:
    s(x)
