import requests, urllib3, re
urllib3.disable_warnings()
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36','Content-Type':'application/x-www-form-urlencoded','Referer':'https://jsszfhcxjst.jiangsu.gov.cn/'}
for pg in ['1','2']:
    d={'currentnum':pg,'jdid':'34','divid':'div52043','infotypeId':''}
    r=requests.post('https://jsszfhcxjst.jiangsu.gov.cn/module/xxgk/search.jsp',data=d,headers=UA,timeout=30,verify=False)
    r.encoding='utf-8'
    t=re.sub(r'\s+',' ',r.text)
    it=re.findall(r"<a href='([^']+)'[^>]*title='([^']{4,200})'.*?<td align='center' width='63'>([\d-]+)</td>",t)
    print('=== page',pg,len(it))
    for x in it: print(x[2],x[1],x[0])
