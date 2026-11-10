import re,sys,requests,urllib3
urllib3.disable_warnings()
for p in ['c101428','gongshitg','release','c101460','c101448','c101452','c101448','gwyxx']:
    u=f"https://jst.sc.gov.cn/scjst/{p}/article_list.shtml"
    try: r=requests.get(u,verify=False,timeout=25,headers={'User-Agent':'Mozilla/5.0'}); r.encoding='utf-8'
    except Exception as e: print(p,e); continue
    h=r.text
    print('===',p,r.status_code)
    for m in re.finditer(r'<a[^>]+href="([^"]*\.s?html)"[^>]*>\s*([^<]{8,90}?)\s*</a>',h):
        url,t=m.group(1),m.group(2)
        if '2026/11' in url or '/2026' in url:
            print(t[:65],'|',url)
